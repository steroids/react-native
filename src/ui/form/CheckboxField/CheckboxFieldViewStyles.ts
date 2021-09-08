export default (variables, classes) => {
    classes = {
        ...classes,
        'CheckboxFieldView': {
            flexDirection: 'row',
            alignItems: 'center'
        },

        'CheckboxFieldView__text-wrapper': {
            padding: 8,
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