import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TouchableNativeFeedback,
    Platform,
    Image, StyleProp
} from 'react-native';
import {bem} from '@steroidsjs/core/hoc';
import color from 'color';
import {IButtonViewProps} from "@steroidsjs/core/ui/form/Button/Button";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {Linking} from "expo";
import getContrastColor from "../../../utils/getContrastColor";
import Touchable from "../../../utils/Touchable";
import Icon from '@steroidsjs/core/ui/icon/Icon/Icon';
import safeRender from "../../../utils/safeRender";

interface IProps extends IButtonViewProps, IBemHocOutput {
    style?: StyleProp<any>,
    textColor?: string,
}

interface IState {}

@bem('ButtonView')
export default class ButtonView extends React.PureComponent <IProps, IState>{

    static defaultProps = {
        isLoading: false,
        url: null,
        formId: null,
        layout: 'default',
        disabled: false,
        onClick: null,
        submitting: false,
        color: 'primary',
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        let touchableProps;
        switch (Platform.OS) {
            case "android":
                touchableProps = {
                    background: TouchableNativeFeedback.SelectableBackground()
                };
                break;
            case "ios":
            default:
                let undColor = color(this.props.bem.color(this.props.color));
                undColor = this.props.outline
                    ? undColor.lighten(0.8)
                    : undColor.darken(0.15);

                touchableProps = {
                    style: {flex: 1},
                    activeOpacity: 0.6,
                    underlayColor: undColor.hex()
                }
        }

        return (
            <View style={this._getStyle()}>
                <Touchable
                    disabled={this.props.disabled}
                    onPress={this.onClick}
                    {...touchableProps}
                >
                    {this.renderLabel()}
                </Touchable>
            </View>
        )
    }

    onClick(event) {
        this.props.onClick(event);

        if (this.props.url) {
            Linking.openURL(this.props.url)
        }
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

            const bgColor = bem.color(this.props.color);
            const lightColor = bem.color('white');
            const darkColor = bem.color('gray700');
            textColor = getContrastColor(bgColor, lightColor, darkColor);
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
                {this.props.icon && !this.props.isLoading &&
                    <Icon
                        iconProps={this.props.iconProps}
                        name={this.props.icon}
                        style={bem(bem.element('icon', {size: this.props.size}))}
                    />
                }
                {React.Children.count(this.props.children)
                && (this.props.showLabelOnLoading || !this.props.isLoading) && (
                    // <Text
                    //     numberOfLines={1}
                    //     style={bem(
                    //         bem.element('label-text', {size: this.props.size}),
                    //         { color: this.textColor() }
                    //     )}
                    // >
                    //     {this.props.children}
                    // </Text>
                safeRender(this.props.children, {
                    numberOfLines: 1,
                    style: bem(bem.element('label-text', {size: this.props.size}),
                            {color: this.textColor()}
                        )
                })
                ) || null}
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
