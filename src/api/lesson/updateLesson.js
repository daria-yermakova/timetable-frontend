import {gql} from "apollo-boost";

const updateLesson = gql`
    mutation updateLesson($lesson: ILesson!) {
        updateLesson(newDto: $lesson) {
            id
            number_lesson
            start_lesson
            end_lesson
        }
    }
`;
export default updateLesson;