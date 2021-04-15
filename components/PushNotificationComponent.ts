import {IComponents} from '@steroidsjs/core/hoc/components';
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import { EventSubscription } from 'fbemitter';
import {Platform} from "react-native";

const PUSH_TOKEN_STORAGE_KEY = 'expo-push-token';

export default class PushNotificationComponent {
    onReceive: (notification: Notifications.Notification, components: IComponents) => {};
    onInteract: (notification: Notifications.NotificationResponse, components: IComponents) => {};
    saveTokenHandler: (token: string, components: IComponents) => {};
    androidChannels: Array<Notifications.NotificationChannel>;
    forceGettingTokenAgain: boolean;

    _components: IComponents;
    _receiveSubscription: EventSubscription;
    _interactSubscription: EventSubscription;

    constructor(components, config) {
        this.onReceive = config.onReceive || null;
        this.onInteract = config.onInteract || null;
        this.saveTokenHandler = config.saveTokenHandler || null;
        this.forceGettingTokenAgain = config.forceGettingTokenAgain || false;
        this.androidChannels = config.androidChannels || [
            {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FFFFFF',
                sound: 'default'
            }
        ];

        this._getPermission = this._getPermission.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this._getAndSaveToken = this._getAndSaveToken.bind(this);
        this.subscribe = this.subscribe.bind(this);

        this._components = components;
    }

    unsubscribe() {
        Notifications.removeNotificationSubscription(this._interactSubscription);
        Notifications.removeNotificationSubscription(this._receiveSubscription);
    }

    async subscribe() {
        if (!this._getPermission()) {
            return;
        }

        await this._getAndSaveToken();

        if (Platform.OS === 'android') {
            this.androidChannels.map(async (channel) => {
                await Notifications.setNotificationChannelAsync(channel.name, channel);
            })
        }

        if (this.onReceive) {
            Notifications.addNotificationReceivedListener(notification => {
                this.onReceive(notification, this._components);
            });
        }

        if (this.onInteract) {
            Notifications.addNotificationResponseReceivedListener(notification => {
                this.onInteract(notification, this._components);
            });
        }
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

        const expoToken:Notifications.ExpoPushToken = await Notifications.getExpoPushTokenAsync();
        const token = expoToken.data;


        if (this.saveTokenHandler) {
            this.saveTokenHandler(token, this._components);
        }

        await this._components.clientStorage.set(PUSH_TOKEN_STORAGE_KEY, token);

        return token;
    }
}