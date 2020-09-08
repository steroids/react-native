export default (variables, classes) => {
    classes = {
        ...classes,
        'CheckboxListFieldView': {
            flexDirection: 'row',
            alignItems: 'center'
        },
        'CheckboxListFieldView__item': {
            marginHorizontal: 2,
            paddingHorizontal: 8,
            paddingVertical: 11,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 10,
        },
        'CheckboxListFieldView__text': {
            fontSize: 12,
            color: '#ffffff'
        }
    };

    return classes;
};