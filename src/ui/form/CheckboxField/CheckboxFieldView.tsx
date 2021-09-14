import * as React from 'react';
import { Switch, Text, View, TextProps } from 'react-native';
import { ICheckboxFieldProps } from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import Touchable from '../../../utils/Touchable/Touchable';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends ICheckboxFieldProps {
    stylesContainer: any
    stylesText: any
    textProps: TextProps,
}

const CheckboxFieldView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('CheckboxFieldView');
    return (
        <View style={bem(bem.block(), props.stylesContainer)}>
            <Switch
                disabled={props.disabled}
                trackColor={{
                    false: bem.variables('trackSelectedFalseBg'),
                    true: bem.variables('trackSelectedTrueBg'),
                }}
                thumbColor={props.inputProps.checked ? bem.variables('thumbSelectedTrueBg') : bem.variables('thumbSelectedFalseBg')}
                onValueChange={props.inputProps.onChange}
                value={props.inputProps.checked}
            />
            <Touchable
                style={bem.element('label')}
                onPress={() => props.inputProps.onChange(!props.inputProps.checked)}
            >
                <View style={bem.element('text-wrapper')}>
                    <Text {...props.textProps} style={bem(bem.element('label-text'), props.stylesText)}>
                        {props.label}
                    </Text>
                </View>
            </Touchable>
        </View>
    );
};

export default CheckboxFieldView;
