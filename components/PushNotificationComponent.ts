import {IComponents} from '@steroidsjs/core/hoc/components';
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";
import { EventSubscription } from 'fbemitter';
import {Platform} from "react-native";
import { Notification, Channel } from 'expo/build/Notifications/Notifications.types';

const PUSH_TOKEN_STORAGE_KEY = 'expo-push-token';

export default class PushNotificationComponent {
    onMessage: (notification: Notification, components: IComponents) => {};
    saveTokenHandler: (token: string, components: IComponents) => {};
    androidChannels: Channel[];
    forceGettingTokenAgain: boolean;

    _components: IComponents;
    _subscription: EventSubscription;

    constructor(components, config) {
        this.onMessage = config.onMessage || null;
        this.saveTokenHandler = config.saveTokenHandler || null;
        this.forceGettingTokenAgain = config.forceGettingTokenAgain || false;
        this.androidChannels = config.androidChannels || [
            {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            }
        ];

        this._getPermission = this._getPermission.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this._getAndSaveToken = this._getAndSaveToken.bind(this);
        this.subscribe = this.subscribe.bind(this);

        this._components = components;
    }

    unsubscribe() {
        this._subscription.remove();
    }

    async subscribe() {
        if (!this._getPermission()) {
            return;
        }

        await this._getAndSaveToken();

        if (Platform.OS === 'android') {
            this.androidChannels.map(async (channel) => {
                await Notifications.createChannelAndroidAsync(channel.name, channel);
            })
        }

        this._subscription = Notifications.addListener(
            (notification: Notification) => this.onMessage(notification, this._components)
        );
    }

    async _getPermission() {
        let permissionState = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let {canAskAgain, status} = permissionState.permissions[Permissions.NOTIFICATIONS];

        if (status !== 'granted' && canAskAgain) {
            permissionState = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            status = permissionState.permissions[Permissions.NOTIFICATIONS].status;
        }

        return status === 'granted';
    }

    async _getAndSaveToken() {
        const storedPushToken = await this._components.clientStorage.get(PUSH_TOKEN_STORAGE_KEY);

        if (storedPushToken && !this.forceGettingTokenAgain) {
            return storedPushToken;
        }

        const token = await Notifications.getExpoPushTokenAsync();

        if (this.saveTokenHandler) {
            this.saveTokenHandler(token, this._components);
        }

        await this._components.clientStorage.set(PUSH_TOKEN_STORAGE_KEY, token);

        return token;
    }
}