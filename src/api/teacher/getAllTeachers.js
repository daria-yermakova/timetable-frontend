import {gql} from "apollo-boost";

const getAllTeachers = gql`
    {
        getAllTeachers {
            id
            fio
            birth
            subjects{ id name }
        }
    }
`;
export default getAllTeachers;