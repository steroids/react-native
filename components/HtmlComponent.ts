import {StyleSheet} from "react-native";

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
        const bem = (...names) => this._toStyles(this.classNames(...names));
        bem.block = modifiers => this._applyModifiers(blockName, modifiers);
        bem.element = (elementName, modifiers) => this._applyModifiers(blockName + '__' + elementName, modifiers);
        bem.color = (colorName) => this.getColor(colorName);
        return bem;
    }

    getColor(colorName) {
        if (colorName) {
            if (this.variables.themeColors[colorName]) {
                return this.variables.themeColors[colorName]
            } else if (this.variables.colors[colorName]) {
                return this.variables.colors[colorName]
            }
        }

        return this.variables.themeColors.primary;
    }

    classNames(...names) {
        return Array.prototype.slice
            .call(names)
            .filter(v => v)
            .map(v => {
                if (typeof(v) === 'string' && v.indexOf(' ') !== -1) {
                    return v.split(' ');
                } else {
                    return v;
                }
            })
            .flat(1);
    }

    _toStyles(names) {
        const cachedName = names.filter((item) => typeof(item) === 'string').join(' ');

        if (!this._styles[cachedName]) {
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

            // TODO StyleSheet.create & StyleSheet.compose
            // this._styles = StyleSheet.compose(this._styles,{
            //     [names]: styles
            // });
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
