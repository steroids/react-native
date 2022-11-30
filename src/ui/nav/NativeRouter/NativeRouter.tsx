import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import {ActivityIndicator, Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash-es/isArray';
import _isObject from 'lodash-es/isObject';

import { IRouteItem } from '@steroidsjs/core/ui/nav/Router/Router';
import { useComponents } from '@steroidsjs/core/hooks';
import useSelector from '@steroidsjs/core/hooks/useSelector';
import { getUserRole } from '@steroidsjs/core/reducers/auth';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

type NavigatorType = 'stack' | 'drawer' | 'tab' | 'topTab';

export interface INativeRouteItem extends IRouteItem {
    items?: Array<INativeRouteItem> | {[key: string]: INativeRouteItem};
}

interface INavigator {
    type?: NavigatorType;
    options?: any;
    items: Array<INativeRouteItem> | {[key: string]: INativeRouteItem};
}

interface INativeRouterComponentProps {
    routes: {
        navigator: INavigator
    };
    theme?: Theme,
}

const getNavigatorType = (type: NavigatorType | undefined) => {
    switch (type) {
        case 'tab':
            return Tab;
        case 'drawer':
            return Drawer;
        case 'topTab':
            return TopTab;
        case 'stack':
        default:
            return Stack;
    }
};

const PERSISTENCE_KEY = 'react_navigation_persistence';

const NativeRouter: React.FunctionComponent<INativeRouterComponentProps> = (props) => {
    const {store} = useComponents();
    const navigationRef = React.useRef(null);
    const [isReady, setIsReady] = React.useState(!__DEV__);
    const [initialState, setInitialState] = React.useState();

    const userRole = useSelector(state => getUserRole(state));

    const getRoutesByPermissions = React.useCallback((routes) => {
        if (_isEmpty(routes)) {
            return null;
        }

        if (_isObject(routes) && !_isArray(routes)) {
            routes = Object.keys(routes).map(id => ({
                ...routes[id],
                id,
            }));
        }

        return routes.filter(route => route.roles ? route.roles.includes(userRole) : true);
    }, [userRole]);

    React.useEffect(() => {
        const restoreState = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();

                if (Platform.OS !== 'web' && initialUrl == null) {
                    const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                    const state = savedStateString ? JSON.parse(savedStateString) : undefined;

                    if (state !== undefined) {
                        setInitialState(state);
                    }
                }
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            restoreState();
        } else {
            store.navigationNative = navigationRef.current;
        }
    }, [isReady]);

    const renderNavigator = React.useCallback((navigator: INavigator) => {
        const TypedNavigator = getNavigatorType(navigator.type);
        const routes = getRoutesByPermissions(navigator.items);

        return (
            !_isEmpty(routes) && (
                <TypedNavigator.Navigator {...navigator.options}>
                    {routes.map(route => {
                        const Component = route.component;

                        return (
                            <TypedNavigator.Screen
                                key={route.id}
                                name={route.id}
                                options={{...route.options, animation: 'none'}}
                            >
                                {route.navigator
                                    ? () => renderNavigator(route.navigator)
                                    : params => (
                                        <Component
                                            {...params}
                                            {...route}
                                            name={route.id}
                                            options={route.options}
                                        />
                                    )}
                            </TypedNavigator.Screen>
                        );
                    })}
                </TypedNavigator.Navigator>
            )
        );
    }, [getRoutesByPermissions]);

    if (!isReady) {
        return <ActivityIndicator />;
    }

    return (
        <NavigationContainer
            theme={props.theme}
            ref={navigationRef}
            initialState={initialState}
            onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
        >
            {renderNavigator(props.routes.navigator)}
        </NavigationContainer>
    );
};

NativeRouter.defaultProps = {
    theme: DefaultTheme,
};

export default NativeRouter;
