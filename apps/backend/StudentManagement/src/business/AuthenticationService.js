const StudentRepository = require('../persistence/studentRepository');
const bcrypt = require('bcrypt');

const AuthenticationService = {
    async login(id, plainPassword) {
        const student = await StudentRepository.getById(id);
        if (!student) throw new Error('Student not found');

        const passwordMatch = await bcrypt.compare(plainPassword, student.password);
        if (!passwordMatch) throw new Error('Invalid password');

        // You could return a JWT here if you want
        return {
            id: student.id,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            year: student.year,
        };
    }
};

module.exports = AuthenticationService;