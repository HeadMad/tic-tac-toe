/**
 * Проверяет победителя на доске.
 * @param {(string|null)[]} board
 * @param {number[][]} lines
 * @returns {{ winner: string|null, line: number[]|null }}
 */
export default function checkWinner(board, lines) {
  for (const line of lines) {
    const first = board[line[0]]
    if (!first) continue
    if (line.every((i) => board[i] === first)) {
      return { winner: first, line: [...line] }
    }
  }
  if (board.every((c) => c !== null)) {
    return { winner: 'draw', line: null }
  }
  return { winner: null, line: null }
}
