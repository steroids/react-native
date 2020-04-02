import * as React from 'react';
import _isArray from 'lodash-es/isArray';
import _isObject from 'lodash-es/isObject';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {IConnectHocOutput} from '@steroidsjs/core/hoc/connect';
import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';
import {connect} from "../../react/hoc";
import {initNavigation} from "../../react/actions/router";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export interface INativeRouteItem extends IRouteItem {
    items?: INativeRouteItem[] | { [key: string]: INativeRouteItem }
}

export interface INativeRouterProps {
    routes: {
        drawer?: INativeRouteItem[] | { [key: string]: INativeRouteItem },
        items?: INativeRouteItem[] | { [key: string]: INativeRouteItem }
    }
}

interface INativeRouterPrivateProps extends IConnectHocOutput {}

interface NativeRouterState {}

@connect()
export default class NativeRouter extends React.PureComponent<INativeRouterProps & INativeRouterPrivateProps, NativeRouterState> {

    navigation: any;

    constructor(props) {
        super(props);

        this.navigation = React.createRef();
    }

    componentDidMount(): void {
        this.props.dispatch(initNavigation(this.navigation.current));
    }

    render() {
        return (
            <NavigationContainer ref={this.navigation}>
                {this.renderDrawer(this.props.routes.drawer)}
                {this.renderScreens(this.props.routes.items)}
            </NavigationContainer>
        );
    }

    renderDrawer(drawer) {
        if (!drawer) {
            return null;
        }
        return (
            <Drawer.Navigator>
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
        if (!routes) {
            return null;
        }
        if (_isObject(routes) && !_isArray(routes)) {
            routes = Object.keys(routes).map(id => ({
                ...routes[id],
                id,
            }));
        }

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
