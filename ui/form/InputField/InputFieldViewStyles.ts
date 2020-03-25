export default (variables, classes) => {
    classes = {
        ...classes,

        'InputFieldView': {
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',

            backgroundColor: variables.inputBg,
            borderWidth: variables.inputBorderWidth,
            borderColor: variables.inputBorderColor,
        },
        'InputFieldView_with-suffix': {
            paddingRight: 10,
        },
        'InputFieldView_with-prefix': {
            paddingLeft: 10,
        },
        'InputFieldView_disabled': {
            backgroundColor: variables.inputDisabledBg,
        },
        'InputFieldView_invalid': {
            backgroundColor: variables.inputInvalidColor,
        },
        'InputFieldView_focused': {
            borderColor: variables.inputFocusedColor,
        },
        'InputFieldView_size_sm': {
            borderRadius: variables.inputBorderRadiusSm,
            paddingHorizontal: variables.inputPaddingXSm,
            paddingVertical: variables.inputPaddingYSm,
        },
        'InputFieldView_size_md': {
            borderRadius: variables.inputBorderRadius,
            paddingHorizontal: variables.inputPaddingX,
            paddingVertical: variables.inputPaddingY,
        },
        'InputFieldView_size_lg': {
            borderRadius: variables.inputBorderRadiusLg,
            paddingHorizontal: variables.inputPaddingXLg,
            paddingVertical: variables.inputPaddingYLg,
        },

        'InputFieldView__input': {
            color: variables.inputColor,
            width: '100%',
        },
        'InputFieldView__input_multiline': {
            textAlignVertical: 'top'
        },
        'InputFieldView__input_size_sm': {
            lineHeight: variables.inputLineHeightSm,
            fontSize: variables.fontSizeBaseSm,
        },
        'InputFieldView__input_size_md': {
            lineHeight: variables.inputLineHeight,
            fontSize: variables.fontSizeBase,
        },
        'InputFieldView__input_size_lg': {
            lineHeight: variables.inputLineHeightLg,
            fontSize: variables.fontSizeBaseLg,
        },
        'InputFieldView__input_with-suffix': {
            paddingRight: 10,
        },
        'InputFieldView__input_with-prefix': {
            paddingLeft: 10,
        },

        'InputFieldView__input_invalid': {
            backgroundColor: variables.inputInvalidColor,
        },

        'InputFieldView__input_disabled': {
            backgroundColor: variables.inputDisabledBg,
        },

        'InputFieldView__side-element_size_sm': {
            width: variables.inputIconSizeSm,
            height: variables.inputIconSizeSm
        },
        'InputFieldView__side-element_size_md': {
            width: variables.inputIconSize,
            height: variables.inputIconSize
        },
        'InputFieldView__side-element_size_lg': {
            width: variables.inputIconSizeLg,
            height: variables.inputIconSizeLg,
        },
    };

    return classes;
};