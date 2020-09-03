import {gql} from "apollo-boost";

const deleteSubject = gql`
    mutation deleteSubject($subject: Int!) {
        deleteSubject(id: $subject) 
    }
`;
export default deleteSubject;