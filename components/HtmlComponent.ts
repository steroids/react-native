import {StyleSheet} from "react-native";
import flatten from 'lodash/flatten';

export default class HtmlComponent {
    namespace = '';
    variables: any;
    classes: object;
    _styles: object;

    constructor(components, config) {
        this.variables = config.variables;
        this.classes = config.classes;

        this._styles = {};
    }

    bem(blockName) {
        const bem = (...names) => this._toStyles(this._classNames(...names));
        bem.block = modifiers => this._applyModifiers(blockName, modifiers);
        bem.element = (elementName, modifiers) => this._applyModifiers(blockName + '__' + elementName, modifiers);
        bem.color = (colorName) => this._getColor(colorName);
        return bem;
    }

    addStyles(styles) {
        if (typeof styles === 'function') {
            this.classes = styles(this.variables, this.classes);
        } else {
            this.classes = {
                ...this.classes,
                styles
            };
        }
    }

    _getColor(colorName) {
        if (colorName) {
            if (this.variables.themeColors[colorName]) {
                return this.variables.themeColors[colorName];
            } else if (this.variables.colors[colorName]) {
                return this.variables.colors[colorName];
            }
        }

        return this.variables.themeColors.primary;
    }

    _classNames(...names) {
        return flatten(
            Array.prototype.slice
                .call(names)
                .filter(v => v)
                .map(v => {
                    if (typeof(v) === 'string' && v.indexOf(' ') !== -1) {
                        return v.split(' ');
                    } else {
                        return v;
                    }
                })
        );
    }

    _toStyles(names) {
        const classNames = names.filter((item) => typeof(item) === 'string');
        const cachedName = classNames.join(' ');

        if (!this._styles[cachedName] || classNames.length !== names.length) {
            let styles = {};

            names.forEach(name => {
                let additionalStyles;
                if (typeof(name) === 'object') {
                    additionalStyles = name;
                } else {
                    additionalStyles = this.classes[name];
                }

                styles = {
                    ...styles,
                    ...additionalStyles,
                };
            });

            this._styles = StyleSheet.create({
                ...this._styles,
                [names]: styles
            });
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
