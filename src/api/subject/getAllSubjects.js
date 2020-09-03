import {gql} from "apollo-boost";

const getAllSubjects = gql`
    {
        getAllSubjects {
            id 
            name 
            hours
        }
    }
`;
export default getAllSubjects;