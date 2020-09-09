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
        }
    }
    return classes;
}
