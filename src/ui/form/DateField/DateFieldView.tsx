import * as React from 'react';
import InputFieldView from '../InputField/InputFieldView';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
    StyleProp,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { IDateFieldViewProps } from '@steroidsjs/core/ui/form/DateField/DateField';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends IDateFieldViewProps {
    required: boolean,
    size: 'sm' | 'md' | 'lg' | string,
    disabled: boolean,
    isInvalid: boolean,
    style?: StyleProp<any>,
    placeholder?: string,
    inputProps: any,
}

interface IState {
    showPicker: boolean;
}

const DateFieldView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('DateFieldView');
    const [state, setState] = React.useState<IState>({showPicker: false});

    const togglePicker = () => {
        setState(state => ({showPicker: !state.showPicker}));
    };

    const setDate = (date) => {
        togglePicker();
        props.onChange(date);
    };

    return (
        <View style={bem(bem.block(), props.style)}>
            <TouchableWithoutFeedback
                style={bem(bem.element('input'))}
                onPress={() => !props.disabled && togglePicker()}
            >
                <View pointerEvents="box-only">
                    <InputFieldView
                        autoFocus={false}
                        editable={false}
                        placeholder={props.placeholder}
                        suffixElement={
                            <Icon
                                name="calendarIcon"
                                style={bem.element('side-element', {size: props.size})}
                            />
                        }
                        size={props.size}
                        value={props.formatDate(props.input.value)}
                        isInvalid={props.isInvalid}
                        disabled={props.disabled}
                        inputProps={props.inputProps}
                    />
                </View>
            </TouchableWithoutFeedback>
            <DateTimePickerModal
                value={props.input.value ? new Date(props.input.value) : new Date()}
                date={props.input.value ? new Date(props.input.value) : new Date()} // initial date
                isVisible={state.showPicker}
                mode="date"
                onConfirm={setDate}
                onCancel={togglePicker}
                display={'default'}
                cancelTextIOS={'Закрыть'}
                confirmTextIOS={'Подтвердить'}
                {...props.pickerProps}
            />
        </View>
    );
};

DateFieldView.defaultProps = {
    label: null,
    required: false,
    placeholder: null,
    isInvalid: false,
    size: 'md',
    disabled: false,
};

export default DateFieldView;
