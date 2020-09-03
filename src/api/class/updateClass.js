import {gql} from "apollo-boost";

const updateClass = gql`
    mutation updateClass($class: IClass!) {
        updateClass(newDto: $class) {
            id
            amount_person
            name_class
        }
    }
`;
export default updateClass;