import {gql} from "apollo-boost";

const addClass = gql`
    mutation addClass($class: IClassInsert!) {
        addClass(classDto: $class) {
            id
            amount_person
            name_class
        }
    }
`;
export default addClass;