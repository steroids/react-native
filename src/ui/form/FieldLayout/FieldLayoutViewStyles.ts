export default (variables, classes) => {
    classes = {
        ...classes,

        'FieldLayoutView': {
            position: 'relative',
        },

        'FieldLayoutView_inline': {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
        },

        'FieldLayoutView__label': {
            marginBottom: variables.labelMarginBottom,
        },
        'FieldLayoutView__label_horizontal': {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },

        'FieldLayoutView__label-text': {
            color: variables.labelTextColor
        },

        'FieldLayoutView__field_horizontal': {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },

        'FieldLayoutView__hint': {
            color: variables.inputHintColor
        }
    };

    return classes;
};