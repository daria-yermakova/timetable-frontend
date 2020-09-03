import auth from '../../api/auth';
import {Typography, TextField, Paper, Button} from '@material-ui/core';
import useStyles from './styles';
import React, {useEffect, useState} from "react";
import {useLazyQuery} from '@apollo/react-hooks';
import {Redirect, useHistory, useLocation} from 'react-router-dom';

const  AuthPage = () => {

    const styles = useStyles();

    const [username, setUsername] = useState('');
    const changeUsername = (e) => {
        setUsername(e.target.value);
    };

    const [password, setPassword] = useState('');
    const changePassword = (e) => {
        setPassword(e.target.value);
    };
    const [submitAuth, { data }] = useLazyQuery(auth(username, password));
    let history = useHistory();

    useEffect(()=> {
        if(data){
            if(data.isAdmin === 0)
            {
                alert('User is not exist!');
            }
            else {
                localStorage.setItem('isAdmin', data.isAdmin);
                history.push('/main');
            }
            console.log(data);
            setUsername('');
            setPassword('');
        }
        }, [data]);

    return (
        <Paper className={styles.container} >
            <Paper className={styles.authContainer} elevation={0}>
            <Typography variant="h5" component="h6" className={styles.title}>USERNAME</Typography>
            <TextField name="username" value={username} margin="dense" onChange={changeUsername} variant="outlined" className={styles.input}/>
            <Typography variant="h5" component="h6" className={styles.title}>PASSWORD</Typography>
            <TextField name="password" value={password} margin="dense" onChange={changePassword} variant="outlined" className={styles.input} type="password"/>
            <Button variant="contained" className={styles.button} onClick={submitAuth}>
                CONFIRM
            </Button>
        </Paper>
        </Paper>
    );
};

export default AuthPage;