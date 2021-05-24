import React from 'react';
import { Switch, Text, View, TextProps } from 'react-native';
import { bem } from '@steroidsjs/core/hoc';
import { IBemHocOutput } from '@steroidsjs/core/hoc/bem';
import { ICheckboxFieldProps } from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import Touchable from '../../../utils/Touchable/Touchable';

interface IProps extends ICheckboxFieldProps, IBemHocOutput {
    stylesContainer: any
    stylesText: any
    textProps: TextProps,
}

@bem('CheckboxFieldView')
export default class CheckboxFieldView extends React.PureComponent <IProps> {
    render() {
        const bem = this.props.bem;
        const {onChange, checked} = this.props.inputProps;
        return (
            <View style={bem(bem.block(), this.props.stylesContainer)}>
                <Switch
                    disabled={this.props.disabled}
                    trackColor={{
                        false: bem.variable('trackSelectedFalseBg'),
                        true: bem.variable('trackSelectedTrueBg'),
                    }}
                    thumbColor={checked ? bem.variable('thumbSelectedTrueBg') : bem.variable('thumbSelectedFalseBg')}
                    onValueChange={onChange}
                    value={checked}
                />
                <Touchable onPress={onChange}>
                    <Text {...this.props.textProps} style={bem(bem.element('label'), this.props.stylesText)}>
                        {this.props.label}
                    </Text>
                </Touchable>
            </View>
        );
    }
}