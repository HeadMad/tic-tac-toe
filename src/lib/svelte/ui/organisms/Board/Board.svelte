<script>
  import Cell from '../../atoms/Cell/index.js'
  import {
    getBoard,
    getGameOver,
    getCurrent,
    getResult,
    getPlayerChar,
    getOpponentChar,
    playMove
  } from '../../../state/game.svelte.js'
  import { getMode, getBoardSize } from '../../../state/settings.svelte.js'

  const board = $derived(getBoard())
  const gameOver = $derived(getGameOver())
  const current = $derived(getCurrent())
  const result = $derived(getResult())
  const playerChar = $derived(getPlayerChar())
  const opponentChar = $derived(getOpponentChar())
  const size = $derived(getBoardSize())
  const mode = $derived(getMode())

  function emojiFor(mark) {
    if (mark === 'player') return playerChar?.emoji || ''
    if (mark === 'ai' || mark === 'player2') return opponentChar?.emoji || ''
    return ''
  }

  function isDisabled(i) {
    return gameOver || board[i] !== null || (mode === 'ai' && current === 'ai')
  }
</script>

<div class="board" style="--size: {size}">
  {#each board as mark, i}
    <Cell
      {mark}
      emoji={emojiFor(mark)}
      isWin={result.line?.includes(i) ?? false}
      disabled={isDisabled(i)}
      onclick={() => playMove(i)}
    />
  {/each}
</div>

<style>
  .board {
    display: grid;
    grid-template-columns: repeat(var(--size), 1fr);
    gap: 8px;
    width: min(100%, 360px);
    aspect-ratio: 1 / 1;
  }

  @media (max-width: 380px) {
    .board {
      gap: 6px;
    }
  }
</style>
