export default (variables, classes) => {
    classes = {
        ...classes,
        'NotificationItemView': {
            width: '100%',
            flexDirection: 'row',
            marginBottom: 2,
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,

        },
        'NotificationItemView__text': {
            fontSize: 14,
        },
        'NotificationItemView__button': {
            position: 'absolute',
            right: 0,
            height: 40,
            width: 40,
            minWidth: 20
        }
    };
    return classes;
}
