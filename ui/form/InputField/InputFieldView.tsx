import React, {ReactNode} from 'react';
import {Image, ImageSourcePropType, StyleProp, TextInput, View} from 'react-native';
import {bem} from '@steroidsjs/core/hoc';
import {IInputFieldViewProps} from "@steroidsjs/core/ui/form/InputField/InputField";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import styles from './InputFieldViewStyles';

type KeyboardTypes = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
type AutoCompleteTypes = 'off' | 'username' | 'password' | 'email' | 'name' | 'tel' | 'street-address' |
    'postal-code' | 'cc-number' | 'cc-csc' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year';

interface IRNInputFieldViewProps extends IInputFieldViewProps, IBemHocOutput {
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
}

interface IState {
    focused: Boolean
}

@bem('InputFieldView')
export default class InputFieldView extends React.PureComponent<IRNInputFieldViewProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            focused: false
        };
    }

    static defaultProps = {
        type: 'text',
        disabled: false,
        required: false,
        className: "",
        placeholder: "",
        errors: [],
        size: 'md',
        keyboardType: 'default',
        autoCompleteType: 'off',
        prefixElement: null,
        suffixElement: null,
        multiline: false,
        editable: true,
        value: null,
        autoFocus: false
    };

    renderSideAddonElement(component: ImageSourcePropType | ReactNode, element: 'before' | 'after') {
        const bem = this.props.bem;

        if (React.isValidElement(component) || typeof component === 'function') {
            return (
                <View style={bem.element('addon', {element, size: this.props.size})}>
                    {component}
                </View>
            )
        }

        return (
            <View style={bem.element('addon', {element, size: this.props.size})}>
                <Image
                    style={bem(bem.element('side-element', {size: this.props.size}))}
                    source={component as ImageSourcePropType}
                />
            </View>
        )
    }

    renderSideTextElement(component: ImageSourcePropType | ReactNode) {
        const bem = this.props.bem;

        if (React.isValidElement(component)) {
            return component;
        }

        if (typeof component === 'function') {
            return component();
        }

        return (
            <Image
                style={bem(bem.element('side-element', {size: this.props.size}))}
                source={component as ImageSourcePropType}
            />
        )
    }

    render() {
        const bem = this.props.bem;
        return (
            <View
                style={bem(
                    bem.block({
                        size: this.props.size,
                        invalid: this.props.isInvalid,
                        disabled: this.props.disabled,
                        focused: this.state.focused,
                    }),
                    this.props.style
                )}
            >
                {this.props.addonBefore && this.renderSideAddonElement(this.props.addonBefore, 'before')}
                {this.props.textBefore && this.renderSideTextElement(this.props.textBefore)}
                <View style={bem.element('input-text', {size: this.props.size})}>
                    <TextInput
                        style={bem(
                            bem.element('input', {
                                invalid: this.props.isInvalid,
                                disabled: this.props.disabled,
                                size: this.props.size,
                                multiline: Boolean(this.props.multiline)
                            })
                        )}
                        placeholderTextColor={bem.variable('inputPlaceholderColor')}
                        {...this.props.inputProps}
                        secureTextEntry={this.props.type === 'password'}
                        autoFocus={this.props.autoFocus}
                        autoCompleteType={this.props.autoCompleteType}
                        keyboardType={this.props.keyboardType}
                        placeholder={this.props.placeholder}
                        editable={this.props.editable && !this.props.disabled}
                        onFocus={() => this.setState({focused: true})}
                        onBlur={() => this.setState({focused: false})}
                        onChange={(e) => {
                            this.props.inputProps.onChange(e.nativeEvent.text);
                        }}
                        value={this.props.value && String(this.props.value)}
                        numberOfLines={Number(this.props.multiline) || 1}
                        multiline={this.props.multiline && this.props.multiline > 1}
                    />
                </View>
                {this.props.textAfter && this.renderSideTextElement(this.props.textAfter)}
                {this.props.addonAfter && this.renderSideAddonElement(this.props.addonAfter, 'after')}
            </View>
        );
    }
}
