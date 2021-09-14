import * as React from 'react';
import { Text, View, TextProps } from 'react-native';
import { IRadioListFieldViewProps } from '@steroidsjs/core/ui/form/RadioListField/RadioListField';
import styles from './RadioFieldListViewStyles';
import Touchable from '../../../utils/Touchable';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends IRadioListFieldViewProps {
    textProps: TextProps,
    onItemClick: (item: any) => void,
}

const RadioListFieldView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('RadioListFieldView', styles);
    return (
        <View style={bem.block()}>
            <View style={bem.element('group')}>
                {props.items.map(item => (
                    <Touchable
                        key={item.id.toString()}
                        onPress={() => props.onItemClick(item)}
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
