export default (variables, classes) => {
    classes = {
        ...classes,
        'RadioListFieldView': {
            flexDirection: 'row',
            borderRadius: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        'RadioListFieldView__item': {
            borderRadius: 10,
            paddingVertical: 11,
            paddingHorizontal: 8,
        },
        'RadioListFieldView__text': {
            fontSize: 12,
            color: '#ffffff',
        }
    };

    return classes;
};