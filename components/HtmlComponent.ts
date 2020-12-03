import _flatten from 'lodash-es/flatten';
import _merge from 'lodash-es/merge';
import _isArray from 'lodash-es/isArray';

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

    bem(blockName, styles) {
        let outerCustomStyles = {};
        for (let styleProperty in styles) {
            if (styles.hasOwnProperty(styleProperty) && styleProperty.includes(blockName)) {
                outerCustomStyles[styleProperty] = styles[styleProperty];
                delete styles[styleProperty];
            }
        }

        const bem = (...names) => this._toStyles(this._classNames(...names));

        bem.color = (colorName) => this._getColor(colorName);

        bem.variable = (variableName) => this._getVariable(variableName);

        bem.block = modifiers => this._applyCustomStyles(
            this._classNames(this._applyModifiers(blockName, modifiers)),
            outerCustomStyles
        );

        bem.element = (elementName, modifiers) => this._applyCustomStyles(
            this._classNames(this._applyModifiers(blockName + '__' + elementName, modifiers)),
            outerCustomStyles
        );

        return bem;
    }

    addStyles(styles) {
        if (_isArray(styles)) {
            styles.map(style => this.addStyles(style));
        }

        if (typeof styles === 'function') {
            this.classes = styles(this.variables, this.classes);
        } else {
            this.classes = {
                ...this.classes,
                styles
            };
        }
    }

    _applyCustomStyles(classNames, customElementStyles) {
        let customStyles = {};
        classNames.map((className: string | object) => {
            if (typeof className === 'string' && customElementStyles[className]) {
                customStyles = {
                    ...customStyles,
                    ...customElementStyles[className]
                };
            }
        });

        let regularStyles = this._toStyles(classNames);

        return customStyles
            ? _merge(regularStyles, customStyles)
            : regularStyles;
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

    _getVariable(variableName) {
        if (variableName) {
            return this.variables[variableName]
        }
    }

    _classNames(...names) {
        return _flatten(
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

            this._styles = {
                ...this._styles,
                [names]: styles
            };
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
