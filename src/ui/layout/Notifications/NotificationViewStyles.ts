export default (variables, classes) => {
    classes = {
        ...classes,
        'NotificationsView': {
            position: 'absolute',
            top: 5,
            left: 5,
            right: 5,
        }
    };
    return classes;
}



