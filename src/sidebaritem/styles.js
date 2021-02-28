const styles = (theme) => ({
    listItem: {
        curdor: 'pointer',
    },
    textSecetion: {
        maxWidth: '85%',
    },
    selected: {
        background: '#e6e6ff',
    },
    deleteIcon: {
        position: 'absolute',
        right: '5px',
        top: 'calc(50% - 15px)',
        '&:hover': {
            color: 'red',
        },
    },
});

export default styles;
