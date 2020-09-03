import {gql} from "apollo-boost";

const getAllUsers = gql`
    {
        getAllUsers {
            id
            username
            password
            status 
        }
    }
`;
export default getAllUsers;