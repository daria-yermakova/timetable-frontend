import {makeStyles} from "@material-ui/core/styles";
import {Container, FormControl, MenuItem, Select} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import getAllLessons from "../../../../api/lesson/getAllLessons";
import getAllCabinets from "../../../../api/cabinet/getAllCabinets";
import getAllClass from "../../../../api/class/getAllClasses";
import getAllAssignments from "../../../../api/assignment/getAllAssignments";
import MaterialTable from "material-table";
import addTimetable from "../../../../api/timetable/addTimetable";
import updateTimetable from "../../../../api/timetable/updateTimetable";
import deleteTimetable from "../../../../api/timetable/deleteTimetable";
import getAllTimetables from "../../../../api/timetable/getAllTimetables";

const useStyles = makeStyles({
    container: {
        marginTop: '10%',
    },
});

const Timetable = () => {
    const styles = useStyles();
    const [addTt, {data: addData}] = useMutation(addTimetable);
    const [updTt, {data: updData}] = useMutation(updateTimetable);
    const [delTt, {data: delData}] = useMutation(deleteTimetable);
    const [getAll, {data}] = useLazyQuery(getAllTimetables);

    const [tableData, setData] = useState([]);
    useEffect(() => {
        getAll();
        getAllAssign();
        getAllCab();
        getAllCl();
        getAllLes();
    }, []);

    useEffect(() => {
        if (data) {
            setData(data.getAllTimetables);
        }
    }, [data]);

    useEffect(() => {
        if (addData) {
            setData([...tableData, addData.addTimetable]);
        }
    }, [addData]);

    useEffect(() => {
        if (updData) {
            const updated = tableData.map(element => element.id === updData.updateTimetable.id ? updData.updateTimetable : element);
            setData(updated);
        }
    }, [updData]);

    useEffect(() => {
        if (delData) {
            const updated = tableData.filter(element => +element.id !== delData.deleteTimetable);
            console.log(updated)
            setData(updated);
        }
    }, [delData]);


    const [getAllLes, {data: lessons}] = useLazyQuery(getAllLessons);
    const [allLessons, setLessons] = useState([]);
    useEffect(() => {
        if (lessons) {
            setLessons(lessons.getAllLessons);
        }
    }, [lessons]);

    const [getAllCab, {data: cabinets}] = useLazyQuery(getAllCabinets);
    const [allCabinets, setCabinets] = useState([]);
    useEffect(() => {
        if (cabinets) {
            setCabinets(cabinets.getAllCabinets);
        }
    }, [cabinets]);

    const [getAllCl, {data: classes}] = useLazyQuery(getAllClass);
    const [allClasses, setClasses] = useState([]);
    useEffect(() => {
        if (classes) {
            setClasses(classes.getAllClass);
        }
    }, [classes]);

    const [getAllAssign, {data: assignments}] = useLazyQuery(getAllAssignments);
    const [allAssign, setAssign] = useState([]);
    useEffect(() => {
        if (assignments) {
            setAssign(assignments.getAllAssignments);
        }
    }, [assignments]);

    const columnsForUser = [
        {title: 'ID', field: 'id', editable: 'never', sorting: 'true'},
        {
            title: 'Lesson', field: 'lesson', editable: 'never',
            render: rowData =>
                <div>{rowData.lesson.number_lesson + ' : ' + rowData.lesson.start_lesson + ' - ' + rowData.lesson.end_lesson}</div>,
        },
        {
            title: 'Cabinet', field: 'cabinet', editable: 'never',
            render: rowData => <div>{rowData.cabinet.name_cabinet + ' - ' + rowData.cabinet.amount_place}</div>,
        },
        {
            title: 'Class', field: 'class_time', editable: 'never',
            render: rowData => <div>{rowData.class_time.name_class + ' - ' + rowData.class_time.amount_person}</div>,
        },
        {
            title: 'Assignment', field: 'assignments', editable: 'never',
            render: rowData => <div>{rowData.assignments.teacher.fio + ' - ' + rowData.assignments.subject.name}</div>,
        },
    ];

    const columnsForAdmin = [
        {title: 'ID', field: 'id', editable: 'never', sorting: 'true'},
        {
            title: 'Lesson', field: 'lesson',
            render: rowData =>
                <div>{rowData.lesson.number_lesson + ' : ' + rowData.lesson.start_lesson + ' - ' + rowData.lesson.end_lesson}</div>,
            editComponent: rowData => {
                return (
                    <FormControl>
                        <Select
                            value={rowData.value}
                            onChange={e => rowData.onChange(e.target.value)}
                            renderValue={(selected) => `${selected.number_lesson}: ${selected.start_lesson} - ${selected.end_lesson}`}
                        >
                            {allLessons.map(element =>
                                <MenuItem value={element} key={element.id}>
                                    {`${element.number_lesson}: ${element.start_lesson} - ${element.end_lesson}`}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>);
            }
        },
        {
            title: 'Cabinet', field: 'cabinet',
            render: rowData => <div>{rowData.cabinet.name_cabinet + ' - ' + rowData.cabinet.amount_place}</div>,
            editComponent: rowData => {
                return (
                    <FormControl>
                        <Select
                            value={rowData.value}
                            onChange={e => rowData.onChange(e.target.value)}
                            renderValue={(selected) => {
                                return `${selected.name_cabinet} - ${selected.amount_place}`;
                            }}
                        >
                            {allCabinets.map(element =>
                                <MenuItem value={element} key={element.id}>
                                    {`${element.name_cabinet} - ${element.amount_place}`}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>);
            }
        },
        {
            title: 'Class', field: 'class_time',
            render: rowData => <div>{rowData.class_time.name_class + ' - ' + rowData.class_time.amount_person}</div>,
            editComponent: rowData => {
                return (
                    <FormControl>
                        <Select
                            value={rowData.value}
                            onChange={e => rowData.onChange(e.target.value)}
                            renderValue={(selected) => `${selected.name_class} - ${selected.amount_person}`}
                        >
                            {allClasses.map(element =>
                                <MenuItem value={element} key={element.id}>
                                    {`${element.name_class} - ${element.amount_person}`}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>);
            }
        },
        {
            title: 'Assignment', field: 'assignments',
            render: rowData => <div>{rowData.assignments.teacher.fio + ' - ' + rowData.assignments.subject.name}</div>,
            editComponent: rowData => {
                return (
                    <FormControl>
                        <Select
                            value={rowData.value}
                            onChange={e => rowData.onChange(e.target.value)}
                            renderValue={(selected) => `${selected.teacher.fio} - ${selected.subject.name}`}
                            defaultValue={[]}
                        >
                            {allAssign.map(element =>
                                <MenuItem value={element} key={element.id}>
                                    {element.teacher.fio + ' - ' + element.subject.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>);
            }
        },
    ];

    let columns = [];
    if(localStorage.getItem('isAdmin') === '1')
        columns = columnsForAdmin;
    else columns = columnsForUser;

    return (
        <Container className={styles.container}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <MaterialTable
                title="TIMETABLE"
                columns={columns}
                data={tableData || []}
                editable={localStorage.getItem('isAdmin') === '1' ? {
                    onRowAdd: (newData) => {
                        let isCabBusy = false, isClassBusy = false, isTeachBusy = false;
                        const isBusy = tableData.some(el => {
                            isClassBusy = el.lesson.id === newData.lesson.id && el.class_time.id === newData.class_time.id;
                            isCabBusy = el.lesson.id === newData.lesson.id && el.cabinet.id === newData.cabinet.id;
                            isTeachBusy = el.lesson.id === newData.lesson.id && el.assignments.teacher.id === newData.assignments.teacher.id;
                            console.log(isCabBusy, isClassBusy, isTeachBusy);
                            return isCabBusy || isTeachBusy || isClassBusy;
                        });
                        return new Promise(resolve => {
                            setTimeout(() => {
                                let isAmountPlaces = newData.class_time.amount_person > newData.cabinet.amount_place;
                                if (isBusy || isAmountPlaces) {
                                    const message = `${isClassBusy ? 'Class is busy\n' : ''} 
                                                    ${isCabBusy ? 'Cabinet is busy\n' : ''}
                                                    ${isTeachBusy ? 'Teacher is busy\n' : ''}
                                                    ${isAmountPlaces ? 'Not enough places at cabinet\n' : ''}`;
                                    alert(message);
                                    resolve();
                                }
                                else {
                                    addTt({
                                        variables: {
                                            timetable:
                                                {
                                                    id_assignments: newData.assignments.id,
                                                    id_class: newData.class_time.id,
                                                    id_lesson: newData.lesson.id,
                                                    id_cabinet: newData.cabinet.id
                                                }
                                        },
                                    });
                                }
                                resolve();
                            }, 800);
                        });},
                    onRowUpdate: (newData, oldData) =>{
                        let isCabBusy = false, isClassBusy = false, isTeachBusy = false;
                        const isBusy = tableData.some(el => {
                            isClassBusy = el.lesson.id === newData.lesson.id && el.class_time.id === newData.class_time.id;
                            isCabBusy = el.lesson.id === newData.lesson.id && el.cabinet.id === newData.cabinet.id;
                            isTeachBusy = el.lesson.id === newData.lesson.id && el.assignments.teacher.id === newData.assignments.teacher.id;
                            console.log(isCabBusy, isClassBusy, isTeachBusy);
                            return isCabBusy || isTeachBusy || isClassBusy;
                        });
                        return   new Promise(resolve => {
                            let isAmountPlaces = newData.class_time.amount_person > newData.cabinet.amount_place;
                            if (isBusy || isAmountPlaces) {
                                const message = `${isClassBusy ? 'Class is busy\n' : ''} 
                                                 ${isCabBusy ? 'Cabinet is busy\n' : ''}
                                                 ${isTeachBusy ? 'Teacher is busy\n' : ''}
                                                 ${isAmountPlaces ? 'Not enough places at cabinet\n' : ''}`;
                                alert(message);
                                resolve();
                            }
                            else {
                                setTimeout(() => {
                                    updTt({
                                        variables: {
                                            timetable:
                                                {
                                                    id: newData.id,
                                                    id_assignments: newData.assignments.id,
                                                    id_class: newData.class_time.id,
                                                    id_lesson: newData.lesson.id,
                                                    id_cabinet: newData.cabinet.id
                                                }
                                        },
                                    });
                                    resolve();
                                }, 500);
                            }
                        }
                    )},
                    onRowDelete: (oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                delTt({variables: {timetable: oldData.id}});
                                resolve();
                            }, 500);
                        }),
                } : undefined}
            />
        </Container>
    );
};

export default Timetable;
