import * as React from 'react';
import {
    View,
    Text,
    Platform,
    ActivityIndicator,
    StyleProp,
    GestureResponderEvent,
} from 'react-native';
import {Icon} from '@steroidsjs/core/ui/content';
import color from 'color';
import useBemNative from '../../../hooks/useBemNative';

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

const Button: React.FunctionComponent<React.PropsWithChildren<IProps>> = ({
    isLoading = false,
    disabled = false,
    iconPosition = 'left',
    rippleColor = null,
    rippleOverflow = null,
    size = 'md',
    outline = false,
    showLabelOnLoading = true,
    ...props
    }) => {
    const bem = useBemNative('ButtonView');
    const [state, setState] = React.useState({isLoading: false});

    const _textColor = () => {
        let textColor;
        if (textColor && bem.color(textColor)) {
            textColor = bem.color(textColor);
        } else if (outline) {
            textColor = bem.color(color);
        } else {
            const isDark = color === 'transparent'
                ? false
                : !color(bem.color(color))
                    .isLight();

            textColor = isDark ? bem.color('white') : bem.color('gray700');
        }

        return color(textColor)
            .hex();
    };

    const _getColor = (color) => {
        if (color) {
            return bem.color(color);
        }
        return _textColor();
    };

    const _rippleColor = _getColor(rippleColor);
    const _rippleOverflow = rippleOverflow || false;

    const _getStyle = (modifiers: any = {}) => bem(
        'bg-' + color,

        bem.block({
            outline: outline,
            size: size,
            disabled: disabled && !isLoading,
            submitting: props.submitting,
            'is-loading': isLoading,
            ...modifiers,
        }),

        outline ? {borderColor: _getColor(color)} : {},

        props.style,
    );

    const getIsLoading = () => isLoading || state.isLoading;

    const preloaderSize = () => {
        switch (size) {
            case 'lg':
            case 'xl':
                return 'large';
            default:
                return 'small';
        }
    };

    const renderIcon = () => {
        if (!props.icon || getIsLoading()) {
            return null;
        }

        return (
            <Icon
                style={bem(
                    bem.element('icon', {size: size}),
                    props.iconStyle,
                )}
                name={props.icon}
            />
        );
    };

    const _isShowLabel = () => {
        if (showLabelOnLoading) {
            return React.Children.count(props.children);
        }
        return !getIsLoading() && React.Children.count(props.children);
    };

    const renderLabel = () => (
        <View
            style={bem(bem.element('label', {size: size}), {
                height: Platform.OS === 'ios' ? 'auto' : '100%',
            })}
        >
            {disabled && (
                <View style={bem.element('disabled-overlay')}/>
            )}
            {!color && !outline && (
                <View style={bem.element('white-backdrop')}/>
            )}
            {getIsLoading() && (
                <ActivityIndicator
                    style={bem.element('preloader', {size: size})}
                    color={_textColor()}
                    size={preloaderSize()}
                />
            )}
            {iconPosition === 'left' && renderIcon()}
            {(_isShowLabel() && (
                <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={bem(
                        bem.element('label-text', {
                            size: size,
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
            {iconPosition === 'right' && renderIcon()}
        </View>
    );

    const onClick = (event: GestureResponderEvent) => {
        if (onClick) {
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
                disabled={disabled}
                onPress={onClick}
                rippleColor={_rippleColor}
            >
                {renderLabel()}
            </Touchable>
        </View>
    );
};

export default Button;
