import React from 'react';
import { View } from 'react-native';
import { IDateTimeFieldViewProps } from '@steroidsjs/core/ui/form/DateTimeField/DateTimeField';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends IDateTimeFieldViewProps {}

const DateTimeFieldView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('DateTimeFieldView');
    return (
        <View style={bem(bem.block(), 'row', props.style)}>
            <View style={bem(bem.element('date'), 'col-7')}>
                {props.dateField}
            </View>
            <View style={bem(bem.element('time'), 'col-5')}>
                {props.timeField}
            </View>
        </View>
    );
};

export default DateTimeFieldView;
