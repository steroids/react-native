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
            backgroundColor: variables.colors.white,
            opacity: 0.1,
            borderRadius: 10,
        },
        'CheckboxListFieldView__label': {
            fontSize: 12,
            color: variables.colors.white
        }
    };

    return classes;
};