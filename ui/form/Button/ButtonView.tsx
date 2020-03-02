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
import styles from './ButtonViewStyles';

interface IProps extends IButtonViewProps, IBemHocOutput {
    style?: any,
    textColor?: string,
}

interface IState {}

@bem('ButtonView', styles)
export default class ButtonView extends React.PureComponent <IProps, IState>{

    render() {
        let RNButtonComponent;
        let RNComponentProps;
        switch (Platform.OS) {
            case "android":
                RNButtonComponent = TouchableNativeFeedback;
                RNComponentProps = {
                    background: TouchableNativeFeedback.SelectableBackground()
                };
                break;
            case "ios":
            default:
                // TODO
                let undColor = color(this.props.bem.color(this.props.color));
                undColor = this.props.outline
                    ? undColor.lighten(0.8)
                    : undColor.darken(0.15);

                RNButtonComponent = TouchableHighlight;
                RNComponentProps = {
                    style: {flex: 1},
                    activeOpacity: 0.6,
                    underlayColor: undColor.hex()
                }
        }

        return (
            <View style={this._getStyle()}>
                <RNButtonComponent
                    disabled={this.props.disabled}
                    onPress={this.props.onClick}
                    {...RNComponentProps}
                >
                    {this.renderLabel()}
                </RNButtonComponent>
            </View>
        )
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
                {this.props.isLoading && (
                    <ActivityIndicator
                        style={bem(bem.element('preloader', {size: this.props.size}))}
                        color={this.textColor()}
                        size={this.preloaderSize()}
                    />
                )}
                {this.props.icon && !this.props.isLoading && (
                    <Image
                        style={bem(
                            bem.element(
                                'icon',
                                {size: this.props.size},
                            ),
                            'material-icons'
                        )}
                        // @ts-ignore TODO remove ignore
                        source={this.props.icon}
                    />
                )}
                <Text
                    numberOfLines={1}
                    style={
                        bem(
                            bem.element('label-text', {size: this.props.size}),
                            { color: this.textColor() }
                        )
                    }
                >
                    {this.props.children}
                </Text>
            </View>
        );
    }

    _getStyle(modifiers:any = {}) {
        const bem = this.props.bem;
        return bem(
            'bg-' + this.props.color,

            bem.block({
                color: this.props.color,
                outline: this.props.outline,
                size: this.props.size,
                disabled: this.props.disabled && !this.props.isLoading,
                submitting: this.props.submitting,
                'is-loading': this.props.isLoading,
                ...modifiers,
            }),

            this.props.outline ? {borderColor: this.textColor()} : {},
            this.props.style,
        );
    }
}
