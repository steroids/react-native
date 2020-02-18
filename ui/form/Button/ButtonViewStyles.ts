export default (variables, classes) => {
    classes = {
        ...classes,

        'ButtonView': {
            flexGrow: 1,
            flexDirection: 'row'
        },

        'ButtonView_disabled': {
            backgroundColor: variables.colors.gray400,
            borderWidth: 0
        },
        'ButtonView_outline': {
            borderWidth: 2,
            backgroundColor: 'transparent',
        },

        // TODO border radius doesn't work
        'ButtonView_size_sm': {
            borderRadius: variables.borderRadiusSm
        },
        'ButtonView_size_md': {
            borderRadius: variables.borderRadius
        },
        'ButtonView_size_lg': {
            borderRadius: variables.borderRadiusLg
        },

        'ButtonView__label': {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },

        'ButtonView__label-text': {
            textTransform: 'uppercase',
            fontWeight: 'bold'
        },
        'ButtonView__label-text_size_sm': {
            fontSize: variables.fontSizeBaseSm,
            paddingVertical: 0.1 * variables.inputBtnPaddingY,
            paddingHorizontal: 0.1 * variables.inputBtnPaddingX
        },
        'ButtonView__label-text_size_md': {
            fontSize: variables.fontSizeBase,
            paddingVertical: 0.3 * variables.inputBtnPaddingY,
            paddingHorizontal: 0.3 * variables.inputBtnPaddingX
        },
        'ButtonView__label-text_size_lg': {
            fontSize: variables.fontSizeBaseLg,
            paddingVertical: 0.7 * variables.inputBtnPaddingY,
            paddingHorizontal: 0.7 * variables.inputBtnPaddingX
        },

        // TODO adjust sizes, they are empirical
        'ButtonView__icon_size_sm': {
            width: 10,
            height: 10
        },
        'ButtonView__icon_size_md': {
            width: 20,
            height: 20
        },
        'ButtonView__icon_size_lg': {
            width: 30,
            height: 30
        },
    };

    return classes;
};