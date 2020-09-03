import Container from "@material-ui/core/Container";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import MaterialTable from "material-table";
import addUser from "../../../../api/user/addUser";
import updateUser from "../../../../api/user/updateUser";
import deleteUser from "../../../../api/user/deleteUser";
import getAllUsers from "../../../../api/user/getAllUsers";
import {FormControl, MenuItem, Select} from "@material-ui/core";


const useStyles = makeStyles({
    container: {
        marginTop: '10%',
    },
});

const User = () =>{

    const [addUs, { data: addData }] = useMutation(addUser);
    const [updUs, { data: updData }] = useMutation(updateUser);
    const [delUs, { data: delData }] = useMutation(deleteUser);
    const [getAll, {data}] = useLazyQuery(getAllUsers);
    useEffect(() => {
        getAll();
    }, []);
    const columns = [
        {title: 'ID', field: 'id', editable: 'never', sorting: 'true'},
        {title: 'Username', field: 'username'},
        {title: 'Password', field: 'password'},
        {title: 'Status', field: 'status',
            editComponent: rowData => {
                return (
                    <FormControl>
                        <Select
                            value={rowData.value}
                            onChange={e => rowData.onChange(e.target.value)}
                            renderValue={(selected) => selected}
                        >
                            <MenuItem value={"ADMIN"} key={"ADMIN"}>ADMIN</MenuItem>
                            <MenuItem value={"USER"} key={"USER"}>USER</MenuItem>
                        </Select>
                    </FormControl>);
            }},
    ];
    const [tableData, setData] = React.useState([]);

    useEffect(() => {
        if (data) {
            setData(data.getAllUsers);
        }
    }, [data]);

    useEffect(() => {
        if (addData) {
            setData([...tableData, addData.addUser]);
        }
    }, [addData]);

    useEffect(() => {
        if (updData) {
            const updated = tableData.map(element => element.id === updData.updateUser.id ? updData.updateUser : element);
            setData(updated);
        }
    }, [updData]);

    useEffect(() => {
        if (delData) {
            const updated = tableData.filter(element => +element.id !== delData.deleteUser);
            setData(updated);
        }
    }, [delData]);
    const styles = useStyles();

    return(
        <Container className={styles.container}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <MaterialTable
                title="USERS"
                columns={columns}
                data={tableData || []}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                addUs({
                                    variables: { user: {username: newData.username, password: newData.password, status: newData.status }},
                                });
                                resolve();
                            }, 500);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                updUs({variables: {user: {
                                            id: oldData.id, username: newData.username, password: newData.password, status: newData.status
                                        }}});
                                resolve();
                            }, 500);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                delUs({variables:{user: oldData.id}});
                                resolve();
                            }, 500);
                        }),
                }}
            />
        </Container>
    );
};

export default User;