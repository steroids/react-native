import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDetailViewProps} from '@steroidsjs/core/ui/list/Detail/Detail';
import {Text, View} from "react-native";

import styles from './DetailViewStyles';

@bem('DetailView', styles)
export default class DetailView extends React.PureComponent<IDetailViewProps & IBemHocOutput> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.block(), this.props.styles)}>
                {this.props.items.map((item, index) => (
                    <View
                        key={item.attribute || index}
                        style={bem(bem.element('field-container'), 'row', this.props.styles)}
                    >
                        <View style={bem('col-5')}>
                            <Text style={bem(bem.element('field-label'))}>{item.label}</Text>
                        </View>
                        <View style={bem('col-7')}>
                            <Text>{item.value}</Text>
                        </View>
                    </View>
                ))}
            </View>
        );
    }
}
