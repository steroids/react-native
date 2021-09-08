import useComponents from '@steroidsjs/core/hooks/useComponents';

export interface IBem {
    (...classes: any[]): string;
    element(...classes: any[]): string;
    block(...classes: any): string;
    color(name: string): string;
    variables(name: string): string;
}

export default function useBemNative(namespace: string, styles: any): IBem {
    useComponents().html.addStyles(styles);
    return useComponents().html.bem(namespace, styles);
}
