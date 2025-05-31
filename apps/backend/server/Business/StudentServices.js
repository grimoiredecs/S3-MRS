
import "../Database/postgres.js"
import "../Persistence/Student.js"
import {Student} from "../Persistence/Student.js";


export class StudentServices {
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
    async studentExists(id) {
        return await this.Student.exists(id);
    }

}