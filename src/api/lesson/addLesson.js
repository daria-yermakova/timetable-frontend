import {gql} from "apollo-boost";

const addLesson = gql`    
        mutation addLesson($lesson: ILessonInsert!) {
        addLesson(lessonDto: $lesson) {
            id
            number_lesson
            start_lesson
            end_lesson
        }
    }
`;
export default addLesson;