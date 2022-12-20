export default (variables: any, classes: any) => ({
    ...classes,

    DateTimeModalView__back: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    DateTimeModalView__container: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
});
