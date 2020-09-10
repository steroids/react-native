import {Platform, StyleSheet} from 'react-native';
import colors from "./colors";
import color from 'color';

export default custom => {
    custom = {
        ...custom,
        ...colors(custom)
    };

    let variables = {
        themeColorInterval: 0.08, // 8%

        // Options
        enableRounded: true,
        enableShadows: true,
        enableGridClasses: true,

        rem: 14,
        spacer: 1,
        borderWidth: StyleSheet.hairlineWidth, // 1

        // Font
        fontFamilySansSerif: Platform.select({android: 'Roboto', ios: 'System'}),
        fontFamilyMonospace: Platform.select({android: 'Roboto', ios: 'System'}),
        fontWeightLight: '300',
        fontWeightNormal: '400',
        fontWeightBold: '700',

        // Sizes
        sizes: {
            5: '5%',
            10: '20%',
            15: '15%',
            20: '20%',
            25: '25%',
            30: '30%',
            35: '35%',
            40: '40%',
            45: '45%',
            50: '50%',
            55: '55%',
            60: '60%',
            65: '65%',
            70: '70%',
            75: '75%',
            80: '80%',
            85: '85%',
            90: '90%',
            95: '95%',
            100: '100%',
        },
        gridBreakpointsHorizontal: {
            xs: 0, // should start at zero
            sm: 360, // samsung / 375 for iphone
            md: 411, // google / 414 for iphone
            lg: 768, // ipad and nexus
            xl: 1024, // ipad pro
        },
        gridBreakpointsVertical: {
            xs: 0, // should start at zero
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },

        ...custom,
    } as any;

    variables = {
        ...variables,

        // Fonts
        fontFamilyBase: variables.fontFamilySansSerif,
        fontFamilyBaseLight: variables.fontFamilySansSerif,
        fontFamilyBaseBold: variables.fontFamilySansSerif,
        fontWeightBase: variables.fontWeightNormal,

        // Components
        lineHeightBase: 1.5 * variables.rem, // ???
        lineHeightLg: 1.5 * variables.rem,
        lineHeightSm: 1.5 * variables.rem,

        inputBtnBorderWidth: variables.borderWidth,

        // Borders
        borderColor: variables.colors.gray300,
        borderRadius: 0.25 * variables.rem,
        borderRadiusLg: 0.3 * variables.rem,
        borderRadiusSm: 0.2 * variables.rem,

        // Grid
        gridColumns: 12,
        gridGutterWidth: variables.spacer * 1.5 * variables.rem,

        shadowColor: variables.colors.black, // new
        shadowOpacity: 0.2, // new
        shadowOffset: {width: 0.1 * variables.rem, height: 0.1 * variables.rem}, // new / experimental

        // Body
        bodyBg: variables.colors.white,
        bodyColor: variables.colors.gray900,

        ...custom,
    };

    variables = {
        ...variables,

        // Forms
        inputBtnPaddingY: 0.4 * variables.rem,
        inputBtnPaddingX: 1.2 * variables.rem,
        inputBtnLineHeight: variables.lineHeightBase,

        labelMarginBottom: 0.5 * variables.rem,
        labelTextColor: variables.colors.gray600,

        inputIconSize: 20,
        inputIconSizeSm: 10,
        inputIconSizeLg: 25,

        ...custom,
    };

    variables = {
        ...variables,

        // Spacers
        spacers: {
            0: 0,
            1: (variables.spacer * 0.25),
            2: (variables.spacer * 0.5),
            3: variables.spacer,
            4: (variables.spacer * 1.5),
            5: (variables.spacer * 3),
        },

        gridBreakpoints: variables.gridBreakpointsHorizontal,

        // Links
        linkColor: variables.colors.info,
        linkDecoration: 'underline',

        fontSizeBase: variables.rem,
        fontSizeBaseSm: 0.875 * variables.rem,
        fontSizeBaseLg: 1.25 * variables.rem,


        h1FontSize: 2.5 * variables.rem,
        h2FontSize: 2 * variables.rem,
        h3FontSize: 1.75 * variables.rem,
        h4FontSize: 1.5 * variables.rem,
        h5FontSize: 1.25 * variables.rem,
        h6FontSize: variables.rem,

        headingsMarginBottom: variables.spacer / 2 * variables.rem,
        headingsMarginTop: variables.spacer / 4 * variables.rem,
        headingsFontFamily: variables.fontFamilyBase,
        headingsFontWeight: variables.fontWeightBold,
        headingsColor: variables.bodyColor,

        textMuted: variables.gray600,


        // $input-btn-focus-width:       .2rem !default;
        // $input-btn-focus-color:       rgba($component-active-bg, .25) !default;
        // $input-btn-focus-box-shadow:  0 0 0 $input-btn-focus-width $input-btn-focus-color !default;

        // $input-btn-padding-y-sm:      .25rem !default;
        // $input-btn-padding-x-sm:      .5rem !default;
        // $input-btn-line-height-sm:    $line-height-sm !default;

        // $input-btn-padding-y-lg:      .5rem !default;
        // $input-btn-padding-x-lg:      1rem !default;
        // $input-btn-line-height-lg:    $line-height-lg !default;


        // Buttons

        btnPaddingY: 1.2 * variables.inputBtnPaddingY,
        btnPaddingYSm: 0.5 * variables.inputBtnPaddingY,
        btnPaddingYLg: 1.5 * variables.inputBtnPaddingY,

        btnPaddingX: variables.inputBtnPaddingX,
        btnPaddingXSm: 0.5 * variables.inputBtnPaddingX,
        btnPaddingXLg: 1.5 * variables.inputBtnPaddingX,

        btnLineHeight: variables.inputBtnLineHeight,

        btnMinWidth: 90,

        // btnPaddingYSm: inputBtnPaddingYSm,
        // btnPaddingXSm: inputBtnPaddingXSm,
        // btnLineHeightSm: inputBtnLineHeightSm,

        // btnPaddingYLg: inputBtnPaddingYLg,
        // btnPaddingXLg: inputBtnPaddingXLg,
        // btnLineHeightLg: inputBtnLineHeightLg,

        btnBorderWidth: variables.inputBtnBorderWidth,
        btnOutlineBorderWidth: 6 * variables.inputBtnBorderWidth,
        btnFontFamily: variables.fontFamilyBase,
        // btnFontWeight: fontWeightNormal, // todo: makes no sense?

        btnBorderRadius: variables.borderRadius,
        btnBorderRadiusLg: variables.borderRadiusLg,
        btnBorderRadiusSm: variables.borderRadiusSm,

        btnIconSize: 20,
        btnIconSizeSm: 10,
        btnIconSizeLg: 30,

        btnOutlineBackgroundColor: 'transparent', // 'transparent'
    };

    variables = {
        ...variables,
        inputPaddingY: variables.inputBtnPaddingY,
        inputPaddingYSm: 0.4 * variables.inputBtnPaddingY,
        inputPaddingYLg: 1.6 * variables.inputBtnPaddingY,

        inputPaddingX: variables.inputBtnPaddingX,
        inputPaddingXSm: 0.8 * variables.inputBtnPaddingX,
        inputPaddingXLg: 1.2 * variables.inputBtnPaddingX,

        inputLineHeight: variables.lineHeightBase,
        inputLineHeightSm: 0.6 * variables.lineHeightBase,
        inputLineHeightLg: 1.2 * variables.lineHeightBase,
        // $input-padding-y-sm:                    $input-btn-padding-y-sm !default;
        // $input-padding-x-sm:                    $input-btn-padding-x-sm !default;
        // $input-line-height-sm:                  $input-btn-line-height-sm !default;

        // $input-padding-y-lg:                    $input-btn-padding-y-lg !default;
        // $input-padding-x-lg:                    $input-btn-padding-x-lg !default;
        // $input-line-height-lg:                  $input-btn-line-height-lg !default;
    };

    variables = {
        ...variables,
        inputBg: variables.colors.white,
        inputDisabledBg: variables.colors.gray300,
        inputFocusedColor: variables.themeColors.info,
        inputHintColor: variables.themeColors.secondary,

        inputColor: variables.colors.gray700,
        inputBorderColor: variables.colors.gray400,
        inputBorderWidth: 3 * variables.borderWidth,

        inputInvalidColor: color(variables.colors.danger).lighten(0.65),
        // $input-box-shadow:                      inset 0 1px 1px rgba($black, .075) !default;

        inputBorderRadius: variables.inputLineHeight,
        inputBorderRadiusLg: variables.inputLineHeightLg,
        inputBorderRadiusSm: variables.inputLineHeight,

        // $input-focus-bg:                        $input-bg !default;
        // $input-focus-border-color:              lighten($component-active-bg, 25%) !default;
        // $input-focus-color:                     $input-color !default;
        // $input-focus-width:                     $input-btn-focus-width !default;
        // $input-focus-box-shadow:                $input-btn-focus-box-shadow !default;

        inputPlaceholderColor: variables.colors.gray600,
        inputPlaintextColor: variables.bodyColor,

        inputHeightBorder: variables.inputBorderWidth * 2,

        dateTimeFieldsOffset: 8,

        checkboxBg: variables.colors.gray700,
        checkboxSelectedBg: variables.themeColors.primary,
        checkboxLabelTextColor: variables.colors.white,

        radioBg: variables.colors.gray700,
        radioSelectedBg: variables.themeColors.primary,
        radioLabelTextColor: variables.colors.white,


        // $input-height-inner:                    ($font-size-base * $input-btn-line-height) + ($input-btn-padding-y * 2) !default;
        // $input-height:                          calc(#{$input-height-inner} + #{$input-height-border}) !default;

        // $input-height-inner-sm:                 ($font-size-sm * $input-btn-line-height-sm) + ($input-btn-padding-y-sm * 2) !default;
        // $input-height-sm:                       calc(#{$input-height-inner-sm} + #{$input-height-border}) !default;

        // $input-height-inner-lg:                 ($font-size-lg * $input-btn-line-height-lg) + ($input-btn-padding-y-lg * 2) !default;
        // $input-height-lg:                       calc(#{$input-height-inner-lg} + #{$input-height-border}) !default;

        // $input-transition:                      border-color .15s ease-in-out, box-shadow .15s ease-in-out !default;

        // $form-text-margin-top:                  .25rem !default;

        // $form-check-input-gutter:               1.25rem !default;
        // $form-check-input-margin-y:             .3rem !default;
        // $form-check-input-margin-x:             .25rem !default;

        // $form-check-inline-margin-x:            .75rem !default;
        // $form-check-inline-input-margin-x:      .3125rem !default;

        // $form-group-margin-bottom:              1rem !default;

        // $input-group-addon-color:               $input-color !default;
        // $input-group-addon-bg:                  $gray-200 !default;
        // $input-group-addon-border-color:        $input-border-color !default;

        /*
        // TODO other...
        // cards

        cardSpacerY: 0.75 * spacer * variables.rem,
        cardSpacerX: 1.25 * spacer * variables.rem,
        cardBorderWidth: borderWidth,
        cardBorderRadius: borderRadius,
        cardBorderColor: borderColor, // rgba($black, .125)
        cardInnerBorderRadius: cardBorderRadius - cardBorderWidth,
        cardCapBg: gray100, // rgba($black, .03)
        cardBg: white,

        cardShadowColor: shadowColor,
        cardShadowOpacity: shadowOpacity,
        cardShadowOffset: shadowOffset,
        cardShadowRadius: cardBorderRadius,

        // $card-img-overlay-padding:          1.25rem !default;

        // $card-group-margin:                 ($grid-gutter-width / 2) !default;
        // $card-deck-margin:                  $card-group-margin !default;

        // $card-columns-count:                3 !default;
        // $card-columns-gap:                  1.25rem !default;
        // $card-columns-margin:               $card-spacer-y !default;

        // modals

        modalInnerPadding: 1 * spacer * variables.rem,

        modalDialogMargin: 1 * spacer * variables.rem,
        // $modal-dialog-margin-y-sm-up: 30px !default;

        // $modal-title-line-height:     $line-height-base !default;

        modalContentBg: white,
        modalContentBorderColor: 'transparent', // color(black).fate(0.2)
        modalContentBorderWidth: 0, // borderWidth,
        modalContentBorderRadius: borderRadius * 3, // borderRadiusLg,

        modalContentShadowColor: shadowColor,
        modalContentShadowOpacity: shadowOpacity,
        modalContentShadowOffset: {width: shadowOffset.width * 2, height: shadowOffset.height * 2},
        modalContentShadowRadius: modalContentBorderRadius,
        // $modal-content-box-shadow-xs:       0 .25rem .5rem rgba($black, .5) !default;
        // $modal-content-box-shadow-sm-up:    0 .5rem 1rem rgba($black, .5) !default;

        modalBackdropBg: black,
        modalBackdropOpacity: 0.5, // for compatibilty
        // $modal-header-border-color:         $gray-200 !default;
        // $modal-footer-border-color:         $modal-header-border-color !default;
        // $modal-header-border-width:         $modal-content-border-width !default;
        // $modal-footer-border-width:         $modal-header-border-width !default;
        // $modal-header-padding:              1rem !default;

        // $modal-lg:                    800px !default;
        // $modal-md:                    500px !default;
        // $modal-sm:                    300px !default;

        // $modal-transition:            transform .3s ease-out !default;

        // progress bars

        progressHeight: 1 * variables.rem,
        progressFontSize: 0.75 * fontSizeBase,
        progressBg: gray200,
        progressBorderRadius: borderRadius,
        progressBoxShadowColor: shadowColor,
        progressBoxShadowOffset: shadowOffset,
        progressBoxShadowOpacity: 0.5 * shadowOpacity, // 0.1
        progressBoxShadowRadius: progressBorderRadius,
        progressBarColor: white,
        progressBarBg: primary,
        progressBarAnimationTiming: 'placeholder', // 1s linear infinite !default;
        progressBarTransition: 'placeholder', // width .6s ease !default;
*/
        ...custom,
    };

    return variables;
}