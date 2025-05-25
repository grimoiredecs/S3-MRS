
import "../Database/connection/postgres"
import "../Persistence/Student"
import {Student} from "../Persistence/Student";


class StudentServices {
    constructor() {
        this.Student = new Student()
    }
    async getStudent(id){
        const student = await this.Student.getStudent(id);
        if (!student){
            throw new Error(`${id} not found`)
        }
        return student
    }
    async getAllStudents() {

        const res = await this.getAllStudents();
        return res.rows;
    }

}