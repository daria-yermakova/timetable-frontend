import {gql} from "apollo-boost";

const getAllLessons = gql`
    {
            getAllLessons {
                id
                number_lesson
                start_lesson
                end_lesson
            }
    }
`;
export default getAllLessons;