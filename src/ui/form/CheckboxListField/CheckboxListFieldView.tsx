import * as React from 'react';
import { Text, TextProps, View } from 'react-native';
import { ICheckboxListFieldViewProps } from '@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField';
import Touchable from '../../../utils/Touchable';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends ICheckboxListFieldViewProps {
    textProps: TextProps,
    onItemClick: (item: any) => void,
}

const CheckboxListFieldView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('CheckboxListFieldView');
    return (
        <View style={bem.block()}>
            {props.items.map(item => (
                <Touchable
                    onPress={() => props.onItemClick(item)}
                >
                    <View style={bem.element('item', {selected: item.isSelected})}>
                        <Text {...props.textProps} style={bem.element('label')}>
                            {item.label}
                        </Text>
                    </View>
                </Touchable>
            ))}
        </View>
    );
};

export default CheckboxListFieldView;
