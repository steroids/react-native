export default function (variables) {

    let classes = {};

    classes['w-100'] = {
        width: '100%'
    };

    classes['h-100'] = {
        height: '100%'
    };

    classes['row'] = {
        flexDirection: 'row',
        flexWrap: 'wrap',
    };

    const maxColumnsCount = 12;
    let columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    columns.map((count) => {
        let width = count * 100 / maxColumnsCount;

        classes[`col-${count}`] = {
            flex: 1,
            flexBasis: width + '%',
            maxWidth: width + '%',
        };

        classes[`offset-${count}`] = {
            marginLeft: width + '%',
        };
    });

    return classes;
}