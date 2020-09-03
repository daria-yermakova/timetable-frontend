import {gql} from "apollo-boost";

const updateTeacher = gql`
    mutation updateTeacher($teacher: ITeacher!) {
        updateTeacher(newDto: $teacher) {
            id
            fio
            birth
            subjects{ id name }
        }
    }
`;
export default updateTeacher;