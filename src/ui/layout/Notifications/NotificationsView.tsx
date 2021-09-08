import React from 'react';

import { View } from 'react-native';
import bem, { IBemHocOutput } from '../../../hoc/bemNative';
import { IConnectHocOutput } from '@steroidsjs/core/hoc/connect';
import { INotificationsViewProps } from '@steroidsjs/core/ui/layout/Notifications/Notifications';
import styles from './NotificationViewStyles';


@bem('NotificationsView', styles)
export default class NotificationsView extends React.PureComponent<IConnectHocOutput & INotificationsViewProps & IBemHocOutput> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                {this.props.children}
            </View>
        );
    }
}
