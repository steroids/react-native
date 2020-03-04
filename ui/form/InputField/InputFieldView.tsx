import React, {ReactNode} from 'react';
import {Image, TextInput, View} from 'react-native';
import {bem} from '@steroidsjs/core/hoc';
import {IInputFieldViewProps} from "@steroidsjs/core/ui/form/InputField/InputField";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import styles from './InputFieldViewStyles';
import {instanceOf} from "prop-types";

type KeyboardTypes = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
type AutoCompleteTypes = 'off' | 'username' | 'password' | 'email' | 'name' | 'tel' | 'street-address' |
    'postal-code' | 'cc-number' | 'cc-csc' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year';
type IconPosition = 'left' | 'right';

interface IProps extends IInputFieldViewProps, IBemHocOutput {
    keyboardType: KeyboardTypes,
    autoCompleteType: AutoCompleteTypes,
    size: Size,
    onBlur: any,
    onFocus: any,
    color: string,
    iconPosition: IconPosition,
    icon: string | ReactNode
}

interface IState {
    focused: Boolean
}

@bem('InputFieldView', styles)
export default class InputFieldView extends React.PureComponent<IProps, IState> {

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
        iconPosition: 'right'
    };

    renderIcon() {
        const bem = this.props.bem;

        if (React.isValidElement(this.props.icon)) {
            return this.props.icon;
        }

        return (
            <Image
                style={bem(bem.element('icon', {size: this.props.size}))}
                // @ts-ignore TODO remove ignore
                source={this.props.icon}
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
                        icon: this.props.icon && this.props.iconPosition,
                        invalid: this.props.isInvalid,
                        disabled: this.props.disabled,
                        focused: this.state.focused,
                    }),
                    this.props.style
                )}
            >
                {this.props.icon && this.props.iconPosition === 'left' && this.renderIcon()}
                <TextInput
                    style={bem(
                        bem.element('input', {
                            invalid: this.props.isInvalid,
                            disabled: this.props.disabled,
                            size: this.props.size,
                            icon: this.props.icon && this.props.iconPosition,
                        })
                    )}
                    {...this.props.inputProps}
                    autoCompleteType={this.props.autoCompleteType}
                    keyboardType={this.props.keyboardType}
                    placeholder={this.props.placeholder}
                    editable={!this.props.disabled}
                    onFocus={(e) => this.setState({focused: true})}
                    onBlur={(e) => this.setState({focused: false})}
                    onChange={(e) => {
                        this.props.inputProps.onChange(e.nativeEvent.text);
                    }}
                    defaultValue={''}
                />
                {this.props.icon && this.props.iconPosition === 'right' && this.renderIcon()}
            </View>
        );
    }
}

