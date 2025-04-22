const { StudentRepository } = require('../persistence/studentRepository');

class StudentQueryService {
    constructor() {
        this.repo = new StudentRepository();
    }

    async getStudentById(id) {
        const student = await this.repo.findById(id);
        if (!student) throw new Error('Student not found');
        return student;
    }

    async getAllStudents() {
        return await this.repo.findAll();
    }
}

module.exports = new StudentQueryService();