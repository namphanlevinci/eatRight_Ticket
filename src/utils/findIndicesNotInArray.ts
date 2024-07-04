export function findIndicesNotInArray(arrayA: any[], arrayB: any[]) {
    const indicesNotInB: number[] = [];

    arrayA.forEach((itemA, indexA) => {
        const foundInB = arrayB.some((itemB) => itemB?.id === itemA?.id);
        if (!foundInB) {
            indicesNotInB.push(indexA);
        }
    });

    return indicesNotInB;
}
