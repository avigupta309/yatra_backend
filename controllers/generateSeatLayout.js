export function generateSeatLayout(rows) {
    const layout = [];
    const leftColumn = ['A', 'B'];
    const rightColumn = ['C', 'D'];

    for (let i = 1; i <= rows; i++) {
        leftColumn.forEach(letter => {
            layout.push({ seatNumber: `${i}${letter}`, isAvailable: true });
        });
        rightColumn.forEach(letter => {
            layout.push({ seatNumber: `${i}${letter}`, isAvailable: true });
        });
    }

    return layout;
}
