
const DIRECTION = Object.freeze({
    UP: Symbol("UP"),
    DOWN: Symbol("DOWN"),
    LEFT: Symbol("LEFT"),
    RIGHT: Symbol("RIGHT")
});

const GRID_BUFFER = 10;

class Grid {

    // Make a new grid with a specified number of rows and colums
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
    }

    // This syntax allows other code to retrieve the cellWidth
    // as if it were a variable instead of a function.
    //   You use someGrid.cellWidth rather then someGrid.cellWidth()
    get cellWidth() {
        return (min(width, height) - 2*GRID_BUFFER) / this.cols;
    }
    get cellHeight() {
        return (min(width, height) - 2*GRID_BUFFER) / this.rows;
    }

    // Pass in the column index & this function returns the center 
    // x coordinate for that column
    cellCenterX(col) {
        return GRID_BUFFER + this.cellWidth * 1/2 + this.cellWidth * col
    }

    // Pass in the row index & this function returns the center y
    // coordinate for that column
    cellCenterY(row) {
        return  GRID_BUFFER + this.cellHeight * 1/2 + this.cellHeight * row
    }

    pointIsWithinCell(px, py, col, row) {
        let cx = this.cellCenterX(col);
        let cy = this.cellCenterY(row);
        let hw = this.cellWidth / 2;
        let hh = this.cellHeight / 2;

        return px > cx - hw && px < cx + hw &&
               py > cy - hh && py < cy + hh;
    }

    // Draws the grid on screen
    drawGrid() {
        strokeWeight(2);
        stroke(155);

        // Vertical Grid Lines
        for(var c = 0; c <= this.cols; c++) {
            line(c * this.cellWidth + GRID_BUFFER, GRID_BUFFER,
                 c * this.cellWidth + GRID_BUFFER,  this.cellHeight * this.rows + GRID_BUFFER);
        }

        // Horizontal Grid Lines
        for(var r = 0; r <= this.rows; r++) {
            line(GRID_BUFFER, this.cellHeight * r + GRID_BUFFER,
                 this.cellWidth * this.cols + GRID_BUFFER, this.cellHeight * r + GRID_BUFFER);
        }
    }

    // Draws an image to fit inside a cell in the grid. 
    // (does not alter the aspect ratio of the iamge)
    drawImageOnGrid(img, col, row, direction) {
        let aspectRatio = img.width / img.height;
        let drawWidth = min(grid.cellWidth, 
                            grid.cellHeight * aspectRatio);

        let drawHeight = min(grid.cellHeight,
                             grid.cellWidth / aspectRatio);                            

        push();
        translate(this.cellCenterX(col), this.cellCenterY(row));
        if (direction === DIRECTION.LEFT) {
            scale(-1, 1);
        }
        if (direction === DIRECTION.UP) {
            angleMode(DEGREES)
            rotate(-90)
        }
        if (direction === DIRECTION.DOWN) {
            angleMode(DEGREES)
            rotate(90)
        }
        if (Number.isFinite(direction)) {
            let diagonal = dist(0, 0, drawWidth, drawHeight)
            scale(min(grid.cellWidth, grid.cellHeight) / diagonal);
            angleMode(DEGREES);
            rotate(direction);
        }
        imageMode(CENTER);
        image(img,
                0, 0,
                drawWidth, drawHeight);
        pop();
    }
}