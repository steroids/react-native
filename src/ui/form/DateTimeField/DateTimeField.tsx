import React from 'react';
import { Platform } from 'react-native';
import {DateTimePickerAndroid, DateTimePickerEvent} from '@react-native-community/datetimepicker';

import fieldWrapper, {IFieldWrapperOutputProps} from '@steroidsjs/core/ui/form/Field/fieldWrapper';
import { useComponents } from '@steroidsjs/core/hooks';

export interface IDateTimeFieldProps {
    format?: string;
}

function DateTimeField(props: IDateTimeFieldProps & IFieldWrapperOutputProps) {
    const components = useComponents();

    const [visible, setVisible] = React.useState(false);

    const value = React.useMemo(() => props.input?.value ? new Date(props.input.value) : new Date(), [props.input]);

    const onChange = React.useCallback(({nativeEvent: {timestamp}}: DateTimePickerEvent) => {
        const dateTime = components.locale.dayjs(timestamp).format();
        props.input?.onChange?.call(null, dateTime);
    }, [components.locale, props.input]);

    const onOpen = React.useCallback(() => {
        if (Platform.OS === 'android') {
            return DateTimePickerAndroid.open({
                value,
                onChange,
                mode: 'date',
            });
        }
        return setVisible(true);
    }, [onChange, value]);

    const onClose = React.useCallback(() => setVisible(false), []);

    return (
        <>
            {components.ui.renderView('form.DateTimeFieldView', {
                onOpen,
                value: components.locale.dayjs(value).format(props.format),
            })}
            {Platform.OS && components.ui.renderView('form.DateTimeModalView', {
                onClose,
                onChange,
                value,
                visible,
                language: components.locale.language,
            })}
        </>
    );
}

DateTimeField.defaultProps = {
    format: 'DD.MM.YY',
};

export default fieldWrapper('DateTimeField', DateTimeField);
