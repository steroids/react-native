import * as React from 'react';
import { Text, View, TextProps } from 'react-native';
import { ICheckboxListFieldViewProps } from '@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField';
import styles from './RadioFieldListViewStyles';
import Touchable from '../../../utils/Touchable';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends ICheckboxListFieldViewProps {
    textProps?: TextProps,
}

const RadioListFieldView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('RadioListFieldView', styles);
    return (
        <View style={bem.block()}>
            <View style={bem.element('group')}>
                {props.items.map(item => (
                    <Touchable
                        key={item.id.toString()}
                        onPress={() => props.onItemSelect(item.id)}
                    >
                        <View style={bem(bem.element('item'), item.isSelected && {backgroundColor: '#0084FF'})}>
                            <Text {...props.textProps} style={bem.element('label')}>{item.label}</Text>
                        </View>
                    </Touchable>
                ))}
            </View>
        </View>
    );
};

export default RadioListFieldView;
