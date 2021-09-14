import useComponents from '@steroidsjs/core/hooks/useComponents';
import { StyleProp } from 'react-native';

export interface IBem {
    (...classes: any[]): StyleProp<any>;
    element(...classes: any[]): StyleProp<any>;
    block(...classes: any): StyleProp<any>;
    color(name: string | null): string;
    variables(name: string): string;
}

export default function useBemNative(namespace: string, styles?: StyleProp<any>): IBem {
    useComponents().html.addStyles(styles);
    return useComponents().html.bem(namespace, styles);
}
