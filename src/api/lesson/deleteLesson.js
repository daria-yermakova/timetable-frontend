import {gql} from "apollo-boost";

const deleteLesson = gql`
    mutation deleteLesson($lesson: Int!) {
        deleteLesson(id: $lesson) 
    }
`;
export default deleteLesson;