import React, { ReactNode } from 'react';
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
    prefixElement?: ImageSourcePropType | ReactNode,
    suffixElement?: ImageSourcePropType | ReactNode,
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

const InputFieldView: React.FunctionComponent<IRNInputFieldViewProps> = (props) => {
    const bem = useBemNative('InputFieldView', styles);
    const [state, setState] = React.useState<IState>({focused: false});

    const renderSideAddonElement = (component: ImageSourcePropType | ReactNode, element: 'before' | 'after') => {
        if (React.isValidElement(component) || typeof component === 'function') {
            return (
                <View style={bem.element('addon', {element, size: props.size})}>
                    {component}
                </View>
            );
        }

        return (
            <View style={bem.element('addon', {element, size: props.size})}>
                <Image
                    style={bem(bem.element('side-element', {size: props.size}))}
                    source={component as ImageSourcePropType}
                />
            </View>
        );
    };

    const renderSideTextElement = (component: ImageSourcePropType | ReactNode) => {
        if (React.isValidElement(component) || typeof component === 'function') {
            return component;
        }

        return (
            <Image
                style={bem(bem.element('side-element', {size: props.size}))}
                source={component as ImageSourcePropType}
            />
        );
    };

    return (
        <View
            style={bem(
                bem.block({
                    size: props.size,
                    invalid: props.isInvalid,
                    disabled: props.disabled,
                    focused: state.focused,
                }),
                props.style,
            )}
        >
            {props.addonBefore && renderSideAddonElement(props.addonBefore, 'before')}
            {props.textBefore && renderSideTextElement(props.textBefore)}
            <View style={bem.element('input-text', {size: props.size})}>
                <TextInput
                    style={bem(
                        bem.element('input', {
                            invalid: props.isInvalid,
                            disabled: props.disabled,
                            size: props.size,
                            multiline: Boolean(props.multiline),
                        }),
                    )}
                    placeholderTextColor={bem.variables('inputPlaceholderColor')}
                    {...props.inputProps}
                    secureTextEntry={props.type === 'password'}
                    autoFocus={props.autoFocus}
                    autoCompleteType={props.autoCompleteType}
                    keyboardType={props.keyboardType}
                    placeholder={props.placeholder}
                    editable={props.editable && !props.disabled}
                    onFocus={() => setState({focused: true})}
                    onBlur={() => setState({focused: false})}
                    onChange={(e) => {
                        props.inputProps.onChange(e.nativeEvent.text);
                    }}
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

InputFieldView.defaultProps = {
    type: 'text',
    disabled: false,
    required: false,
    className: '',
    placeholder: '',
    errors: [],
    size: 'md',
    keyboardType: 'default',
    autoCompleteType: 'off',
    prefixElement: null,
    suffixElement: null,
    multiline: false,
    editable: true,
    value: null,
    autoFocus: false,
};

export default InputFieldView;
