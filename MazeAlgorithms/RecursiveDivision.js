const wallTheBorders = async () => {
    for (let i = 0; i < COLUMNSIZE; i++) {
        wallTheCell(cellArray[i], 0, i);
        await sleep(5);
    }
    for (let i = 0; i < COLUMNSIZE; i++) {
        wallTheCell(cellArray[NO_OF_NODES - COLUMNSIZE + i], ROWSIZE - 1, i);
        await sleep(5);
    }
    for (let i = 0; i < ROWSIZE; i++) {
        wallTheCell(cellArray[i * COLUMNSIZE], i, 0);
        await sleep(5);
    }
    for (let i = 0; i < ROWSIZE; i++) {
        wallTheCell(cellArray[i * COLUMNSIZE + COLUMNSIZE - 1], i, COLUMNSIZE - 1);
        await sleep(5);
    }
}
const recursiveDivision = async (startrow, startcol, endrow, endcol) => {
    let direction = "";
    let width = endcol - startcol;
    let height = endrow - startrow;
    if (width == 2 || height == 2) {
        return;
    }
    // if ((Math.random() * (width + height)) < width) {
    if (height < width) {
        direction = "vertical";
    } else {
        direction = "horizontal";
    }
    if (direction == "vertical") {
        let wallColumn = startcol + (parseInt(Math.random() * ((width - 2) / 2)) * 2 + 2);
        let passageCell = startrow + (parseInt(Math.random() * ((height) / 2)) * 2 + 1);
        for (let i = startrow; i < endrow; i++) {
            if (i == passageCell)
                continue;
            wallTheCell(cellArray[i * COLUMNSIZE + wallColumn], i, wallColumn);
            await sleep(5);
        }
        await recursiveDivision(startrow, startcol, endrow, wallColumn);
        await recursiveDivision(startrow, wallColumn, endrow, endcol);
    } else {
        let wallRow = startrow + (parseInt(Math.random() * ((height - 2) / 2)) * 2 + 2);
        let passageCell = startcol + (parseInt(Math.random() * ((width) / 2)) * 2 + 1);
        for (let i = startcol; i < endcol; i++) {
            if (i == passageCell)
                continue;
            wallTheCell(cellArray[wallRow * COLUMNSIZE + i], wallRow, i);
            await sleep(5);

        }
        await recursiveDivision(startrow, startcol, wallRow, endcol);
        await recursiveDivision(wallRow, startcol, endrow, endcol);
    }
}
