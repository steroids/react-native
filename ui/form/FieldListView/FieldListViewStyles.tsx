export default (variables, classes) => {
    classes = {
        ...classes,

        'FieldListView__add-btn': {
            marginTop: 5,
            alignSelf: 'flex-end',
            minWidth: 150
        },


        'FieldListItemView': {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
        },
        'FieldListItemView__field': {
            marginBottom: 5
        },
        'FieldListItemView__remove-btn': {
            borderRadius: 15,
            width: 30,
            height: 30,
            minWidth: 0
        },
    };

    return classes;
};