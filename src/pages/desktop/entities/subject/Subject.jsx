import Container from "@material-ui/core/Container";
import React, {useEffect} from "react";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {makeStyles} from "@material-ui/core/styles";
import addSubject from "../../../../api/subject/addSubject";
import updateSubject from "../../../../api/subject/updateSubject";
import deleteLesson from "../../../../api/lesson/deleteLesson";
import MaterialTable from "material-table";
import getAllSubjects from "../../../../api/subject/getAllSubjects";
import deleteSubject from "../../../../api/subject/deleteSubject";

const useStyles = makeStyles({
    container: {
        marginTop: '10%',
    },
});

const Subject = () =>{
    const [addSubj, { data: addData }] = useMutation(addSubject);
    const [updSubj, { data: updData }] = useMutation(updateSubject);
    const [delSubj, { data: delData }] = useMutation(deleteSubject);
    const [getAll, {data}] = useLazyQuery(getAllSubjects);

    useEffect(() => {
        getAll();
    }, []);
    const columns = [
        {title: 'ID', field: 'id', editable: 'never', sorting: 'true'},
        {title: 'Name', field: 'name'},
        {title: 'Hours', field: 'hours'},
    ];
    const [tableData, setData] = React.useState([]);

    useEffect(() => {
        if (data) {
            setData(data.getAllSubjects);
        }
    }, [data]);

    useEffect(() => {
        if (addData) {
            setData([...tableData, addData.addSubject]);
        }
    }, [addData]);

    useEffect(() => {
        if (updData) {
            const updated = tableData.map(element => element.id === updData.updateSubject.id ? updData.updateSubject : element);
            setData(updated);
        }
    }, [updData]);

    useEffect(() => {
        if (delData) {
            const updated = tableData.filter(element => +element.id !== delData.deleteSubject);
            setData(updated);
        }
    }, [delData]);
    const styles = useStyles();
    return(
        <Container className={styles.container}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <MaterialTable
                title="SUBJECTS"
                columns={columns}
                data={tableData || []}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                addSubj({
                                    variables: { subject: {name: newData.name, hours: newData.hours}},
                                });
                                resolve();
                            }, 500);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                updSubj({variables: {subject: {
                                            id: oldData.id, name: newData.name, hours: newData.hours
                                        }}});
                                resolve();
                            }, 500);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                delSubj({variables:{subject: oldData.id}});
                                resolve();
                            }, 500);
                        }),
                }}
            />
        </Container>
    );
};

export default Subject;