import Container from "@material-ui/core/Container";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import addCabinet from "../../../../api/cabinet/addCabinet";
import deleteCabinet from "../../../../api/cabinet/deleteCabinet";
import updateCabinet from "../../../../api/cabinet/updateCabinet";
import getAllCabinets from "../../../../api/cabinet/getAllCabinets";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import MaterialTable from "material-table";


const useStyles = makeStyles({
    container: {
        marginTop: '10%',
    },
});

const Cabinet = () =>{

    const [addCab, { data: addData }] = useMutation(addCabinet);
    const [updCab, { data: updData }] = useMutation(updateCabinet);
    const [delCab, { data: delData }] = useMutation(deleteCabinet);
    const [getAll, {data}] = useLazyQuery(getAllCabinets);
    useEffect(() => {
        getAll();
    }, []);
    const columns = [
        {title: 'ID', field: 'id', editable: 'never', sorting: 'true'},
        {title: 'Name', field: 'name_cabinet'},
        {title: 'Amount place', field: 'amount_place'},
    ];
    const [tableData, setData] = React.useState([]);

    useEffect(() => {
        if (data) {
            setData(data.getAllCabinets);
        }
    }, [data]);

    useEffect(() => {
        if (addData) {
            setData([...tableData, addData.addCabinet]);
        }
    }, [addData]);

    useEffect(() => {
        if (updData) {
            const updated = tableData.map(element => element.id === updData.updateCabinet.id ? updData.updateCabinet : element);
            setData(updated);
        }
    }, [updData]);

    useEffect(() => {
        if (delData) {
            const updated = tableData.filter(element => +element.id !== delData.deleteCabinet);
            setData(updated);
        }
    }, [delData]);
    const styles = useStyles();

    return(
        <Container className={styles.container}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <MaterialTable
                title="CABINETS"
                columns={columns}
                data={tableData || []}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                addCab({
                                    variables: { cabinet: {name_cabinet: newData.name_cabinet, amount_place: newData.amount_place }},
                                });
                                resolve();
                            }, 500);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                updCab({variables: {cabinet: {
                                            id: oldData.id, name_cabinet: newData.name_cabinet, amount_place: newData.amount_place
                                        }}});
                                resolve();
                            }, 500);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                delCab({variables:{cabinet: oldData.id}});
                                resolve();
                            }, 500);
                        }),
                }}
            />
        </Container>
    );
};

export default Cabinet;