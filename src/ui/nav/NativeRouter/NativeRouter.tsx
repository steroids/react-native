import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';

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
const Shared = createSharedElementStackNavigator();

type NavigatorType = 'stack' | 'drawer' | 'tab' | 'topTab' | 'shared';

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
        case 'shared':
            return Shared;
        case 'stack':
        default:
            return Stack;
    }
};

const NativeRouter: React.FunctionComponent<INativeRouterComponentProps> = (props) => {
    const {store} = useComponents();
    const navigationRef = React.useRef(null);

    const userRole = useSelector(state => getUserRole(state));

    React.useEffect(() => {
        store.navigationNative = navigationRef.current;
    }, []);

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

    return (
        <NavigationContainer
            theme={props.theme}
            ref={navigationRef}
        >
            {renderNavigator(props.routes.navigator)}
        </NavigationContainer>
    );
};

NativeRouter.defaultProps = {
    theme: DefaultTheme,
};

export default NativeRouter;
