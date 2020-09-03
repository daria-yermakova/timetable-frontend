import {gql} from "apollo-boost";

const getAllClass = gql`
    {
        getAllClass {
            id 
            name_class
            amount_person
        }
    }
`;
export default getAllClass;