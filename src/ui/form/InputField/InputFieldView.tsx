import * as React from 'react';
import { Image, ImageSourcePropType, StyleProp, TextInput, View } from 'react-native';
import { IInputFieldViewProps } from '@steroidsjs/core/ui/form/InputField/InputField';
import styles from './InputFieldViewStyles';
import useBemNative from '../../../hooks/useBemNative';

type KeyboardTypes = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
type AutoCompleteTypes = 'off' | 'username' | 'password' | 'email' | 'name' | 'tel' | 'street-address' |
    'postal-code' | 'cc-number' | 'cc-csc' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year';

interface IRNInputFieldViewProps extends IInputFieldViewProps {
    keyboardType?: KeyboardTypes,
    autoCompleteType?: AutoCompleteTypes,
    size?: Size,
    onBlur?: any,
    onFocus?: any,
    color?: string,
    prefixElement?: ImageSourcePropType | React.ReactNode,
    suffixElement?: ImageSourcePropType | React.ReactNode,
    style?: StyleProp<any>,
    multiline?: number | false,
    editable?: boolean,
    value?: string | number,
    autoFocus: boolean
    inputProps: any,
}

interface IState {
    focused: Boolean;
}

const InputFieldView: React.FunctionComponent<IRNInputFieldViewProps> = ({
    type = 'text',
    errors = [],
    size = 'md',
    keyboardType = 'default',
    autoCompleteType = 'off',
    editable = true,
    ...props
}) => {
    const bem = useBemNative('InputFieldView', styles);
    const [state, setState] = React.useState<IState>({focused: false});

    const renderSideAddonElement = (component: ImageSourcePropType | React.ReactNode, element: 'before' | 'after') => {
        if (React.isValidElement(component) || typeof component === 'function') {
            return (
                <View style={bem.element('addon', {element, size})}>
                    {component}
                </View>
            );
        }

        return (
            <View style={bem.element('addon', {element, size})}>
                <Image
                    style={bem(bem.element('side-element', {size}))}
                    source={component as ImageSourcePropType}
                />
            </View>
        );
    };

    const renderSideTextElement = (component: ImageSourcePropType | React.ReactNode) => {
        if (React.isValidElement(component) || typeof component === 'function') {
            return component;
        }

        return (
            <Image
                style={bem(bem.element('side-element', {size}))}
                source={component as ImageSourcePropType}
            />
        );
    };

    return (
        <View
            style={bem(
                bem.block({
                    size,
                    invalid: props.isInvalid,
                    disabled: props.disabled,
                    focused: state.focused,
                }),
                props.style,
            )}
        >
            {props.addonBefore && renderSideAddonElement(props.addonBefore, 'before')}
            {props.textBefore && renderSideTextElement(props.textBefore)}
            <View style={bem.element('input-text', {size})}>
                <TextInput
                    style={bem(
                        bem.element('input', {
                            invalid: props.isInvalid,
                            disabled: props.disabled,
                            size,
                            multiline: Boolean(props.multiline),
                        }),
                    )}
                    placeholderTextColor={bem.variable('inputPlaceholderColor')}
                    {...props.inputProps}
                    secureTextEntry={type === 'password'}
                    autoFocus={props.autoFocus}
                    autoCompleteType={autoCompleteType}
                    keyboardType={keyboardType}
                    placeholder={props.placeholder}
                    editable={editable && !props.disabled}
                    onFocus={() => setState({focused: true})}
                    onBlur={() => setState({focused: false})}
                    onChangeText={props.input.onChange && props.input.onChange}
                    value={props.value && String(props.value)}
                    numberOfLines={Number(props.multiline) || 1}
                    multiline={props.multiline && props.multiline > 1}
                />
            </View>
            {props.textAfter && renderSideTextElement(props.textAfter)}
            {props.addonAfter && renderSideAddonElement(props.addonAfter, 'after')}
        </View>
    );
};

export default InputFieldView;
