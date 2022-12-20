export default (variables: any, classes: any) => ({
    ...classes,

    Switch: {
        position: 'relative',
        justifyContent: 'center',
    },

    'Switch__shadow-one': {
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 8,
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    'Switch__shadow-two': {
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 1,
        shadowOpacity: 0.06,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    Switch__thumb: {
        position: 'absolute',
    },
});
