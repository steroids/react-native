import * as React from 'react';
import _isArray from 'lodash-es/isArray';
import _isObject from 'lodash-es/isObject';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperLightTheme,
    DarkTheme as PaperDarkTheme, Theme,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {IConnectHocOutput} from '@steroidsjs/core/hoc/connect';
import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';
import {Platform, StatusBar} from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export interface INativeRouteItem extends IRouteItem {
    items?: INativeRouteItem[] | { [key: string]: INativeRouteItem }
}

export interface INativeRouterProps {
    theme?: 'light' | 'dark' | Theme,
    routes: {
        drawer?: INativeRouteItem[] | { [key: string]: INativeRouteItem },
        items?: INativeRouteItem[] | { [key: string]: INativeRouteItem }
    }
}

interface INativeRouterPrivateProps extends IConnectHocOutput {

}

interface NativeRouterState {
    theme: Theme
}

export default class NativeRouter extends React.PureComponent<INativeRouterProps & INativeRouterPrivateProps, NativeRouterState> {

    static defaultProps = {
        theme: 'light',
    };

    constructor(props) {
        super(props);

        this.state = {
            theme: this._prepareTheme(this.props.theme),
        };
    }

    componentDidUpdate(prevProps: Readonly<INativeRouterProps & INativeRouterPrivateProps>): void {
        if (prevProps.theme !== this.props.theme) {
            this.setState({theme: this._prepareTheme(this.props.theme)});
        }
    }

    render() {
        return (
            <PaperProvider theme={this.state.theme}>
                {Platform.OS === 'ios' && (
                    <StatusBar barStyle={this.state.theme.dark ? 'dark-content' : 'light-content'}/>
                )}
                <NavigationContainer>
                    {this.renderDrawer(this.props.routes.drawer)}
                    {this.renderScreens(this.props.routes.items)}
                </NavigationContainer>
            </PaperProvider>
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

    _prepareTheme(theme) {
        switch (theme) {
            case 'light':
                return PaperLightTheme;

            case 'dark':
                return PaperDarkTheme;
        }
        return theme;
    }

    _renderItem(route, props) {
        let Component = route.component;
        return <Component {...props} {...route.componentProps} />;
    }
}
