import React from 'react';
import { Pressable, Text } from 'react-native';

import useBemNative from '../../../../../hooks/useBemNative';
import styles from './DateTimeFieldViewStyles';

export interface IDateTimeFieldViewProps {
    value: string;
    onOpen: () => void;
}

export default function DateTimeFieldView({value, onOpen}: IDateTimeFieldViewProps) {
    const bem = useBemNative('DateTimeFieldView', styles);

    return (
        <Pressable
            onPress={onOpen}
            style={bem.element('press')}
        >
            <Text style={bem.element('text')}>
                {value}
            </Text>
        </Pressable>
    );
}
