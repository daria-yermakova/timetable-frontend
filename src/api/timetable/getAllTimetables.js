import {gql} from "apollo-boost";

const getAllTimetables = gql`
    {
        getAllTimetables {
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
                name_class
                amount_person
            }
        }
    }
`;
export default getAllTimetables;