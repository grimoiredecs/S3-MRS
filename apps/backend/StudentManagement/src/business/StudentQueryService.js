const StudentRepository = require('../persistence/studentRepository');

const StudentQueryService = {
    async getAllStudents() {
        return await StudentRepository.getAll();
    },

    async getStudentById(id) {
        const student = await StudentRepository.getById(id);
        if (!student) throw new Error(`Student with ID ${id} not found`);
        return student;
    },
};

module.exports = StudentQueryService;