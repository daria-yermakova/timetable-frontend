import {gql} from "apollo-boost";

const auth = (username, password) => gql`
    {
        isAdmin(username: "${username}", password:"${password}")
    }
`;
export default auth;