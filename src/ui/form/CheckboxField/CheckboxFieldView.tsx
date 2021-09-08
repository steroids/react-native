import * as React from 'react';
import { Switch, Text, View, TextProps } from 'react-native';
import bem, { IBemHocOutput } from '../../../hoc/bemNative';
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
                        false: bem.variables('trackSelectedFalseBg'),
                        true: bem.variables('trackSelectedTrueBg'),
                    }}
                    thumbColor={checked ? bem.variables('thumbSelectedTrueBg') : bem.variables('thumbSelectedFalseBg')}
                    onValueChange={onChange}
                    value={checked}
                />
                <Touchable
                    style={bem.element('label')}
                    onPress={() => onChange(!checked)}
                >
                    <View style={bem.element('text-wrapper')}>
                        <Text {...this.props.textProps} style={bem(bem.element('label-text'), this.props.stylesText)}>
                            {this.props.label}
                        </Text>
                    </View>
                </Touchable>
            </View>
        );
    }
}
