import * as React from 'react';
import InputFieldView from '../InputField/InputFieldView';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import {
    Platform,
    StyleProp,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { ITimeFieldViewProps } from '@steroidsjs/core/ui/form/TimeField/TimeField';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends ITimeFieldViewProps {
    required: boolean,
    size: Size,
    disabled: boolean,
    isInvalid: boolean,
    style?: StyleProp<any>,
    placeholder?: string
    timeFormat: string
}

interface IState {
    showPicker: boolean;
}

const TimeFieldView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('TimeFieldView');

    const [state, setState] = React.useState<IState>({showPicker: false});

    const showPicker = () => {
        setState({showPicker: true});
    };

    const setTime = (event, date) => {
        // this is a proper way to hide picker according to the package's docs
        setState({showPicker: Platform.OS === 'ios'});

        if (event.type && event.type === 'set') {
            let time = moment(date).format(props.timeFormat);
            props.input.onChange(time);
        }
    };

    return (
        <View style={bem(bem.block(), props.style)}>
            <TouchableWithoutFeedback
                style={bem(bem.element('input'))}
                onPress={() => !props.disabled && showPicker()}
            >
                <View>
                    <InputFieldView
                        autoFocus={false}
                        editable={false}
                        placeholder={props.placeholder}
                        suffixElement={
                            <Icon
                                name="clockIcon"
                                style={bem.element('side-element', {size: props.size})}
                            />
                        }
                        size={props.size}
                        value={props.input.value}
                        isInvalid={props.isInvalid}
                        disabled={props.disabled}
                        inputProps={props.inputProps}
                    />
                </View>
            </TouchableWithoutFeedback>

            {state.showPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode={'time'}
                    display="default"
                    onChange={setTime}
                    is24Hour
                    {...props.pickerProps}
                />
            )}
        </View>
    );
};

TimeFieldView.defaultProps = {
    label: null,
    required: false,
    placeholder: null,
    isInvalid: false,
    size: 'md',
    disabled: false,
};

export default TimeFieldView;
