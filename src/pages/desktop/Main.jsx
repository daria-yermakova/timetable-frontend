import Sidebar from './sidebar/Sidebar';
import React from 'react';
import Content from "./content/Content";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles=makeStyles({
    flex: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
});

const Main = () => {
    const styles = useStyles();
    return(
        <Paper className={styles.flex}>
            <Sidebar/>
            <Content/>
        </Paper>
    );
};

export default Main;