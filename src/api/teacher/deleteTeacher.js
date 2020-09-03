import {gql} from "apollo-boost";

const deleteTeacher = gql`
    mutation deleteTeacher($teacher: Int!, $subjects: [ISubjectTeacher]! ) {
        deleteTeacher(id: $teacher, subjects: $subjects)
    }
`;
export default deleteTeacher;