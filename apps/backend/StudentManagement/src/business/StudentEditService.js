const { StudentRepository } = require('../persistence/studentRepository');

class StudentEditService {
    constructor() {
        this.repo = new StudentRepository();
    }

    async addStudent(student) {
        const year = this.getYearFromId(student.id);
        return await this.repo.save({ ...student, year });
    }

    async deleteStudent(id) {
        return await this.repo.delete(id);
    }

    getYearFromId(id) {
        const prefix = id.substring(0, 3);
        switch (prefix) {
            case '245': return '1';
            case '235': return '2';
            case '225': return '3';
            case '215': return '4';
            case '205': return '4+';
            default: throw new Error('Invalid student ID prefix');
        }
    }
}

module.exports = new StudentEditService();