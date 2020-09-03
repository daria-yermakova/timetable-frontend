import {gql} from "apollo-boost";

const updateTimetable = gql`
    mutation updateTimetable($timetable: ITimetable!) {
        updateTimetable(timetable: $timetable) {
            id
            assignments{
                id
                teacher{
                    id
                    fio
                }
                subject{
                    id
                    name
                }
            }
            lesson{
                id
                number_lesson
                start_lesson
                end_lesson
            }
            cabinet{
                id
                name_cabinet
                amount_place
            }
            class_time{
                id
                amount_person
                name_class
            }
        }
    }
`;
export default updateTimetable;