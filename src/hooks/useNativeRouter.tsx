import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash-es/isArray';
import _isObject from 'lodash-es/isObject';

import { IRouteItem } from '@steroidsjs/core/ui/nav/Router/Router';
import { useComponents } from '@steroidsjs/core/hooks';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

type NavigatorType = 'stack' | 'drawer' | 'tab';

export interface INativeRouteItem extends IRouteItem {
    items?: Array<INativeRouteItem> | { [key: string]: INativeRouteItem };
}

interface INavigator {
    type?: NavigatorType;
    options?: any;
    items: Array<INativeRouteItem> | { [key: string]: INativeRouteItem };
}

export interface INativeRouterProps {
    navigator: INavigator;
    auth: {
        role: string;
        [key: string]: any;
    };
}

const getNavigatorType = (type: NavigatorType | undefined) => {
    switch (type) {
        case 'tab':
            return Tab;
        case 'drawer':
            return Drawer;
        case 'stack':
        default:
            return Stack;
    }
};

export default function useNativeRouter(props: INativeRouterProps) {
    const { store } = useComponents();
    const navigationRef = React.useRef(null);

    React.useEffect(() => {
        store.navigationNative = navigationRef.current;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRoutesByPermissions = routes => {
        if (_isEmpty(routes)) {
            return null;
        }

        if (_isObject(routes) && !_isArray(routes)) {
            routes = Object.keys(routes).map(id => ({
                ...routes[id],
                id,
            }));
        }

        return routes.filter(route => {
            const userRole = props.auth ? props.auth.role : null;
            return route.roles ? route.include(userRole) : true;
        });
    };

    const renderNavigator = (navigator: INavigator) => {
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
                                options={route.options}>
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
    };

    return (
        <NavigationContainer ref={navigationRef}>
            {renderNavigator(props.navigator)}
        </NavigationContainer>
    );
}
