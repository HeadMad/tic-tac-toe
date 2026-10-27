/** @type {'ai' | 'human'} */
let mode = $state('ai')

/** @type {3 | 4 | 5} */
let boardSize = $state(3)

/** @type {boolean} */
let vanishing = $state(false)

/** @type {string | null} */
let selectedCharId = $state(null)

/** @type {string | null} */
let player2CharId = $state(null)

export function getMode() {
  return mode
}
export function setMode(v) {
  mode = v
}

export function getBoardSize() {
  return boardSize
}
export function setBoardSize(v) {
  boardSize = v
}

export function getVanishing() {
  return vanishing
}
export function setVanishing(v) {
  vanishing = v
}

export function getSelectedCharId() {
  return selectedCharId
}
export function setSelectedCharId(v) {
  selectedCharId = v
}

export function getPlayer2CharId() {
  return player2CharId
}
export function setPlayer2CharId(v) {
  player2CharId = v
}
