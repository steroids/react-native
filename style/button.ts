import {mixinButtonOutlineVariant, mixinButtonSize, mixinButtonVariant} from './mixins/buttons';

// TODO move all this to ButtonView

export default (variables, classes) => {
    classes = {
        ...classes,

        btn: {
            // display: inline-block;
            // whiteSpace: 'nowrap',
            // verticalAlign: 'middle',
            // userSelect: 'none',
            borderWidth: variables.inputBtnBorderWidth,
            borderStyle: 'solid',
            borderColor: 'transparent',

            overflow: 'hidden', // exprimental / important for rounded borders
            justifyContent: 'center', // exprimental

            // @include transition($btn-transition);

            // // Share hover and focus styles
            // @include hover-focus {
            //   text-decoration: none;
            // }
            // &:focus,
            // &.focus {
            //   outline: 0;
            //   box-shadow: $btn-focus-box-shadow;
            // }

            // // Disabled comes first so active can properly restyle
            // &.disabled,
            // &:disabled {
            //   opacity: .65;
            //   @include box-shadow(none);
            // }

            // &:active,
            // &.active {
            //   background-image: none;
            //   @include box-shadow($btn-focus-box-shadow, $btn-active-box-shadow);
            // }
            // TODO
            // ...mixinButtonSize(
            //     variables,
            //     variables.inputBtnPaddingY,
            //     variables.inputBtnPaddingX,
            //     variables.fontSizeBase,
            //     variables.inputBtnLineHeight,
            //     variables.btnBorderRadius,
            // ),
        },

        btnTouchable: { // experimental
            borderRadius: variables.btnBorderRadius,
            overflow: 'hidden', // experimental x2
        },

        btnText: Object.assign({}, classes.text, {
            fontSize: variables.fontSizeBase,
            fontFamily: variables.btnFontFamily,
            // OBSOLETED / fontWeight: BTN_FONT_WEIGHT,
            textAlign: 'center',
        }),
    };

    // btn%color / ex: btnPrimary
    Object.keys(variables.colors).forEach((item) => {
        const classColor = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        classes['btn-' + item] = mixinButtonVariant(variables, variables.colors[item], variables.colors[item]);
    });

    // btnOutline%color / ex: btnOutlinePrimary
    Object.keys(variables.colors).forEach((item) => {
        const classColor = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        classes['btn-outline-' + item] = mixinButtonOutlineVariant(variables, variables.colors[item], variables.btnOutlineBackgroundColor);
    });

    // btnText%color / ex: btnTextPrimary
    Object.keys(variables.colors).forEach((item) => {
        const classColor = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        classes['btn-text-' + item] = {
            color: variables.white, // temporal
        };
    });

    // btnOutlineText%color / ex: btnOutlineTextPrimary
    Object.keys(variables.colors).forEach((item) => {
        const classColor = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        classes['btn-outline-text-' + item] = {
            color: variables.colors[item], // temporal
        };
    });

    return classes;
};