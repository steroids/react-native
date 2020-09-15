import React from 'react'

import {View} from 'react-native'
import {bem} from "@steroidsjs/core/hoc";
import {IConnectHocOutput} from "@steroidsjs/core/hoc/connect";
import {INotificationsViewProps} from "@steroidsjs/core/ui/layout/Notifications/Notifications";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import styles from './NotificationViewStyles'


@bem('NotificationsView', styles)
export default class NotificationsView extends React.PureComponent<IConnectHocOutput & INotificationsViewProps & IBemHocOutput>{
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                {this.props.children}
            </View>
        )
    }
}