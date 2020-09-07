export default (variables, classes) => {
    classes = {
        ...classes,
        'CheckboxFieldView': {
            flexDirection: 'row',
            alignItems: 'center'
        },
        'CheckboxFieldView__text': {
            fontSize: 12,
            color: '#ffffff'
        },
    };

    return classes;
};