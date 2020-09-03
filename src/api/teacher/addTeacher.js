import {gql} from "apollo-boost";

const addTeacher = gql`
    mutation addTeacher($teacher: ITeacherInsert!) {
        addTeacher(teacherDto: $teacher) {
            id
            fio
            birth
            subjects{ id name }
        }
    }
`;
export default addTeacher;