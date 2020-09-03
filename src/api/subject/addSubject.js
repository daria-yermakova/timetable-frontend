import {gql} from "apollo-boost";

const addSubject = gql`
    mutation addSubject($subject: ISubjectInsert!) {
        addSubject(subjectDto: $subject) {
            id
            name
            hours
        }
    }
`;
export default addSubject;