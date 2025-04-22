const { StudentRepository } = require('../persistence/studentRepository');
const { emitEvent } = require('../events/emitEvents');

class StudentEditService {
    constructor() {
        this.repo = new StudentRepository();
    }

    async addStudent(student) {
        const year = this.getYearFromId(student.id);
        const studentWithYear = { ...student, year };
        await this.repo.save(studentWithYear);

        // 🔥 Emit event
        await emitEvent('student-events', 'student-created', studentWithYear);

        return studentWithYear;
    }

    async updateStudent(id, data) {
        await this.repo.update(id, data);
        await emitEvent('student-events', 'student-updated', { id, ...data });
    }

    async deleteStudent(id) {
        await this.repo.delete(id);
        await emitEvent('student-events', 'student-deleted', { id });
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

module.exports = { StudentEditService };