import React from 'react';
import {SvgProps} from 'react-native-svg';

interface IIconSvgViewProps {
    icon: React.FC<SvgProps>;
    size: number;
    fill: string;

    [key: string]: any;
}

export default function IconSvgView({
    icon,
    size = 24,
    fill = '#000000',
    ...props
}: IIconSvgViewProps) {
    const Icon = icon;
    return (
        <Icon
            width={size}
            height={size}
            fill={fill}
            {...props}
        />
    );
}
