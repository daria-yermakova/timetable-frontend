import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import useStyles from "../sidebar/styles";
import {Person} from '@material-ui/icons';
import itemsArray from "./sidebarItemsArray";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(()=>{
        setIsAdmin(localStorage.getItem('isAdmin'));
    }, []);
    const styles = useStyles();

    let array = [];
    if(isAdmin === '1') array = itemsArray;
    else array = itemsArray.filter(element => !element.onlyAdmin);
    console.log(isAdmin);
    console.log(array);

    return (
        <Paper className={styles.sidebar}>
            <Paper className={styles.sidebarHeader}>
                <Person name="user-circle" style={{ fontSize: 80, fill: "#37474f" }}/>
                <Typography variant="h3" component="h4" gutterBottom className={styles.h2}>
                    TIMETABLE
                </Typography>
            </Paper>
                {array.map((item, index) => (
                    <SidebarItem
                        key={item.title}
                        path={item.path}
                        title={item.title}
                        icon={item.icon}
                    />
                ))}
        </Paper>
    );
};

export default Sidebar;
