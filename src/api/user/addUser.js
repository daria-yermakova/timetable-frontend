import {gql} from "apollo-boost";

const addUser = gql`
    mutation addUser($user: IUserInsert!) {
        addUser(userDto: $user) {
            id
            username
            password
            status
        }
    }
`;
export default addUser;