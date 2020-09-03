import {gql} from "apollo-boost";

const getAllCabinets = gql`
    {
        getAllCabinets {
            id 
            amount_place 
            name_cabinet
        }
    }
`;
export default getAllCabinets;