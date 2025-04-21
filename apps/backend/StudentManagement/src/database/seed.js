const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const YEAR_PREFIXES = {
    1: '245',
    2: '235',
    3: '225',
    4: '215',
    5: '205',
};

function generateStudentId(year) {
    const prefix = YEAR_PREFIXES[year];
    const suffix = Math.floor(1000 + Math.random() * 9000);
    return prefix + suffix;
}

async function generateStudent(year) {
    const id = generateStudentId(year);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const plainPassword = faker.internet.password(5, false); // 5-character password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    return {
        id,
        first_name: firstName,
        last_name: lastName,
        email,
        year,
        password: hashedPassword,
        plainPassword, // for debugging
    };
}

async function insertStudents() {
    const client = await pool.connect();

    try {
        for (let i = 0; i < 50; i++) {
            const year = Math.ceil(Math.random() * 4); // random year from 1 to 4
            const student = await generateStudent(year);

            await client.query(
                `INSERT INTO students (id, first_name, last_name, email, year, password)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    student.id,
                    student.first_name,
                    student.last_name,
                    student.email,
                    student.year,
                    student.password,
                ]
            );

            console.log(
                `✅ ${student.id} | ${student.first_name} ${student.last_name} | ${student.email} | pw: ${student.plainPassword}`
            );
        }
    } catch (err) {
        console.error('❌ Error inserting students:', err);
    } finally {
        client.release();
        pool.end();
    }
}

insertStudents();