import {gql} from "apollo-boost";

const deleteCabinet = gql`
    mutation deleteCabinet($cabinet: Int!) {
        deleteCabinet(id: $cabinet) 
    }
`;
export default deleteCabinet;