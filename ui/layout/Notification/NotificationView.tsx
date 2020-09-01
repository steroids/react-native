import React from 'react'

import {View} from 'react-native'
import {bem} from "../../../../react/hoc";
import {IConnectHocOutput} from "../../../../react/hoc/connect";
import {INotificationsViewProps} from "../../../../react/ui/layout/Notifications/Notifications";
import {IBemHocOutput} from "../../../../react/hoc/bem";
import styles from './NotificationViewStyles'


@bem('NotificationView', styles)
export default class NotificationView extends React.PureComponent<IConnectHocOutput & INotificationsViewProps & IBemHocOutput>{
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                {this.props.children}
            </View>
        )
    }
}