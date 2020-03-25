export default (variables, classes) => {
    classes = {
        ...classes,

        'DateTimeFieldView': {
            justifyContent: 'space-between'
        },

        'DateTimeFieldView__time': {
            paddingLeft: variables.dateTimeFieldsOffset,
        },
    };

    return classes;
};