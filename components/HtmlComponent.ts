import {StyleSheet} from "react-native";

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
        console.log('CLASSNAMES ARRAY', names);
        return Array.prototype.slice
            .call(names)
            .filter(v => v);
    }

    _toStyles(names) {
        const cachedName = names.filter((item) => typeof(item) === 'string').join(' ');

        if (!this._styles[cachedName]) {
            console.log("BEM CLASSNAMES", names);
            let styles = {};
            names.forEach(name => {
                let additionalStyles;
                console.log("BEM NAME TYPE", typeof(name));
                if (typeof(name) === 'object') {
                    additionalStyles = name;
                    console.log("BEM ADDITIONAL STYLES OBJECT", additionalStyles);
                } else {
                    additionalStyles = this.classes[name];
                    console.log("BEM ADDITIONAL STYLES " + name, additionalStyles);
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
