export function getColumnWidth(data: any) {
    if (typeof data === 'undefined' || data.length === 0) {
        return [];
    }
    const keys = Object.keys(data[0]);
    const columnsWidth: {
        width: number
    }[] = keys.map(key => {
        return { width: key.length * 1.2 };
    });
    data.reduce((arr: { width: number }[], item) => {
        arr.forEach((columnWidth, index) => {
            const key = keys[index];
            if (item[key] && columnWidth.width < item[key].length * 1.2) {
                columnWidth.width = item[key].length * 1.2;
            }
        });
        return arr;
    }, columnsWidth);
    return columnsWidth;
}
