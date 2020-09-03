import { makeStyles } from '@material-ui/core/styles';

const flexColumn = {
    display: 'flex',
    flexDirection: 'column',
};

const flexRow = {
    display: 'flex',
    flexDirection: 'row',
};

const font = {
    fontFamily: 'poppins-semibold',
    color: '#37474f',
};

const useStyles = makeStyles({
    sidebar: {
        width: '20%',
        height: '100vh',
        boxShadow: '2px 0 30px #dcdcdc',
        ...flexColumn,
    },
    sidebarHeader: {
        height: '25vh',
        marginBottom: 0,
        boxShadow: '-5px 10px 30px #dcdcdc',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    h2: {
        paddingTop: '10px',
        fontWeight: '670',
        fontSize: '24px',
        ...font,
    },
    button: {
        borderWidth: 0.2,
        // borderBottomWidth: 0,
        borderStyle: 'solid',
        borderColor: '#8075D3',
        height: '80px',
    },
    button_content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        ...flexRow,
    },
    button_block: {
        alignItems: 'center',
        paddingLeft: '5px',
        width: '80%',
        ...flexRow,
    },
    button_text_content: {
        paddingLeft: '20px',
        width: '85%',
    },
    button_text: {
        fontSize: '18px',
        ...font,
    },
});

export default useStyles;
