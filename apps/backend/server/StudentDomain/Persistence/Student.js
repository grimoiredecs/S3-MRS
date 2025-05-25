
const pool = require('../Database/connection/postgres')
class Student{

    async getStudent(id){
        const query = `SELECT * FROM Student WHERE id=${id}`
        const res = await pool.query(query)
        return res.rows[0];
    }
    async getAllStudents(){

        return await this.Student.getAllStudent();

    }
}
export {Student}