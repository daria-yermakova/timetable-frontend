import {gql} from "apollo-boost";

const updateUser = gql`
    mutation updateUser($user: IUser!) {
        updateUser(newDto: $user) {
            id
            username
            password
            status
        }
    }
`;
export default updateUser;