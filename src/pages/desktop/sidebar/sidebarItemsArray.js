import {Group, Today, ExitToApp, MenuBook, MeetingRoom, Wc, AccessTime, VerifiedUser} from '@material-ui/icons';
import React from 'react';
const itemsArray =
    [
        {
            title: 'TEACHER',
            icon: <Group style={{ fontSize: 25, fill: "#37474f" }}/>,
            path: 'teacher',
            onlyAdmin: true
        },
        {
            title: 'SUBJECT',
            icon: <MenuBook style={{ fontSize: 25, fill: "#37474f" }}/>,
            path: 'subject',
            onlyAdmin: true
        },
        {
            title: 'CABINET',
            icon: <MeetingRoom style={{ fontSize: 25, fill: "#37474f" }}/>,
            path: 'cabinet',
            onlyAdmin: true
        },
        {
            title: 'CLASSES',
            icon: <Wc style={{ fontSize: 25, fill: "#37474f" }}/>,
            path: 'class',
            onlyAdmin: true
        },
        {
            title: 'LESSONS',
            icon: <AccessTime style={{ fontSize: 25, fill: "#37474f" }}/>,
            path: 'lesson',
            onlyAdmin: true
        },
        {
            title: 'TIMETABLE',
            icon: <Today style={{ fontSize: 25, fill: "#37474f" }}/>,
            path: 'timetable',
            onlyAdmin: false
        },
        {
            title: 'USERS',
            icon: <VerifiedUser style={{ fontSize: 25, fill: "#37474f" }}/>,
            path: 'users',
            onlyAdmin: true
        },
        {
            title: 'LOGOUT',
            icon: <ExitToApp style={{ fontSize: 25, fill: "#37474f" }}/>,
            path: 'auth',
            onlyAdmin: false
        },
    ];

export default itemsArray;