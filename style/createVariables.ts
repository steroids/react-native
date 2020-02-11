import {StyleSheet} from 'react-native';

export default custom => {
    let variables = {
        // Options
        enableRounded: true,
        enableShadows: true,
        enableGridClasses: true,

        rem: 14,
        spacer: 1,
        borderWidth: StyleSheet.hairlineWidth, // 1

        // Font
        fontFamilySansSerif: 'system', // ios: 'san francisco'
        fontFamilyMonospace: 'system', // ios: 'sfmono-regular',
        fontWeightLight: '300',
        fontWeightNormal: '400',
        fontWeightBold: '700',

        // Colors
        white: '#fff',
        gray100: '#f8f9fa',
        gray200: '#e9ecef',
        gray300: '#dee2e6',
        gray400: '#ced4da',
        gray500: '#adb5bd',
        gray600: '#6c757d',
        gray700: '#495057',
        gray800: '#343a40',
        gray900: '#212529',
        black: '#000',
        blue: '#007bff',
        cyan: '#17a2b8',
        red: '#dc3545',
        yellow: '#ffc107',
        green: '#28a745',
        indigo: '#6610f2',
        pyrple: '#6f42c1',
        pink: '#e83e8c',
        orange: '#fd7e14',
        teal: '#20c997',

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
        borderColor: variables.gray300,
        borderRadius: 0.25 * variables.rem,
        borderRadiusLg: 0.3 * variables.rem,
        borderRadiusSm: 0.2 * variables.rem,

        // Grid
        gridColumns: 12,
        gridGutterWidth: variables.spacer * 1.5 * variables.rem,

        shadowColor: variables.black, // new
        shadowOpacity: 0.2, // new
        shadowOffset: {width: 0.1 * variables.rem, height: 0.1 * variables.rem}, // new / experimental

        // Body
        bodyBg: variables.white,
        bodyColor: variables.gray900,

        // Colors
        grays: {
            '100': variables.gray100,
            '200': variables.gray200,
            '300': variables.gray300,
            '400': variables.gray400,
            '500': variables.gray500,
            '600': variables.gray600,
            '700': variables.gray700,
            '800': variables.gray800,
            '900': variables.gray900,
        },
        primary: variables.blue,
        secondary: variables.gray600,
        success: variables.green,
        info: variables.cyan,
        warning: variables.yellow,
        danger: variables.red,
        light: variables.gray100,
        dark: variables.gray800,

        ...custom,
    };

    variables = {
        ...variables,

        // Forms
        inputBtnPaddingY: 0.75 * variables.rem,
        inputBtnPaddingX: 1.5 * variables.rem,
        inputBtnLineHeight: variables.lineHeightBase,

        ...custom,
    };

    variables = {
        ...variables,

        // Theme colors
        themeColors: {
            primary: variables.primary,
            secondary: variables.secondary,
            success: variables.success,
            info: variables.info,
            warning: variables.warning,
            danger: variables.danger,
            light: variables.light,
            dark: variables.dark,
        },
        themeColorInterval: 0.08, // 8%

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
        linkColor: variables.info,
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
        headingsFontFamily: variables.fontFamilyBase,
        headingsFontWeight: variables.fontWeightBase,
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

        btnPaddingY: variables.inputBtnPaddingY,
        btnPaddingX: variables.inputBtnPaddingX,
        btnLineHeight: variables.inputBtnLineHeight,

        // btn_padding_y_sm: input_btn_padding_y_sm,
        // btn_padding_x_sm: input_btn_padding_x_sm,
        // btn_line_height_sm: input_btn_line_height_sm,

        // btn_padding_y_lg: input_btn_padding_y_lg,
        // btn_padding_x_lg: input_btn_padding_x_lg,
        // btn_line_height_lg: input_btn_line_height_lg,

        btnBorderWidth: variables.inputBtnBorderWidth,
        btnFontFamily: variables.fontFamilyBase,
        // btn_font_weight: font_weight_normal, // todo: makes no sense?

        btnBorderRadius: variables.borderRadius,
        btnBorderRadius_lg: variables.borderRadiusLg,
        btnBorderRadius_sm: variables.borderRadiusSm,

        btnOutlineBackgroundColor: variables.bodyBg, // 'transparent'

        // forms
/*
// TODO other...

        label_margin_bottom: 0.5 * variables.rem,

        input_padding_y: input_btn_padding_y,
        input_padding_x: input_btn_padding_x,
        input_line_height: input_btn_line_height,

        // $input-padding-y-sm:                    $input-btn-padding-y-sm !default;
        // $input-padding-x-sm:                    $input-btn-padding-x-sm !default;
        // $input-line-height-sm:                  $input-btn-line-height-sm !default;

        // $input-padding-y-lg:                    $input-btn-padding-y-lg !default;
        // $input-padding-x-lg:                    $input-btn-padding-x-lg !default;
        // $input-line-height-lg:                  $input-btn-line-height-lg !default;

        input_bg: white,
        input_disabled_bg: gray_200,

        input_color: gray_700,
        input_border_color: gray_400,
        input_border_width: input_btn_border_width,
        // $input-box-shadow:                      inset 0 1px 1px rgba($black, .075) !default;

        input_border_radius: border_radius,
        input_border_radius_lg: border_radius_lg,
        input_border_radius_sm: border_radius_sm,

        // $input-focus-bg:                        $input-bg !default;
        // $input-focus-border-color:              lighten($component-active-bg, 25%) !default;
        // $input-focus-color:                     $input-color !default;
        // $input-focus-width:                     $input-btn-focus-width !default;
        // $input-focus-box-shadow:                $input-btn-focus-box-shadow !default;

        input_placeholder_color: gray_600,
        input_plaintext_color: body_color,

        input_height_border: input_border_width * 2,

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

        // cards

        card_spacer_y: 0.75 * spacer * variables.rem,
        card_spacer_x: 1.25 * spacer * variables.rem,
        card_border_width: border_width,
        card_border_radius: border_radius,
        card_border_color: border_color, // rgba($black, .125)
        card_inner_border_radius: card_border_radius - card_border_width,
        card_cap_bg: gray_100, // rgba($black, .03)
        card_bg: white,

        card_shadow_color: shadow_color,
        card_shadow_opacity: shadow_opacity,
        card_shadow_offset: shadow_offset,
        card_shadow_radius: card_border_radius,

        // $card-img-overlay-padding:          1.25rem !default;

        // $card-group-margin:                 ($grid-gutter-width / 2) !default;
        // $card-deck-margin:                  $card-group-margin !default;

        // $card-columns-count:                3 !default;
        // $card-columns-gap:                  1.25rem !default;
        // $card-columns-margin:               $card-spacer-y !default;

        // modals

        modal_inner_padding: 1 * spacer * variables.rem,

        modal_dialog_margin: 1 * spacer * variables.rem,
        // $modal-dialog-margin-y-sm-up: 30px !default;

        // $modal-title-line-height:     $line-height-base !default;

        modal_content_bg: white,
        modal_content_border_color: 'transparent', // color(black).fate(0.2)
        modal_content_border_width: 0, // border_width,
        modal_content_border_radius: border_radius * 3, // border_radius_lg,

        modal_content_shadow_color: shadow_color,
        modal_content_shadow_opacity: shadow_opacity,
        modal_content_shadow_offset: {width: shadow_offset.width * 2, height: shadow_offset.height * 2},
        modal_content_shadow_radius: modal_content_border_radius,
        // $modal-content-box-shadow-xs:       0 .25rem .5rem rgba($black, .5) !default;
        // $modal-content-box-shadow-sm-up:    0 .5rem 1rem rgba($black, .5) !default;

        modal_backdrop_bg: black,
        modal_backdrop_opacity: 0.5, // for compatibilty
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

        progress_height: 1 * variables.rem,
        progress_font_size: 0.75 * font_size_base,
        progress_bg: gray_200,
        progress_border_radius: border_radius,
        progress_box_shadow_color: shadow_color,
        progress_box_shadow_offset: shadow_offset,
        progress_box_shadow_opacity: 0.5 * shadow_opacity, // 0.1
        progress_box_shadow_radius: progress_border_radius,
        progress_bar_color: white,
        progress_bar_bg: primary,
        progress_bar_animation_timing: 'placeholder', // 1s linear infinite !default;
        progress_bar_transition: 'placeholder', // width .6s ease !default;
*/
        ...custom,
    };

    return variables;
}