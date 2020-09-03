import {gql} from "apollo-boost";

const updateCabinet = gql`
    mutation updateCabinet($cabinet: ICabinet!) {
        updateCabinet(newDto: $cabinet) {
            id
            amount_place
            name_cabinet
        }
    }
`;
export default updateCabinet;