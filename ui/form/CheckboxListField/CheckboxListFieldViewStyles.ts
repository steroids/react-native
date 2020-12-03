export default (variables, classes) => {
    classes = {
        ...classes,
        'CheckboxListFieldView': {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        'CheckboxListFieldView__item': {
            marginHorizontal: 2,
            paddingHorizontal: 8,
            paddingVertical: 11,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: variables.checkboxListBg,
            borderRadius: 10,
        },
        'CheckboxListFieldView__item_selected': {
            backgroundColor: variables.checkboxListSelectedBg,
        },
        'CheckboxListFieldView__label': {
            fontSize: 12,
            color: variables.checkboxListLabelTextColor
        }
    };

    return classes;
};