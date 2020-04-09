import * as React from 'react';
import _isArray from 'lodash-es/isArray';
import _isObject from 'lodash-es/isObject';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {IConnectHocOutput} from '@steroidsjs/core/hoc/connect';
import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';
import {components} from "@steroidsjs/core/hoc";
import {NavigationContainerRef} from "@react-navigation/core/src/types";
import {IComponentsHocOutput} from "../../react/hoc/components";
import isEmpty from 'lodash/isEmpty';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export interface INativeRouteItem extends IRouteItem {
    items?: INativeRouteItem[] | { [key: string]: INativeRouteItem }
}

export interface INativeRouterProps {
    routes: {
        drawer?: INativeRouteItem[] | { [key: string]: INativeRouteItem },
        items?: INativeRouteItem[] | { [key: string]: INativeRouteItem }
    },
    auth: {
        role: string,
        [key: string]: any
    },
}

interface INativeRouterPrivateProps extends IConnectHocOutput, IComponentsHocOutput {}

@components('store')
export default class NativeRouter extends React.PureComponent<INativeRouterProps & INativeRouterPrivateProps> {

    navigation: any;

    constructor(props) {
        super(props);

        this.navigation = React.createRef<NavigationContainerRef>();
    }

    componentDidMount(): void {
        this.props.store.navigationNative = this.navigation.current;
    }

    getRoutesByPermissions(routes) {
        if (isEmpty(routes)) {
            return null;
        }

        if (_isObject(routes) && !_isArray(routes)) {
            routes = Object.keys(routes).map(id => ({
                ...routes[id],
                id,
            }));
        }

        return routes.filter(route => {
            const userRole = this.props.auth ? this.props.auth.role : null;
            console.log("ROLES", route.id, route.roles, route.roles.includes(userRole));
            return route.roles
                ? route.roles.includes(userRole)
                : true;
        });
    }

    render() {
        const drawerRoutes = this.getRoutesByPermissions(this.props.routes.drawer);
        const stackRoutes = this.getRoutesByPermissions(this.props.routes.items);
        return (
            <NavigationContainer ref={this.navigation}>
                {!isEmpty(drawerRoutes) && this.renderDrawer(drawerRoutes)}
                {!isEmpty(stackRoutes) && this.renderScreens(stackRoutes)}
            </NavigationContainer>
        );
    }

    renderDrawer(drawer) {
        const initialRouteName = drawer.initialRouteName || drawer[0].id;
        return (
            <Drawer.Navigator initialRouteName={initialRouteName}>
                {drawer.map((item, index) => (
                    <Drawer.Screen
                        key={index}
                        name={item.id}
                        options={{
                            title: item.label || item.id || '',
                            ...item.options,
                        }}
                    >
                        {({navigation}) => (
                            this.renderScreens(drawer.items)
                        )}
                    </Drawer.Screen>
                ))}
            </Drawer.Navigator>
        );
    }

    renderScreens(routes) {
        return (
            <Stack.Navigator>
                {routes.map((route, index) => (
                    <Stack.Screen
                        key={index}
                        name={route.id}
                        component={route.component}
                        {...route}
                    />
                ))}
            </Stack.Navigator>
        );
    }
}
