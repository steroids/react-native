import React from 'react';
import { Modal, Pressable, View } from 'react-native';
import RNDateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';

import useBemNative from '../../../../../hooks/useBemNative';

import styles from './DateTimeModalViewStyles';

export interface IDateTimeModalViewProps {
    visible: boolean;
    onClose: () => void;
    onChange: (event: DateTimePickerEvent) => void;
    value: Date;
    language: string;
}

export default function DateTimeModalView({visible, onClose, language, value, onChange}: IDateTimeModalViewProps) {
    const bem = useBemNative('DateTimeModalView', styles);
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
        >
            <Pressable
                onPress={onClose}
                style={bem.element('back')}
            >
                <View style={bem.element('container')}>
                    <RNDateTimePicker
                        locale={language}
                        value={value}
                        onChange={onChange}
                        display='inline'
                    />
                </View>
            </Pressable>
        </Modal>
    );
}
