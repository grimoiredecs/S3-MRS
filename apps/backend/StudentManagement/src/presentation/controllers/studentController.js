const StudentQueryService = require('../../business/StudentQueryService');
const StudentEditService = require('../../business/StudentEditService');
const StudentController = {
    async getAll(req, res) {
        const students = await StudentQueryService.getAllStudents();
        res.json(students);
    },

    async getById(req, res) {
        const id = req.params.id;
        try {
            const student = await StudentQueryService.getStudentById(id);
            res.json(student);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const student = await StudentEditService.createStudent(req.body);
            res.status(201).json(student); // contains plain password too
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            await StudentEditService.updateStudent(req.params.id, req.body);
            res.json({ success: true });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            await StudentEditService.deleteStudent(req.params.id);
            res.json({ success: true });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};

module.exports = StudentController;