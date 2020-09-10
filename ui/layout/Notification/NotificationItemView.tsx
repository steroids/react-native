import React from 'react'
import {View, Text} from 'react-native'

import {bem} from "../../../../react/hoc";
import {IBemHocOutput} from "../../../../react/hoc/bem";
import {INotificationsItemViewProps} from "../../../../react/ui/layout/Notifications/Notifications";
import styles from './NotificationItemViewStyle'
import getContrastColor from "../../../utils/getContrastColor";
import Button from "../../../../react/ui/form/Button";
import Icon from "../../../../react/ui/icon/Icon";

interface INotificationsState  {
    isShow: boolean
}

@bem('NotificationItemView', styles)
export default class NotificationItemView extends React.Component<INotificationsItemViewProps & IBemHocOutput, INotificationsState> {

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