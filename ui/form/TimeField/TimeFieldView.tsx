import React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import InputFieldView from "../../form/InputField/InputFieldView";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import styles from './TimeFieldViewStyles';
import {
    StyleProp,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {ITimeFieldViewProps} from "@steroidsjs/core/ui/form/TimeField/TimeField";

interface IProps extends ITimeFieldViewProps, IBemHocOutput {
    required: boolean,
    size: Size,
    disabled: boolean,
    isInvalid: boolean,
    style?: StyleProp<any>,
    placeholder?: string
    timeFormat: string
}

interface IState {
    showPicker: boolean
}

@bem('TimeFieldView', styles)
export default class TimeFieldView extends React.PureComponent<IProps, IState> {
    constructor (props) {
        super(props);

        this.setTime = this.setTime.bind(this);

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

    showPicker() {
        this.setState({showPicker: true});
    }

    setTime(event, date) {
        if (event.type && event.type === 'set') {
            let time = moment(date).format(this.props.timeFormat);
            this.setState({showPicker: false});
            this.props.input.onChange(time);
        }
    }

    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.block(), this.props.style)}>
                <TouchableWithoutFeedback
                    style={bem(bem.element('input'))}
                    onPress={() => !this.props.disabled && this.showPicker()}
                >
                    <View>
                        <InputFieldView
                            editable={false}
                            placeholder={this.props.placeholder}
                            suffixElement={require("../../../assets/clock-icon.png")}
                            size={this.props.size}
                            value={this.props.input.value}
                            isInvalid={this.props.isInvalid}
                            disabled={this.props.disabled}
                            inputProps={this.props.inputProps}
                        />
                    </View>
                </TouchableWithoutFeedback>

                {this.state.showPicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode={'time'}
                        display="default"
                        onChange={this.setTime}
                        is24Hour
                        {...this.props.pickerProps}
                    />
                )}
            </View>
        );
    }
}
