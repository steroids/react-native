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
            backgroundColor: variables.checkboxBg,
            borderRadius: 10,
        },
        'CheckboxListFieldView__item_selected': {
            backgroundColor: variables.checkboxSelectedBg,
        },
        'CheckboxListFieldView__label': {
            fontSize: 12,
            color: variables.checkboxLabelTextColor
        }
    };

    return classes;
};