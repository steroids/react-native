export default (variables, classes) => {
    classes = {
        ...classes,
        'NotificationView': {
            position: 'absolute',
            height: '100%',
            width: '100%',
        }
    };
    return classes;
}



