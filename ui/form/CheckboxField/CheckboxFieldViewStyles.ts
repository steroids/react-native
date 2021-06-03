export default (variables, classes) => {
    classes = {
        ...classes,
        'CheckboxFieldView': {
            flexDirection: 'row',
            alignItems: 'center'
        },

        'CheckboxFieldView__label': {
            marginLeft: 8,
        },

        'CheckboxFieldView__label-text': {
            fontSize: 12,
            color: variables.checkboxListLabelTextColor
        },
    };

    return classes;
};