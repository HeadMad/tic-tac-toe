import checkWinner from '../checkWinner/index.js'
import getWinLines from '../getWinLines/index.js'

/**
 * Возвращает лучший ход ИИ (сложный уровень, depth-limited minimax + alpha-beta).
 * @param {(string|null)[]} board
 * @param {number} size
 * @param {string} aiMark
 * @param {string} humanMark
 * @param {number[]|null} [playerQueue] - для vanishing-режима
 * @param {number[]|null} [aiQueue]
 * @param {number} [maxMarks]
 * @returns {number}
 */
export default function getAiMove(board, size, aiMark = 'ai', humanMark = 'player', playerQueue = null, aiQueue = null, maxMarks = 0, winLength = size) {
  const lines = getWinLines(size, winLength)
  const empties = board.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0)
  if (empties.length === 0) return -1

  const maxDepth = size <= 3 ? 9 : size === 4 ? 5 : 3

  function applyVanish(b, queues, mark, idx) {
    const q = [...(queues[mark] || [])]
    q.push(idx)
    let removed = null
    if (maxMarks > 0 && q.length > maxMarks) {
      removed = q.shift()
    }
    const next = [...b]
    next[idx] = mark
    if (removed !== null) next[removed] = null
    return { board: next, queue: q }
  }

  function minimax(b, depth, isMax, alpha, beta, pQ, aQ) {
    const result = checkWinner(b, lines)
    if (result.winner === aiMark) return 100 - depth
    if (result.winner === humanMark) return depth - 100
    if (result.winner === 'draw' || depth >= maxDepth) return 0

    const cells = b.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0)
    if (cells.length === 0) return 0

    if (isMax) {
      let best = -Infinity
      for (const i of cells) {
        const { board: nb, queue: nq } = applyVanish(b, { player: pQ, ai: aQ }, aiMark, i)
        const score = minimax(nb, depth + 1, false, alpha, beta, pQ, nq)
        best = Math.max(best, score)
        alpha = Math.max(alpha, best)
        if (beta <= alpha) break
      }
      return best
    } else {
      let best = Infinity
      for (const i of cells) {
        const { board: nb, queue: nq } = applyVanish(b, { player: pQ, ai: aQ }, humanMark, i)
        const score = minimax(nb, depth + 1, true, alpha, beta, nq, aQ)
        best = Math.min(best, score)
        beta = Math.min(beta, best)
        if (beta <= alpha) break
      }
      return best
    }
  }

  let bestScore = -Infinity
  let move = empties[0]
  // shuffle for variety
  for (let i = empties.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[empties[i], empties[j]] = [empties[j], empties[i]]
  }

  for (const i of empties) {
    const { board: nb, queue: nq } = applyVanish(
      board,
      { player: playerQueue || [], ai: aiQueue || [] },
      aiMark,
      i
    )
    const score = minimax(nb, 0, false, -Infinity, Infinity, playerQueue || [], nq)
    if (score > bestScore) {
      bestScore = score
      move = i
    }
  }
  return move
}
