export default (variables, classes) => {
    classes = {
        ...classes,

        'InputFieldView': {

        },

        'InputFieldView__input': {
            lineHeight: variables.inputLineHeight,
            color: variables.inputColor,
            backgroundColor: variables.inputBg,

            borderWidth: variables.inputBorderWidth,
            borderColor: variables.inputBorderColor,
        },

        'InputFieldView__input_size_sm': {
            lineHeight: variables.inputLineHeightSm,
            borderRadius: variables.inputBorderRadiusSm,
            fontSize: variables.fontSizeBaseSm,
            paddingHorizontal: variables.inputPaddingXSm,
            paddingVertical: variables.inputPaddingYSm,
        },
        'InputFieldView__input_size_md': {
            lineHeight: variables.inputLineHeight,
            borderRadius: variables.inputBorderRadius,
            fontSize: variables.fontSizeBase,
            paddingHorizontal: variables.inputPaddingX,
            paddingVertical: variables.inputPaddingY,
        },
        'InputFieldView__input_size_lg': {
            lineHeight: variables.inputLineHeightLg,
            borderRadius: variables.inputBorderRadiusLg,
            fontSize: variables.fontSizeBaseLg,
            paddingHorizontal: variables.inputPaddingXLg,
            paddingVertical: variables.inputPaddingYLg,
        },

        'InputFieldView__input_invalid': {
            borderColor: variables.inputInvalidColor,
        },

        'InputFieldView__input_disabled': {
            backgroundColor: variables.inputDisabledBg,
        },

        'InputFieldView__input_focused': {
            borderColor: variables.colors.primary,
        },
    };

    return classes;
};