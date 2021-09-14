import * as React from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    Platform,
    ActivityIndicator,
    StyleProp,
    GestureResponderEvent,
} from 'react-native';
import useBemNative from '../../../hooks/useBemNative';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import color from 'color';

import Touchable from '../../../utils/Touchable';

interface IProps {
    style?: StyleProp<any>;
    labelStyle?: StyleProp<any>;
    textColor?: string;
    iconPosition?: 'left' | 'right';
    iconStyle?: StyleProp<any>;
    onClick?: any;
    submitting?: boolean;
    showLabelOnLoading?: boolean;
    isLoading?: boolean;
    icon?: string;
    color?: string | null;
    outline?: boolean;
    size?: string;
    disabled?: boolean;
    rippleColor?: string | null;
    rippleOverflow?: boolean | null;
}

const Button: React.FunctionComponent<React.PropsWithChildren<IProps>> = (props) => {
    const bem = useBemNative('ButtonView');
    const [state, setState] = React.useState({isLoading: false});

    const _textColor = () => {
        let textColor;
        if (props.textColor && bem.color(props.textColor)) {
            textColor = bem.color(props.textColor);
        } else if (props.outline) {
            textColor = bem.color(props.color);
        } else {
            const isDark = props.color === 'transparent'
                ? false
                : !color(bem.color(props.color))
                    .isLight();

            textColor = isDark ? bem.color('white') : bem.color('gray700');
        }

        return color(textColor)
            .hex();
    };

    const _rippleColor = props.rippleColor || _textColor();
    const _rippleOverflow = props.rippleOverflow || false;

    const _getStyle = (modifiers: any = {}) => bem(
        'bg-' + props.color,

        bem.block({
            outline: props.outline,
            size: props.size,
            disabled: props.disabled && !props.isLoading,
            submitting: props.submitting,
            'is-loading': props.isLoading,
            ...modifiers,
        }),

        props.outline ? {borderColor: _textColor()} : {},

        props.style,
    );

    const isLoading = () => props.isLoading || state.isLoading;

    const preloaderSize = () => {
        switch (props.size) {
            case 'lg':
            case 'xl':
                return 'large';
            default:
                return 'small';
        }
    };

    const renderIcon = () => {
        if (!props.icon || isLoading()) {
            return null;
        }

        return (
            <Icon
                style={bem(
                    bem.element('icon', {size: props.size}),
                    props.iconStyle,
                )}
                name={props.icon}
            />
        );
    };

    const _isShowLabel = () => {
        if (props.showLabelOnLoading) {
            return React.Children.count(props.children);
        }
        return !isLoading() && React.Children.count(props.children);
    };

    const renderLabel = () => (
        <View
            style={bem(bem.element('label', {size: props.size}), {
                height: Platform.OS === 'ios' ? 'auto' : '100%',
            })}
        >
            {props.disabled && (
                <View style={bem.element('disabled-overlay')}/>
            )}
            {!props.color && !props.outline && (
                <View style={bem.element('white-backdrop')}/>
            )}
            {isLoading() && (
                <ActivityIndicator
                    style={bem.element('preloader', {size: props.size})}
                    color={_textColor()}
                    size={preloaderSize()}
                />
            )}
            {props.iconPosition === 'left' && renderIcon()}
            {(_isShowLabel() && (
                <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={bem(
                        bem.element('label-text', {
                            size: props.size,
                            'with-icon': Boolean(props.icon),
                        }),
                        {color: _textColor()},
                        props.labelStyle,
                    )}
                >
                    {props.children}
                </Text>
            ))
            || null}
            {props.iconPosition === 'right' && renderIcon()}
        </View>
    );

    const onClick = (event: GestureResponderEvent) => {
        if (props.onClick) {
            const result = props.onClick(event);
            if (result instanceof Promise) {
                setState({isLoading: true});
                result
                    .then(() => {
                        setTimeout(() => setState({isLoading: false}), 800);
                    })
                    .catch(e => {
                        setState({isLoading: false});
                        throw e;
                    });
            }
        }
    };

    return (
        <View style={_getStyle()}>
            <Touchable
                disabled={props.disabled}
                onPress={onClick}
                background={TouchableNativeFeedback.Ripple(_rippleColor, _rippleOverflow)}
            >
                {renderLabel()}
            </Touchable>
        </View>
    );
};

Button.defaultProps = {
    isLoading: false,
    disabled: false,
    onClick: null,
    color: null,
    iconPosition: 'left',
    rippleColor: null,
    rippleOverflow: null,
    size: 'md',
    outline: false,
    showLabelOnLoading: true,
};

export default Button;
