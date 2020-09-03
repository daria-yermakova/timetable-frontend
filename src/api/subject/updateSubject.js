import {gql} from "apollo-boost";

const updateSubject = gql`
    mutation updateSubject($subject: ISubject!) {
        updateSubject(newDto: $subject) {
            id
            name
            hours
        }
    }
`;
export default updateSubject;