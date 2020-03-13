import { Dimensions } from 'react-native'

export default (variables, classes) => {
    const { width, height } = Dimensions.get('window');
    classes = {
        ...classes,

        'DropDownOptionsList': {
            flex: 1,
            borderRadius: variables.borderRadius
        },

        'DropDownOptionsList__option': {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
        },
        'DropDownOptionsList__option_selected': {
            fontWeight: '700',
            backgroundColor: variables.themeColors.primary
        },
        'DropDownOptionsList__option-text': {
            flex: 1,
            textAlign: 'left',
        },

        'DropDownOptionsList__overlay': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            justifyContent: 'center',
            alignItems: 'center'
        },

        'DropDownOptionsList__filter': {
            padding: 15,
            flex: 0,
            height: 50
        },
        'DropDownOptionsList__filter-container': {
            minHeight: 50,
            paddingHorizontal: 10,
            paddingVertical: 5,
        },

        'DropDownOptionsList__no-results': {
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10
        },
        'DropDownOptionsList__no-results-text': {
            flex: 1,
            textAlign: 'center',
            color: '#ccc',
            fontStyle: 'italic',
            fontSize: 22
        },

        'DropDownOptionsList__cancel': {
        },
        'DropDownOptionsList__cancel-text': {
        },
        'DropDownOptionsList__cancel-container': {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },

        'DropDownOptionsList__list-container': {
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