import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#E5E3F4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    authContainer: {
        backgroundColor: '#E5E3F4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'poppins-thin',
        fontWeight: 'bold',
        color: '#8075D3',
        marginTop: '10px',
    },
    input: {
      background: '#fff',
    },
    button: {
        margin: '24px 10%',
        background: '#8075D3',
        fontWeight: 'bold',
        color: '#fff',
    },
}));

export default useStyles;