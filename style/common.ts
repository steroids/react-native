import {mixinBorderRadius} from './mixins/border-radius';

export default (variables, classes) => {
    classes = {
        ...classes,

        'form-control': {
            width: '100%',
            paddingVertical: variables.inputBtnPaddingY,
            paddingHorizontal: variables.inputBtnPaddingX,
            fontSize: variables.fontSizeBase,
            // lineHeight: inputLineHeight,

            color: variables.inputColor,
            backgroundColor: variables.inputBg,
            // background-clip: padding-box;

            borderStyle: 'solid',
            borderWidth: variables.inputBtnBorderWidth,
            borderColor: variables.inputBorderColor,
            ...mixinBorderRadius(variables, variables.inputBorderRadius),
        },

        'form-control:focus': {
            shadowColor: variables.red,
            shadowOffset: {
                width: 7,
                height: 7,
            },
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 7,
        },

        // TODO it's not enough abstract now, styles are only applied for text input
        'is-invalid': {
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: variables.red,
        },

        'invalid-feedback-text': {
            color: variables.red
        },

        'h1': {
            fontSize: variables.h1FontSize,
            fontWeight: 'bold'
        },

        'h2': {
            fontSize: variables.h2FontSize,
            fontWeight: 'bold'
        },

        'h3': {
            fontSize: variables.h3FontSize,
            fontWeight: 'bold'
        },

        'h4': {
            fontSize: variables.h4FontSize,
            fontWeight: 'bold'
        }
    };

    return classes;
};