import {gql} from "apollo-boost";

const deleteClass = gql`
    mutation deleteClass($class: Int!) {
        deleteClass(id: $class) 
    }
`;
export default deleteClass;