// import { IComponents } from '@steroidsjs/core/hooks/useComponents';
// import * as Notifications from 'expo-notifications';
// import { Platform } from 'react-native';
// import Constants from 'expo-constants';

// type Subscription = {
//     remove: () => void;
// };
//
// const PUSH_TOKEN_STORAGE_KEY = 'expo-push-token';
//
// export default class ExpoPushNotificationComponent {
//     onReceive: (notification: Notifications.Notification, components: IComponents) => {};
//     onInteract: (notification: Notifications.NotificationResponse, components: IComponents) => {};
//     saveTokenHandler: (token: string, components: IComponents) => {};
//     onUnsubscribe: (components: IComponents) => {};
//     androidChannels: Array<Notifications.NotificationChannel>;
//     forceGettingTokenAgain: boolean;
//     expoExperienceId: string;
//
//     _components: IComponents;
//     _receiveSubscription: Subscription;
//     _interactSubscription: Subscription;
//
//     constructor(components, config) {
//         this.onReceive = config.onReceive || null;
//         this.onInteract = config.onInteract || null;
//         this.saveTokenHandler = config.saveTokenHandler || null;
//         this.forceGettingTokenAgain = config.forceGettingTokenAgain || false;
//         this.expoExperienceId = config.expoExperienceId || false;
//         this.onUnsubscribe = config.onUnsubscribe || false;
//         this.androidChannels = config.androidChannels || [
//             {
//                 name: 'default',
//                 importance: Notifications.AndroidImportance.MAX,
//                 vibrationPattern: [0, 250, 250, 250],
//                 lightColor: '#FFFFFF',
//                 sound: 'default',
//             },
//         ];
//
//         this._getPermission = this._getPermission.bind(this);
//         this.unsubscribe = this.unsubscribe.bind(this);
//         this._getAndSaveToken = this._getAndSaveToken.bind(this);
//         this.subscribe = this.subscribe.bind(this);
//
//         this._components = components;
//     }
//
//     async unsubscribe() {
//         if (this._interactSubscription) {
//             Notifications.removeNotificationSubscription(this._interactSubscription);
//         }
//
//         if (this._receiveSubscription) {
//             Notifications.removeNotificationSubscription(this._receiveSubscription);
//         }
//
//         await this._components.clientStorage.remove(PUSH_TOKEN_STORAGE_KEY);
//
//         if (this.onUnsubscribe) {
//             this.onUnsubscribe(this._components);
//         }
//     }
//
//     async subscribe() {
//         const hasNotificationsPermission = await this._getPermission();
//
//         if (!hasNotificationsPermission) {
//             return;
//         }
//
//         await this._getAndSaveToken();
//
//         if (Platform.OS === 'android') {
//             this.androidChannels.map(async (channel) => {
//                 await Notifications.setNotificationChannelAsync(channel.name, channel);
//             });
//         }
//
//         if (this.onReceive) {
//             this._interactSubscription = Notifications.addNotificationReceivedListener(notification => {
//                 this.onReceive(notification, this._components);
//             });
//         }
//
//         if (this.onInteract) {
//             this._receiveSubscription = Notifications.addNotificationResponseReceivedListener(notification => {
//                 this.onInteract(notification, this._components);
//             });
//         }
//     }
//
//     async _getPermission() {
//         // push notifications only work on a physical device
//         if (Constants.isDevice) {
//             const {status: existingStatus} = await Notifications.getPermissionsAsync();
//             let finalStatus = existingStatus;
//
//             if (existingStatus !== 'granted') {
//                 const {status} = await Notifications.requestPermissionsAsync();
//                 finalStatus = status;
//             }
//
//             return finalStatus === 'granted';
//         } else {
//             return false;
//         }
//     }
//
//     async _getAndSaveToken() {
//         const storedPushToken = await this._components.clientStorage.get(PUSH_TOKEN_STORAGE_KEY);
//
//         if (storedPushToken && !this.forceGettingTokenAgain) {
//             return storedPushToken;
//         }
//
//         let params = {};
//
//         if (this.expoExperienceId) {
//             params = {
//                 experienceId: this.expoExperienceId,
//             };
//         }
//
//         const expoToken: Notifications.ExpoPushToken = await Notifications.getExpoPushTokenAsync(params);
//         const token = expoToken.data;
//
//
//         if (this.saveTokenHandler) {
//             this.saveTokenHandler(token, this._components);
//         }
//
//         await this._components.clientStorage.set(PUSH_TOKEN_STORAGE_KEY, token);
//
//         return token;
//     }
// }
