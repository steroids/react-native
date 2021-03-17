export default (variables, classes) => {
    classes = {
        ...classes,

        'InputFieldView': {
            flexDirection: 'row',
            overflow: 'hidden',

            backgroundColor: variables.inputBg,
            borderWidth: variables.inputBorderWidth,
            borderColor: variables.inputBorderColor,
        },
        'InputFieldView_with-suffix': {
            paddingRight: 'auto',
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
            // paddingHorizontal: variables.inputPaddingXSm,
            // paddingVertical: variables.inputPaddingYSm,
        },
        'InputFieldView_size_md': {
            borderRadius: variables.inputBorderRadius,
            // paddingHorizontal: variables.inputPaddingX,
            // paddingVertical: variables.inputPaddingY,
        },
        'InputFieldView_size_lg': {
            borderRadius: variables.inputBorderRadiusLg,
            // paddingHorizontal: variables.inputPaddingXLg,
            // paddingVertical: variables.inputPaddingYLg,
        },

        'InputFieldView__input': {
            color: variables.inputColor,
            // width: '100%',
        },
        'InputFieldView__input_multiline': {
            textAlignVertical: 'top',
            marginTop: 10
        },
        'InputFieldView__input_size_sm': {
            // lineHeight: variables.inputLineHeightSm,
            fontSize: variables.fontSizeBaseSm,
        },
        'InputFieldView__input_size_md': {
            // lineHeight: variables.inputLineHeight,
            fontSize: variables.fontSizeBase,
        },
        'InputFieldView__input_size_lg': {
            // lineHeight: variables.inputLineHeightLg,
            fontSize: variables.fontSizeBaseLg,
        },
        'InputFieldView__input_with-suffix': {},
        'InputFieldView__input_with-prefix': {
            paddingLeft: 10,
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
        'InputFieldView__addon_element_before': {
            backgroundColor: variables.inputAddonBackgroundColor,
            justifyContent: 'center',
            padding: 0,
            borderRightWidth: variables.inputBorderWidth,
            borderColor: variables.inputBorderColor,
        },
        'InputFieldView__addon_size_sm': {
            paddingHorizontal: variables.inputPaddingXSm / 2,
            paddingVertical: variables.inputPaddingYSm,
        },
        'InputFieldView__addon_size_md': {
            paddingHorizontal: variables.inputPaddingX / 2,
            paddingVertical: variables.inputPaddingY,
        },
        'InputFieldView__addon_size_lg': {
            paddingHorizontal: variables.inputPaddingXLg / 2,
            paddingVertical: variables.inputPaddingYLg,
        },
        'InputFieldView__addon_element_after': {
            backgroundColor: variables.inputAddonBackgroundColor,
            justifyContent: 'center',
            padding: 0,
            borderLeftWidth: variables.inputBorderWidth,
            borderColor: variables.inputBorderColor,
        },
        'InputFieldView__addon_size_sm': {
            paddingHorizontal: variables.inputPaddingXSm / 2,
            paddingVertical: variables.inputPaddingYSm,
        },
        'InputFieldView__addon_size_md': {
            paddingHorizontal: variables.inputPaddingX / 2,
            paddingVertical: variables.inputPaddingY,
        },
        'InputFieldView__addon_size_lg': {
            paddingHorizontal: variables.inputPaddingXLg / 2,
            paddingVertical: variables.inputPaddingYLg,
        },
        'InputFieldView__input-text': {
            justifyContent: 'center',
            flex: 1,
        },
        'InputFieldView__input-text_size_sm': {
            paddingHorizontal: variables.inputPaddingXSm,
            paddingVertical: variables.inputPaddingYSm,
        },
        'InputFieldView__input-text_size_md': {
            paddingHorizontal: variables.inputPaddingX,
            paddingVertical: variables.inputPaddingY,
        },
        'InputFieldView__input-text_size_lg': {
            paddingHorizontal: variables.inputPaddingXLg,
            paddingVertical: variables.inputPaddingYLg,
        },
    };

    return classes;
};