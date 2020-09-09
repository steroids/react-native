export default (variables, classes) => {
    classes = {
        ...classes,
        'CheckboxFieldView': {
            flexDirection: 'row',
            alignItems: 'center'
        },
        'CheckboxFieldView__label': {
            fontSize: 12,
            color: variables.colors.white
        },
    };

    return classes;
};