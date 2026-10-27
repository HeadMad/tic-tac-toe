/**
 * Генерирует все выигрышные линии для доски size x size.
 * Для n=3/4/5 нужна линия длины n.
 * @param {number} size
 * @returns {number[][]}
 */
export default function getWinLines(size) {
  const lines = []
  // rows
  for (let r = 0; r < size; r++) {
    const row = []
    for (let c = 0; c < size; c++) row.push(r * size + c)
    lines.push(row)
  }
  // cols
  for (let c = 0; c < size; c++) {
    const col = []
    for (let r = 0; r < size; r++) col.push(r * size + c)
    lines.push(col)
  }
  // main diag
  const main = []
  for (let i = 0; i < size; i++) main.push(i * size + i)
  lines.push(main)
  // anti diag
  const anti = []
  for (let i = 0; i < size; i++) anti.push(i * size + (size - 1 - i))
  lines.push(anti)
  return lines
}
