export default (variables, classes) => {
    classes = {
        ...classes,

        'FieldLayoutView': {
            position: 'relative'
        },
        'FieldLayoutView_inline': {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
        },

        'FieldLayoutView__label': {
            marginBottom: variables.labelMarginBottom,
        },
        'FieldLayoutView__label_horizontal': {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },

        'FieldLayoutView__label-text': {
            color: variables.labelTextColor
        },

        'FieldLayoutView__field': {
            flex: 1
        },
        'FieldLayoutView__field_horizontal': {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },

        'FieldLayoutView__invalid-feedback': {
            flex: 1,
        },

        'FieldLayoutView__hint': {
            color: variables.inputHintColor
        }


    };

    return classes;
};