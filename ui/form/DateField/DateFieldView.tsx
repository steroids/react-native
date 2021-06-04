import React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import InputFieldView from "../../form/InputField/InputFieldView";
import DateTimePicker from '@react-native-community/datetimepicker';
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

    setDate(event, date) {
        // IOS doesn't include "event.type" field.
        // IOS date field view can be different. Spinner or Compact(ios > 14). So "setDate" has different behavior

        if (Platform.OS === 'ios') {
            // https://github.com/react-native-datetimepicker/datetimepicker#display-optional
            const isCompactViewByPlatform = Number.parseFloat(Platform.Version) >= 14;
            const isDefaultDisplay =
                typeof this.props.pickerProps.display === 'undefined' || this.props.pickerProps.display === 'default';
            if (isCompactViewByPlatform && isDefaultDisplay) {
                this.setState({showPicker: false});
            }
            this.props.onChange(date);
        } else {
            this.setState({showPicker: false});

            if (event.type && event.type === 'set') {
                this.props.onChange(date);
            }
        }
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

                {this.state.showPicker && (
                    <DateTimePicker
                        value={this.props.input.value ? new Date(this.props.input.value) : new Date()}
                        mode={'date'}
                        display="default"
                        onChange={this.setDate}
                        {...this.props.pickerProps}
                    />
                )}
            </View>
        );
    }
}
