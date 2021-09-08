export default (variables, classes) => {
    classes = {
        ...classes,
        'DateFieldView__side-element_size_sm': {
            width: variables.inputIconSizeSm,
            height: variables.inputIconSizeSm,
        },
        'DateFieldView__side-element_size_md': {
            width: variables.inputIconSize,
            height: variables.inputIconSize,
        },
        'DateFieldView__side-element_size_lg': {
            width: variables.inputIconSizeLg,
            height: variables.inputIconSizeLg,
        },
    };

    return classes;
};