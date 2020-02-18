import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
    Image
} from 'react-native';
import {bem} from '@steroidsjs/core/hoc';
import color from 'color';
import {IButtonViewProps} from "@steroidsjs/core/ui/form/Button/Button";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";

interface IRNButtonViewProps extends IButtonViewProps, IBemHocOutput {
    style?: any,
    textColor?: string,
}

@bem('ButtonView')
export default class ButtonView extends React.PureComponent <IRNButtonViewProps, any>{

    render() {
        let RNButtonComponent = this.RNButtonComponent();

        return (
            <RNButtonComponent
                disabled={this.props.disabled}
                onPress={this.props.onClick}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={this._getStyle()}>
                    {this.renderLabel()}
                </View>
            </RNButtonComponent>
        )
    }

    RNButtonComponent() {
        let RNButtonComponent;

        switch (Platform.OS) {
            case "android":
                RNButtonComponent = TouchableNativeFeedback;
                break;
            case "ios":
            default:
                RNButtonComponent = TouchableHighlight;
        }

        return RNButtonComponent;
    }

    preloaderSize() {
        switch (this.props.size) {
            case 'lg':
            case 'xl':
                return 'large';
            default:
                return 'small';
        }
    }

    textColor() {
        let textColor;
        let bem = this.props.bem;

        if (this.props.disabled && !this.props.isLoading) {
            textColor = color(bem.color('gray600'))
                .alpha(0.32)
                .rgb()
                .string();
        } else if (this.props.textColor && bem.color(this.props.textColor)) {
            textColor = bem.color(this.props.textColor);
        } else if (this.props.outline) {
            textColor = bem.color(this.props.color);
        } else {
            let isDark = this.props.color === 'transparent'
                ? false
                : !color(bem.color(this.props.color)).isLight();

            textColor = isDark ? bem.color('white') : bem.color('gray700');
        }

        return color(textColor).hex();
    }

    renderLabel() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.element('label'))}>
                {this.props.isLoading &&(
                    <ActivityIndicator
                        style={bem(bem.element('preloader', {size: this.props.size}))}
                        color={this.textColor()}
                        size={this.preloaderSize()}
                    />
                )}
                {this.props.icon && (
                    <Image
                        style={bem(
                            bem.element(
                                'icon',
                                {size: this.props.size},
                                !this.props.label && 'without-label',
                            ),
                            'material-icons'
                        )}
                        // @ts-ignore TODO remove ignore
                        source={this.props.icon}
                    />
                )}
                <Text style={
                    bem(
                        bem.element('label-text', {size: this.props.size}),
                        { color: this.textColor() }
                    )
                }>
                    {this.props.children}
                </Text>
            </View>
        );
    }

    _getStyle(modifiers:any = {}) {
        const bem = this.props.bem;
        return bem(
            !this.props.link && 'btn',
            this.props.size && 'btn-' + this.props.size,
            !this.props.link && 'btn-' + (this.props.outline ? 'outline-' : '') + this.props.color,
            this.props.block && 'btn-block',
            this.props.link && 'btn-link',

            bem.block({
                color: this.props.color,
                outline: this.props.outline,
                size: this.props.size,
                disabled: this.props.disabled && !this.props.isLoading,
                submitting: this.props.submitting,
                'is-loading': this.props.isLoading,
                ...modifiers,
            }),

            this.props.style,
        );
    }
}
