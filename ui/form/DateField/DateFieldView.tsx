import React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import InputFieldView from "../../form/InputField/InputFieldView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Platform} from 'react-native';

import {
    StyleProp,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {IDateFieldViewProps} from "@steroidsjs/core/ui/form/DateField/DateField";
import Icon from "@steroidsjs/core/ui/icon/Icon";

interface IProps extends IDateFieldViewProps, IBemHocOutput {
    required: boolean,
    size: Size,
    disabled: boolean,
    isInvalid: boolean,
    style?: StyleProp<any>,
    placeholder?: string,
    inputProps: any,
}

interface IState {
    showPicker: boolean
}

@bem('DateFieldView')
export default class DateFieldView extends React.PureComponent<IProps, IState> {
    constructor (props) {
        super(props);

        this.setDate = this.setDate.bind(this);
        this.togglePicker = this.togglePicker.bind(this);

        this.state = {
            showPicker: false,
        };
    }

    static defaultProps = {
        label: null,
        required: false,
        placeholder: null,
        isInvalid: false,
        size: 'md',
        disabled: false,
    };

    togglePicker() {
        this.setState(state => ({showPicker: !state.showPicker}));
    }

    setDate(date) {
        this.togglePicker();
        this.props.onChange(date);
    }

    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.block(), this.props.style)}>
                <TouchableWithoutFeedback
                    style={bem(bem.element('input'))}
                    onPress={() => !this.props.disabled && this.togglePicker()}
                >
                    <View pointerEvents='box-only'>
                        <InputFieldView
                            editable={false}
                            placeholder={this.props.placeholder}
                            suffixElement={
                                <Icon
                                    name='calendarIcon'
                                    style={bem.element('side-element', {size: this.props.size})}
                                />
                            }
                            size={this.props.size}
                            value={this.props.formatDate(this.props.input.value)}
                            isInvalid={this.props.isInvalid}
                            disabled={this.props.disabled}
                            inputProps={this.props.inputProps}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <DateTimePickerModal
                    value={this.props.input.value ? new Date(this.props.input.value) : new Date()}
                    date={this.props.input.value ? new Date(this.props.input.value) : new Date()} // initial date
                    isVisible={this.state.showPicker}
                    mode='date'
                    onConfirm={this.setDate}
                    onCancel={this.togglePicker}
                    display={'default'}
                    cancelTextIOS={__('Закрыть')}
                    confirmTextIOS={__('Подтвердить')}
                    {...this.props.pickerProps}
                />
            </View>
        );
    }
}
