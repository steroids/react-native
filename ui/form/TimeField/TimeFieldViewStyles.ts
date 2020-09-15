export default (variables, classes) => {
    classes = {
        ...classes,

        'TimeFieldView__side-element_size_sm': {
            width: variables.inputIconSizeSm,
            height: variables.inputIconSizeSm,
        },
        'TimeFieldView__side-element_size_md': {
            width: variables.inputIconSize,
            height: variables.inputIconSize,
        },
        'TimeFieldView__side-element_size_lg': {
            width: variables.inputIconSizeLg,
            height: variables.inputIconSizeLg,
        },
    };

    return classes;
};