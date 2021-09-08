export default (variables, classes) => {
    classes = {
        ...classes,

        'DetailView__field-container': {
            paddingBottom: 5
        },
        'DetailView__field-label': {
            color: variables.colors.gray600
        },
    };

    return classes;
};