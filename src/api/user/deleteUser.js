import {gql} from "apollo-boost";

const deleteUser = gql`
    mutation deleteUser($user: Int!) {
        deleteUser(id: $user) 
    }
`;
export default deleteUser;