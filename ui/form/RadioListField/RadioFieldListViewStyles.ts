export default (variables, classes) => {
    classes = {
        ...classes,
        'RadioListFieldView': {
            flexDirection: 'row',
            borderRadius: 10,
            backgroundColor: variables.radioBg,
        },
        'RadioListFieldView__item_selected': {
            backgroundColor: variables.radioSelectedBg,
        },
        'RadioListFieldView__item': {
            borderRadius: 10,
            paddingVertical: 11,
            paddingHorizontal: 8,
        },
        'RadioListFieldView__label': {
            fontSize: 12,
            color: variables.radioLabelTextColor,
        }
    };

    return classes;
};