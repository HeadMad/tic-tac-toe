/**
 * Генерирует все выигрышные линии для доски size x size длины winLength.
 * @param {number} size
 * @param {number} [winLength]
 * @returns {number[][]}
 */
export default function getWinLines(size, winLength = size) {
  const lines = []
  const need = Math.min(winLength, size)

  // rows
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - need; c++) {
      const line = []
      for (let k = 0; k < need; k++) line.push(r * size + (c + k))
      lines.push(line)
    }
  }

  // cols
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - need; r++) {
      const line = []
      for (let k = 0; k < need; k++) line.push((r + k) * size + c)
      lines.push(line)
    }
  }

  // diagonals ↘
  for (let r = 0; r <= size - need; r++) {
    for (let c = 0; c <= size - need; c++) {
      const line = []
      for (let k = 0; k < need; k++) line.push((r + k) * size + (c + k))
      lines.push(line)
    }
  }

  // diagonals ↙
  for (let r = 0; r <= size - need; r++) {
    for (let c = need - 1; c < size; c++) {
      const line = []
      for (let k = 0; k < need; k++) line.push((r + k) * size + (c - k))
      lines.push(line)
    }
  }

  return lines
}
