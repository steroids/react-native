import { Dimensions } from 'react-native'

export default (variables, classes) => {
    const { width, height } = Dimensions.get('window');
    classes = {
        ...classes,

        'OptionsList': {
            borderRadius: variables.borderRadius,
            zIndex: 300,
        },

        'OptionsList__option': {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
        },
        'OptionsList__option_selected': {
            fontWeight: '700',
            backgroundColor: variables.themeColors.primary
        },
        'OptionsList__option-text': {
            flex: 1,
            textAlign: 'left',
        },

        'OptionsList__overlay1': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
        },

        'OptionsList__overlay2': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 200,
        },

        'OptionsList__filter': {
            padding: 15,
            flex: 0,
            height: 50
        },
        'OptionsList__filter-container': {
            minHeight: 50,
            paddingHorizontal: 10,
            paddingVertical: 5,
        },

        'OptionsList__no-results': {
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10
        },
        'OptionsList__no-results-text': {
            flex: 1,
            textAlign: 'center',
            color: '#ccc',
        },

        'OptionsList__button-container': {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },

        'OptionsList__button': {
            width: 150
        },

        'OptionsList__list-container': {
            flex: 1,
            width: width * 0.8,
            maxHeight: height * 0.7,
            backgroundColor: '#fff',
            borderRadius: variables.borderRadius,
            marginBottom: 15
        },
    };

    return classes;
};