import Container from "@material-ui/core/Container";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import addClass from "../../../../api/class/addClass";
import updateClass from "../../../../api/class/updateClass";
import deleteClass from "../../../../api/class/deleteClass";
import getAllClass from "../../../../api/class/getAllClasses";
import MaterialTable from "material-table";

const useStyles = makeStyles({
    container: {
        marginTop: '10%',
    },
});

const Class = () =>{

    const [addCl, { data: addData }] = useMutation(addClass);
    const [updCl, { data: updData }] = useMutation(updateClass);
    const [delCl, { data: delData }] = useMutation(deleteClass);
    const [getAll, {data}] = useLazyQuery(getAllClass);
    useEffect(() => {
        getAll();
    }, []);
    const columns = [
        {title: 'ID', field: 'id', editable: 'never', sorting: 'true'},
        {title: 'Name', field: 'name_class'},
        {title: 'Amount person', field: 'amount_person'},
    ];
    const [tableData, setData] = React.useState([]);

    useEffect(() => {
        if (data) {
            setData(data.getAllClass);
        }
    }, [data]);

    useEffect(() => {
        if (addData) {
            setData([...tableData, addData.addClass]);
        }
    }, [addData]);

    useEffect(() => {
        if (updData) {
            const updated = tableData.map(element => element.id === updData.updateClass.id ? updData.updateClass : element);
            setData(updated);
        }
    }, [updData]);

    useEffect(() => {
        if (delData) {
            const updated = tableData.filter(element => +element.id !== delData.deleteClass);
            setData(updated);
        }
    }, [delData]);
    const styles = useStyles();
    return(
        <Container className={styles.container}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <MaterialTable
                title="CLASSES"
                columns={columns}
                data={tableData || []}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                addCl({
                                    variables: { class: {name_class: newData.name_class, amount_person: newData.amount_person }},
                                });
                                resolve();
                            }, 500);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                updCl({variables: {class: {
                                            id: oldData.id, name_class: newData.name_class, amount_person: newData.amount_person
                                        }}});
                                resolve();
                            }, 500);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                delCl({variables:{class: oldData.id}});
                                resolve();
                            }, 500);
                        }),
                }}
            />
        </Container>
    );
};

export default Class;