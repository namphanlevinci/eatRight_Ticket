export const getYears = () => {
    const start = 2024;
    const end = 2050;
    const arr = [];

    for (let temp = start; temp <= end; temp++) {
        arr.push({
            value: temp.toString(),
            label: temp.toString(),
        });
    }
    return arr;
};

export const getMonths = () => {
    const start = 1;
    const end = 12;
    const arr = [];

    for (let temp = start; temp <= end; temp++) {
        arr.push({
            value: temp.toString(),
            label: temp.toString(),
        });
    }
    return arr;
};

export const getDays = () => {
    const start = 1;
    const end = 31;
    const arr = [];

    for (let temp = start; temp <= end; temp++) {
        arr.push({
            value: temp.toString(),
            label: temp.toString(),
        });
    }
    return arr;
};

export const getFloors = () => {
    return [
        {
            value: 'Floor 1',
            label: 'Floor 1',
        },
        {
            value: 'Floor 2',
            label: 'Floor 2',
        },
        {
            value: 'Floor 3',
            label: 'Floor 3',
        },
        {
            value: 'Floor 4',
            label: 'Floor 4',
        },
        {
            value: 'Floor 5',
            label: 'Floor 5',
        },
    ];
};

export const getArea = () => {
    return [
        {
            value: 'Area 1',
            label: 'Area 1',
        },
        {
            value: 'Area 2',
            label: 'Area 2',
        },
        {
            value: 'Area 3',
            label: 'Area 3',
        },
        {
            value: 'Area 4',
            label: 'Area 4',
        },
        {
            value: 'Area 5',
            label: 'Area 5',
        },
    ];
};

export const getTable = () => {
    return [
        {
            value: "1",
            label: 'Table 1',
        },
        {
            value: "2",
            label: 'Table 2',
        },
        {
            value: "3",
            label: 'Table 3',
        },
        {
            value: "4",
            label: 'Table 4',
        },
        {
            value: "5",
            label: 'Table 5',
        },
        {
            value: "6",
            label: 'Table 6',
        },
        {
            value: "7",
            label: 'Table 7',
        },
        {
            value: "8",
            label: 'Table 8',
        },
        {
            value: "9",
            label: 'Table 9',
        },
        {
            value: "10",
            label: 'Table 10',
        },
    ];
};
