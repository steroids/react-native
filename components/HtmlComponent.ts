import {StyleSheet} from 'react-native';

export default class HtmlComponent {
    namespace = '';
    variables: object;
    classes: object;
    _styles: object;

    constructor(components, config) {
        this.variables = config.variables;
        this.classes = config.classes;

        this._styles = {};
    }

    bem(blockName) {
        const bem = (...names) => this._toStyles(this.classNames(...names));
        bem.block = modifiers => this._applyModifiers(blockName, modifiers);
        bem.element = (elementName, modifiers) => this._applyModifiers(blockName + '__' + elementName, modifiers);
        return bem;
    }

    classNames(...names) {
        return Array.prototype.slice
            .call(names)
            .filter(v => v)
            .join(' ');
    }

    _toStyles(names) {
        if (!this._styles[names]) {
            let styles = {};
            names.split(' ').forEach(name => {
                styles = {
                    ...styles,
                    ...this.classes[name],
                };
            });

            // TODO StyleSheet.create & StyleSheet.compose
            this._styles[names] = styles;
        }
        return this._styles[names];
    }

    _applyModifiers(entity, modifiers) {
        let result = [];
        result.push(entity);
        if (typeof modifiers === 'string') {
            result.push(entity + (modifiers ? '_' + modifiers : ''));
        } else if (modifiers) {
            Object.keys(modifiers).forEach(key => {
                const value = modifiers[key];
                if (!value) {
                    // Skip
                } else if (value === true) {
                    result.push(entity + '_' + key);
                } else {
                    result.push(entity + '_' + key + '_' + value);
                }
            });
        }

        // Append namespace
        result = result.map(cl => this.namespace + cl);
        return result.join(' ');
    }
}
