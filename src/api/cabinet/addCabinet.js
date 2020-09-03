import {gql} from "apollo-boost";

const addCabinet = gql`
    mutation addCabinet($cabinet: ICabinetInsert!) {
        addCabinet(cabinetDto: $cabinet) {
            id
            amount_place
            name_cabinet
        }
    }
`;
export default addCabinet;