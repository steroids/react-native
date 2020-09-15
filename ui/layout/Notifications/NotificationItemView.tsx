import React from 'react'
import {View, Text} from 'react-native'

import {bem} from "@steroidsjs/core/hoc";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {INotificationsItemViewProps} from "@steroidsjs/core/ui/layout/Notifications/Notifications";
import styles from './NotificationItemViewStyle'
import getContrastColor from "../../../utils/getContrastColor";
import Button from "@steroidsjs/core/ui/form/Button";

@bem('NotificationItemView', styles)
export default class NotificationItemView extends React.Component<INotificationsItemViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;

        const bgColor = bem.color(this.props.level);
        const lightColor = bem.color('white');
        const darkColor = bem.color('gray700');
        const colorText = getContrastColor(bgColor, lightColor, darkColor);

        return (
            <View style={bem(bem.block(), 'bg-' + this.props.level)}>
                <Text style={bem(bem.element('text'), {color: colorText})}>{this.props.message}</Text>
                <Button
                    style={bem.element('button', {color: colorText})}
                    size='sm'
                    color={this.props.level}
                    onClick={this.props.onClose}
                    icon='closeIcon'
                    iconProps={{tintColor: colorText}}
                />
            </View>
        )
    }
}