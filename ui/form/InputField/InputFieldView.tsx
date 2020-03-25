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
    value?: string
}

interface IState {
    focused: Boolean
}

@bem('InputFieldView', styles)
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
        value: null
    };

    renderSideElement(component: ImageSourcePropType | ReactNode) {
        const bem = this.props.bem;

        if (React.isValidElement(component)) {
            return component;
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
                        'with-suffix': Boolean(this.props.suffixElement),
                        'with-prefix': Boolean(this.props.prefixElement),
                    }),
                    this.props.style
                )}
            >
                {this.props.prefixElement && this.renderSideElement(this.props.prefixElement)}
                <TextInput
                    style={bem(
                        bem.element('input', {
                            invalid: this.props.isInvalid,
                            disabled: this.props.disabled,
                            size: this.props.size,
                            'with-suffix': Boolean(this.props.suffixElement),
                            'with-prefix': Boolean(this.props.prefixElement),
                            multiline: Boolean(this.props.multiline)
                        })
                    )}
                    {...this.props.inputProps}
                    autoCompleteType={this.props.autoCompleteType}
                    keyboardType={this.props.keyboardType}
                    placeholder={this.props.placeholder}
                    editable={this.props.editable && !this.props.disabled}
                    onFocus={() => this.setState({focused: true})}
                    onBlur={() => this.setState({focused: false})}
                    onChange={(e) => {
                        this.props.inputProps.onChange(e.nativeEvent.text);
                    }}
                    value={this.props.value}
                    numberOfLines={Number(this.props.multiline) || 1}
                    multiline={this.props.multiline && this.props.multiline > 1}
                />
                {this.props.suffixElement && this.renderSideElement(this.props.suffixElement)}
            </View>
        );
    }
}
