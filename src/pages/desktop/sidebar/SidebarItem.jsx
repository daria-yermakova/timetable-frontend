import React from "react";
import useStyles from "./styles";
import {Container, Typography, Button} from "@material-ui/core";
import {ArrowRight} from '@material-ui/icons';
import {Link} from 'react-router-dom';

const SidebarItem = (props) => {
    const {
        icon,
        path,
        title,
    } = props;

    const styles = useStyles();

    return(
        <Link to={"/main/"+path} style={{ textDecoration: 'none' }}>
        <Container className={styles.button}>
            <Container className={styles.button_content}>
            <Container className={styles.button_block}>
                {icon}
                <Container className={styles.button_text_content}>
                    <Typography className={styles.button_text}>{title}</Typography>
                </Container>
            </Container>
                <ArrowRight style={{ fontSize: 25, fill: "#37474f"}}/>
            </Container>
        </Container>
        </Link>
    );
};

export default SidebarItem;
