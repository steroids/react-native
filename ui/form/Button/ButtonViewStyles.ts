export default (variables, classes) => {
    classes = {
        ...classes,

        'ButtonView': {
            flex: 1,
            flexDirection: 'row',
            overflow: 'hidden',
            justifyContent: 'center',

            borderWidth: variables.inputBtnBorderWidth,
            borderStyle: 'solid',
            borderColor: 'transparent',
            minWidth: variables.btnMinWidth
        },

        'ButtonView_disabled': {
            backgroundColor: variables.inputDisabledBg,
            borderWidth: 0
        },
        'ButtonView_outline': {
            borderWidth: variables.btnOutlineBorderWidth,
            backgroundColor: variables.btnOutlineBackgroundColor,
        },

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
            fontWeight: 'bold',
            fontFamily: variables.btnFontFamily,
        },
        'ButtonView__label-text_size_sm': {
            fontSize: variables.fontSizeBaseSm,
            paddingVertical: variables.btnPaddingYSm,
            paddingHorizontal: variables.btnPaddingXSm
        },
        'ButtonView__label-text_size_md': {
            fontSize: variables.fontSizeBase,
            paddingVertical: variables.btnPaddingY,
            paddingHorizontal: variables.btnPaddingX
        },
        'ButtonView__label-text_size_lg': {
            fontSize: variables.fontSizeBaseLg,
            paddingVertical: variables.btnPaddingYLg,
            paddingHorizontal: variables.btnPaddingXLg
        },

        'ButtonView__icon_size_sm': {
            width: variables.btnIconSizeSm,
            height: variables.btnIconSizeSm
        },
        'ButtonView__icon_size_md': {
            width: variables.btnIconSize,
            height: variables.btnIconSize
        },
        'ButtonView__icon_size_lg': {
            width: variables.btnIconSizeLg,
            height: variables.btnIconSizeLg
        },
    };

    return classes;
};