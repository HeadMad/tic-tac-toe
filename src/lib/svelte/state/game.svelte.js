import checkWinner from '../../js/checkWinner/index.js'
import getWinLines from '../../js/getWinLines/index.js'
import getAiMove from '../../js/getAiMove/index.js'
import characters from '../../js/characters/index.js'
import {
  getMode,
  getBoardSize,
  getVanishing,
  getSelectedCharId,
  getPlayer2CharId
} from './settings.svelte.js'

/** @type {(string|null)[]} */
let board = $state([])
/** @type {'player' | 'ai' | 'player2'} */
let current = $state('player')
let gameOver = $state(false)
/** @type {{ winner: string|null, line: number[]|null }} */
let result = $state({ winner: null, line: null })
/** @type {{ player: number, ai: number }} */
let scores = $state({ player: 0, ai: 0 })
/** @type {{ id: string, emoji: string, name: string } | null} */
let playerChar = $state(null)
/** @type {{ id: string, emoji: string, name: string } | null} */
let opponentChar = $state(null)
/** @type {number[]} */
let playerQueue = $state([])
/** @type {number[]} */
let opponentQueue = $state([])
let screen = $state('start') // start | game

/** Макс. меток на игрока в vanishing-режиме */
const MAX_MARKS = {
  3: 3,
  4: 4,
  5: 5
}

/** Длина линии для победы: при vanishing на 4×4 → 3, на 5×5 → 4 */
function getWinLength() {
  const size = getBoardSize()
  if (getVanishing() && size >= 4) return size - 1
  return size
}

function getMaxMarks() {
  if (!getVanishing()) return 0
  return MAX_MARKS[getBoardSize()] || getBoardSize()
}

function loadScores() {
  try {
    const s = localStorage.getItem('neon-tac-scores')
    if (s) scores = JSON.parse(s)
  } catch (_) {}
}

function saveScores() {
  try {
    localStorage.setItem('neon-tac-scores', JSON.stringify(scores))
  } catch (_) {}
}

loadScores()

export function getBoard() {
  return board
}
export function getCurrent() {
  return current
}
export function getGameOver() {
  return gameOver
}
export function getResult() {
  return result
}
export function getScores() {
  return scores
}
export function getPlayerChar() {
  return playerChar
}
export function getOpponentChar() {
  return opponentChar
}
export function getScreen() {
  return screen
}
export function getPlayerQueue() {
  return playerQueue
}
export function getOpponentQueue() {
  return opponentQueue
}

export function startGame() {
  const size = getBoardSize()
  const charId = getSelectedCharId()
  if (!charId) return

  playerChar = characters.find((c) => c.id === charId) || characters[0]
  const others = characters.filter((c) => c.id !== charId)

  if (getMode() === 'human') {
    const p2 = getPlayer2CharId()
    opponentChar = characters.find((c) => c.id === p2) || others[0]
  } else {
    opponentChar = others[Math.floor(Math.random() * others.length)]
  }

  board = Array(size * size).fill(null)
  current = 'player'
  gameOver = false
  result = { winner: null, line: null }
  playerQueue = []
  opponentQueue = []
  screen = 'game'
}

export function backToStart() {
  screen = 'start'
  gameOver = false
  result = { winner: null, line: null }
}

export function resetScores() {
  scores = { player: 0, ai: 0 }
  saveScores()
}

/** Новая игра: сброс счёта и возврат в меню настроек */
export function newGame() {
  resetScores()
  board = []
  playerQueue = []
  opponentQueue = []
  gameOver = false
  result = { winner: null, line: null }
  screen = 'start'
}

export function resetRound() {
  const size = getBoardSize()
  board = Array(size * size).fill(null)
  current = 'player'
  gameOver = false
  result = { winner: null, line: null }
  playerQueue = []
  opponentQueue = []
}

function applyMove(index, mark) {
  const max = getMaxMarks()
  const isPlayer = mark === 'player'
  const queue = isPlayer ? [...playerQueue] : [...opponentQueue]

  queue.push(index)
  let removed = null
  if (max > 0 && queue.length > max) {
    removed = queue.shift()
  }

  const next = [...board]
  next[index] = mark
  if (removed !== null) next[removed] = null

  board = next
  if (isPlayer) playerQueue = queue
  else opponentQueue = queue
}

function evaluateBoard() {
  const size = getBoardSize()
  const lines = getWinLines(size, getWinLength())
  return checkWinner(board, lines)
}

/** Индексы меток, которые исчезнут при следующем ходе своего игрока */
export function getFadingIndices() {
  if (!getVanishing()) return []
  const max = getMaxMarks()
  const fading = []
  if (playerQueue.length >= max && max > 0) fading.push(playerQueue[0])
  if (opponentQueue.length >= max && max > 0) fading.push(opponentQueue[0])
  return fading
}

export function playMove(index) {
  if (gameOver || board[index] !== null) return
  if (getMode() === 'ai' && current !== 'player') return
  if (getMode() === 'human' && current !== 'player' && current !== 'player2') return

  const mark = current === 'player' ? 'player' : current === 'player2' ? 'player2' : 'ai'
  applyMove(index, mark)

  const res = evaluateBoard()
  if (res.winner) {
    endRound(res)
    return
  }

  if (getMode() === 'ai') {
    current = 'ai'
    setTimeout(() => aiTurn(), 400 + Math.random() * 300)
  } else {
    current = current === 'player' ? 'player2' : 'player'
  }
}

function aiTurn() {
  if (gameOver) return
  const size = getBoardSize()
  const max = getMaxMarks()
  const move = getAiMove(
    board,
    size,
    'ai',
    'player',
    playerQueue,
    opponentQueue,
    max,
    getWinLength()
  )
  if (move >= 0 && board[move] === null) {
    applyMove(move, 'ai')
    const res = evaluateBoard()
    if (res.winner) {
      endRound(res)
      return
    }
  }
  current = 'player'
}

function endRound(res) {
  gameOver = true
  result = res
  if (res.winner === 'player') {
    scores = { ...scores, player: scores.player + 1 }
    saveScores()
  } else if (res.winner === 'ai' || res.winner === 'player2') {
    scores = { ...scores, ai: scores.ai + 1 }
    saveScores()
  }
}
