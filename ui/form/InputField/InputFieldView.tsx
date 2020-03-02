import React from 'react';
import {TextInput, View} from 'react-native';
import {bem} from '@steroidsjs/core/hoc';
import {IInputFieldViewProps} from "@steroidsjs/core/ui/form/InputField/InputField";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import styles from './InputFieldViewStyles';

type IKeyboardTypes = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
type IAutoCompleteTypes = 'off' | 'username' | 'password' | 'email' | 'name' | 'tel' | 'street-address' |
    'postal-code' | 'cc-number' | 'cc-csc' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year';

interface IProps extends IInputFieldViewProps, IBemHocOutput {
    keyboardType: IKeyboardTypes,
    autoCompleteType: IAutoCompleteTypes,
    size: Size,
    onBlur: any,
    onFocus: any,
    color: string
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
        size: 'md'
    };

    render() {
        const bem = this.props.bem;
        return (
            <View
                style={bem(
                    bem.block({
                        size: this.props.size,
                    }),
                    this.props.style
                )}
            >
                <TextInput
                    style={bem(
                        bem.element('input', {
                            invalid: this.props.isInvalid,
                            focused: this.state.focused,
                            disabled: this.props.disabled,
                            size: this.props.size,
                        })
                    )}
                    {...this.props.inputProps}
                    autoCompleteType={this.props.autoCompleteType}
                    placeholder={this.props.placeholder}
                    editable={!this.props.disabled}
                    onFocus={(e) => this.setState({focused: true})}
                    onBlur={(e) => this.setState({focused: false})}
                    onChange={(e) => {
                        this.props.inputProps.onChange(e.nativeEvent.text);
                    }}
                />
            </View>
        );
    }
}

