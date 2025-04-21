const StudentRepository = require('../persistence/studentRepository');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const StudentEditService = {
    async createStudent(student) {
        // If no password is provided, generate a random 5-character one
        let plainPassword = student.password || faker.internet.password(5, false); // 5 characters

        const hashed = await bcrypt.hash(plainPassword, 10);
        student.password = hashed;

        await StudentRepository.create(student);

        return {
            ...student,
            password: undefined,         // remove hashed password from response
            plainPassword: plainPassword // return actual password
        };
    },

    async updateStudent(id, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        await StudentRepository.update(id, data);
    },

    async deleteStudent(id) {
        await StudentRepository.delete(id);
    },
};

module.exports = StudentEditService;