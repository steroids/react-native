import { colorLevel } from '../mixins/functions';

export default function getClasses(variables, classes) {
  const {
    white,
    themeColors,
  } = variables;

  const _classes = {
    // @if $enable-gradients {
    //   @each $color, $value in $theme-colors {
    //     @include bg-gradient-variant(".bg-gradient-#{$color}", $value);
    //   }
    // }

    bgWhite: {
      backgroundColor: white,
    },

    bgTransparent: {
      backgroundColor: 'transparent',
    },
  };

  // bg%color / ex: bgPrimary
  // bg%colorLight / ex: bgPrimaryLight
  // bg%colorDark / ex: bgPrimaryDark
  Object.keys(themeColors).forEach((item) => {
    const classColor = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    _classes['bg' + classColor] = {backgroundColor: themeColors[item]};

    // custom
    _classes['bg' + classColor + 'Light'] = {backgroundColor: colorLevel(variables, themeColors[item], -9)};
    _classes['bg' + classColor + 'Dark'] = {backgroundColor: colorLevel(variables, themeColors[item], 9)};

    // custom / experimental
    _classes['bg' + classColor + 'Lightest'] = {backgroundColor: colorLevel(variables, themeColors[item], -11)};
    _classes['bg' + classColor + 'Darkest'] = {backgroundColor: colorLevel(variables, themeColors[item], -11)};
  });

  return _classes;
};
