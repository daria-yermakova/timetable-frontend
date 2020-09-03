import Container from "@material-ui/core/Container";
import React, {useEffect} from "react";
import MaterialTable from "material-table";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import getAllLessons from "../../../../api/lesson/getAllLessons";
import {makeStyles} from "@material-ui/core/styles";
import addLesson from "../../../../api/lesson/addLesson";
import updateLesson from "../../../../api/lesson/updateLesson";
import deleteLesson from "../../../../api/lesson/deleteLesson";

const useStyles = makeStyles({
    container: {
        marginTop: '10%',
    },
});

const Lesson = () => {
    const [addLes, { data: addData }] = useMutation(addLesson);
    const [updLes, { data: updData }] = useMutation(updateLesson);
    const [delLes, { data: delData }] = useMutation(deleteLesson);
    const [getAll, {data}] = useLazyQuery(getAllLessons);
    useEffect(() => {
        getAll();
    }, []);
    const columns = [
        {title: 'ID', field: 'id', editable: 'never', sorting: 'true'},
        {title: 'Number lesson', field: 'number_lesson'},
        {title: 'Start lesson', field: 'start_lesson'},
        {title: 'End lesson', field: 'end_lesson'},
    ];
    const [tableData, setData] = React.useState([]);

    useEffect(() => {
        if (data) {
            setData(data.getAllLessons);
        }
    }, [data]);

    useEffect(() => {
        if (addData) {
            setData([...tableData, addData.addLesson]);
        }
    }, [addData]);

    useEffect(() => {
        if (updData) {
            const updated = tableData.map(element => element.id === updData.updateLesson.id ? updData.updateLesson : element);
            setData(updated);
        }
    }, [updData]);

    useEffect(() => {
        if (delData) {
            const updated = tableData.filter(element => +element.id !== delData.deleteLesson);
            setData(updated);
        }
    }, [delData]);
    const styles = useStyles();
    return (
        <Container className={styles.container}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <MaterialTable
                title="LESSONS"
                columns={columns}
                data={tableData || []}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                addLes({
                                    variables: { lesson: {number_lesson: newData.number_lesson, start_lesson: newData.start_lesson, end_lesson: newData.end_lesson }},
                                });
                                resolve();
                            }, 500);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                updLes({variables: {lesson: {
                                            id: oldData.id, number_lesson: newData.number_lesson, start_lesson: newData.start_lesson, end_lesson: newData.end_lesson
                                        }}});
                                resolve();
                            }, 500);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                delLes({variables:{lesson: oldData.id}});
                                resolve();
                            }, 500);
                        }),
                }}
            />
        </Container>
    );
};

export default Lesson;
