export default (variables, classes) => {
    classes = {
        ...classes,
        'NotificationView': {
            ...classes['NotificationView'],
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: '100%',
            width: '100%',
            alignItems: 'center'
        }
    }
    return classes;
}



