const StudentEditService = require('../../business/StudentEditService');
const StudentQueryService = require('../../business/StudentQueryService');

exports.createStudent = async (req, res) => {
    try {
        const student = await StudentEditService.addStudent(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await StudentQueryService.getStudentById(req.params.id);
        res.json(student);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.getAllStudents = async (_req, res) => {
    const students = await StudentQueryService.getAllStudents();
    res.json(students);
};

exports.deleteStudent = async (req, res) => {
    await StudentEditService.deleteStudent(req.params.id);
    res.status(204).end();
};