import {gql} from "apollo-boost";

const deleteTimetable = gql`
    mutation deleteTimetable($timetable: Int!) {
        deleteTimetable(id: $timetable)
    }
`;
export default deleteTimetable;