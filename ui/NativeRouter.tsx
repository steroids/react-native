import * as React from 'react';
import _isArray from 'lodash-es/isArray';
import _isObject from 'lodash-es/isObject';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {IConnectHocOutput} from '@steroidsjs/core/hoc/connect';
import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';
import {components} from "@steroidsjs/core/hoc";
import {NavigationContainerRef} from "@react-navigation/core/src/types";
import {IComponentsHocOutput} from "@steroidsjs/core/hoc/components";
import isEmpty from 'lodash/isEmpty';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

interface ITabOptions {
    tabBar?: any,
    screenOptions?: object,
    tabBarOptions?: object,
}

export interface INativeRouteItem extends IRouteItem {
    items?: INativeRouteItem[] | { [key: string]: INativeRouteItem }
}

export interface INativeRouterProps {
    routes: {
        navigator: {
            type?: NavigatorType,
            items: INativeRouteItem[] | { [key: string]: INativeRouteItem }
        }
    },
    auth: {
        role: string,
        [key: string]: any
    },
}

type NavigatorType = 'stack' | 'drawer' | 'tab';

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
            return route.roles
                ? route.roles.includes(userRole)
                : true;
        });
    }

    render() {
        return (
            <NavigationContainer ref={this.navigation}>
                {this.renderNavigator(this.props.routes.navigator)}
            </NavigationContainer>
        );
    }

    renderNavigator(navigator) {
        const NavigatorType = this.getNavigatorComponent(navigator.type);
        const routes = this.getRoutesByPermissions(navigator.items);
        const options = this.getNavigatorOptions(navigator);

        return !isEmpty(routes) && (
            <NavigatorType.Navigator {...options}>
                {routes.map((route, index) => {
                    return <NavigatorType.Screen
                        key={index}
                        name={route.id}
                        component={route.navigator ? () => this.renderNavigator(route.navigator) : route.component}
                        {...route}
                    />
                })}
            </NavigatorType.Navigator>
        )
    }

    getNavigatorOptions(navigator) {
        let options: ITabOptions = {};

        if (navigator.tabBarView) {
            const Bar = navigator.tabBarView;
            options.tabBar = props => <Bar {...props}/>;
        }

        if (navigator.screenOptions) {
            options.screenOptions = navigator.screenOptions;
        }

        if (navigator.tabBarOptions) {
            options.tabBarOptions = navigator.tabBarOptions;
        }

        return options;
    }

    getNavigatorComponent(type) {
        switch (type) {
            case 'tab': return Tab;
            case 'drawer': return Drawer;
            case 'stack':
            default:
                return Stack;
        }
    }
}
