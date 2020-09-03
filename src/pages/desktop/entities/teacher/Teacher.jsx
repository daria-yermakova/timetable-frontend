import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import addTeacher from "../../../../api/teacher/addTeacher";
import updateTeacher from "../../../../api/teacher/updateTeacher";
import deleteTeacher from "../../../../api/teacher/deleteTeacher";
import getAllTeachers from "../../../../api/teacher/getAllTeachers";
import getAllSubjects from "../../../../api/subject/getAllSubjects";
import MaterialTable from "material-table";
import {Container, Select, MenuItem, FormControl} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    container: {
        marginTop: '10%',
    },
});

const Teacher = () =>{
    const [addTeach, { data: addData }] = useMutation(addTeacher);
    const [updTeach, { data: updData }] = useMutation(updateTeacher);
    const [delTeach, { data: delData }] = useMutation(deleteTeacher);
    const [getAll, {data}] = useLazyQuery(getAllTeachers);
    const [getAllSubj, {data: subj}] = useLazyQuery(getAllSubjects);

    const [tableData, setData] = useState([]);
    const [allSubjects, setSubjects] = useState([]);
    useEffect(() => {
        getAll();
        getAllSubj();
    }, []);

    useEffect(() => {
        if (data) {
            const renderData = data.getAllTeachers.map(teacher => ({...teacher, subjects: teacher.subjects.map(s => s.name)}));
            setData(renderData);
        }
    }, [data]);

    useEffect(() => {
        if (addData) {
            setData([...tableData, {...addData.addTeacher, subjects: addData.addTeacher.subjects.map(s => s.name)}]);
        }
    }, [addData]);

    useEffect(() => {
        if (updData) {
            const updated = tableData.map(element => element.id === updData.updateTeacher.id
                ? {...updData.updateTeacher, subjects: updData.updateTeacher.subjects.map(s => s.name)}
                : element
            );
            setData(updated);
        }
    }, [updData]);

    useEffect(() => {
        if (delData) {
            const updated = tableData.filter(element => +element.id !== delData.deleteTeacher);
            setData(updated);
        }
    }, [delData]);

    useEffect(() => {
        if (subj) {
            setSubjects(subj.getAllSubjects);
        }
    }, [subj]);

    const columns = [
        {title: 'ID', field: 'id', editable: 'never', sorting: 'true'},
        {title: 'FIO', field: 'fio'},
        {title: 'Birth', field: 'birth',
        editComponent: rowData => {
            return (
                <TextField
                    name="startDate"
                    value={rowData.value}
                    type="date"
                    onChange={e => rowData.onChange(e.target.value)}
                    margin="dense"
                    defaultValue={(new Date()).toString('yyyy-mm-dd')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            );
        }},
        {
            title: 'Subjects', field: 'subjects',
            render: rowData => <div>{rowData.subjects.join(', ')}</div>,
            editComponent: rowData => {
                return (
                    <FormControl>
                        <Select
                            multiple
                            value={rowData.value}
                            onChange={e => rowData.onChange(e.target.value)}
                            renderValue={(selected) => selected.join(', ')}
                            defaultValue={[]}
                        >
                            {allSubjects.map(element =>
                                <MenuItem value={element.name} key={element.id}>
                                    {element.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>);
            }
        }
    ];
    const styles = useStyles();
    return(
        <Container className={styles.container}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <MaterialTable
                title="TEACHERS"
                columns={columns}
                data={tableData || []}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                const subjects = [];
                                if(newData.subjects){
                                    newData.subjects.forEach(name => {
                                        const finded = allSubjects.find(subject => subject.name === name);
                                        if (finded) {
                                            subjects.push(finded);
                                        }
                                    });
                                }
                                addTeach({
                                    variables: { teacher: {fio: newData.fio, birth: newData.birth, subjects: subjects}},
                                });
                                resolve();
                            }, 500);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                const subjects = [];
                                if(newData.subjects){
                                    newData.subjects.forEach(name => {
                                        const finded = allSubjects.find(subject => subject.name === name);
                                        if (finded) {
                                            subjects.push(finded);
                                        }
                                    });
                                }
                                updTeach({variables: {teacher: {
                                            id: oldData.id, fio: newData.fio, birth: newData.birth, subjects: subjects
                                        }}});
                                resolve();
                            }, 500);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                const subjects = [];
                                if (oldData.subjects){
                                    oldData.subjects.forEach(name => {
                                        const finded = allSubjects.find(subject => subject.name === name);
                                        if (finded) {
                                            subjects.push(finded);
                                        }
                                    });
                                }
                                delTeach({variables:{teacher: oldData.id, subjects: subjects}});
                                resolve();
                            }, 500);
                        }),
                }}
            />
        </Container>
    );
};

export default Teacher;
