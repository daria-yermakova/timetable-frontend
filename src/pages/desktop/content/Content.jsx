import Container from "@material-ui/core/Container";
import React from "react";
import useStyles from "./styles";
import Lesson from "../entities/lesson/Lesson";
import {Route, Switch} from "react-router-dom";
import Cabinet from "../entities/cabinet/Cabinet";
import Class from "../entities/class/Class";
import Subject from "../entities/subject/Subject";
import Teacher from "../entities/teacher/Teacher";
import Timetable from "../entities/timetable/Timetable";
import User from "../entities/user/User";

const Content = () => {
    const styles = useStyles();
    return (
        <Container className={styles.wrapper}>
            <Switch>
                <Route path="/main/cabinet" component={Cabinet}/>
                <Route path="/main/class" component={Class}/>
                <Route path="/main/lesson" component={Lesson}/>
                <Route path="/main/subject" component={Subject}/>
                <Route path="/main/teacher" component={Teacher}/>
                <Route path="/main/timetable" component={Timetable}/>
                <Route path="/main/users" component={User}/>
                <Route path="/auth"/>
            </Switch>
        </Container>);
};
export default Content;