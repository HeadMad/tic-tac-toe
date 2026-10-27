<script>
  import Button from '../../atoms/Button/index.js'
  import Board from '../Board/index.js'
  import {
    getScores,
    getPlayerChar,
    getOpponentChar,
    getCurrent,
    getGameOver,
    getResult,
    backToStart,
    resetRound
  } from '../../../state/game.svelte.js'
  import { getMode, getBoardSize, getVanishing } from '../../../state/settings.svelte.js'

  const scores = $derived(getScores())
  const playerChar = $derived(getPlayerChar())
  const opponentChar = $derived(getOpponentChar())
  const current = $derived(getCurrent())
  const gameOver = $derived(getGameOver())
  const result = $derived(getResult())
  const mode = $derived(getMode())
  const size = $derived(getBoardSize())
  const vanishing = $derived(getVanishing())

  const statusText = $derived.by(() => {
    if (gameOver) {
      if (result.winner === 'player') return 'Победа!'
      if (result.winner === 'draw') return 'Ничья'
      return mode === 'human' ? 'Победа игрока 2' : 'Поражение'
    }
    if (mode === 'ai') {
      return current === 'player' ? 'Твой ход' : 'Ход компьютера…'
    }
    return current === 'player' ? 'Ход игрока 1' : 'Ход игрока 2'
  })

  const statusClass = $derived.by(() => {
    if (gameOver) {
      if (result.winner === 'player') return 'status_win'
      if (result.winner === 'draw') return 'status_draw'
      return 'status_lose'
    }
    return current === 'player' ? 'status_player' : 'status_opp'
  })
</script>

<section class="game">
  <header class="header">
    <Button variant="icon" onclick={backToStart}>←</Button>
    <div class="score glass">
      <span class="score__char">{playerChar?.emoji}</span>
      <span class="score__val score__val_player">{scores.player}</span>
      <span class="score__div">:</span>
      <span class="score__val score__val_opp">{scores.ai}</span>
      <span class="score__char">{opponentChar?.emoji}</span>
    </div>
    <div class="badge">
      {size}×{size}{vanishing ? ' · ∅' : ''}
    </div>
  </header>

  <div class="status {statusClass}">{statusText}</div>

  <div class="board-wrap">
    <Board />
  </div>

  <div class="actions">
    <Button variant="secondary" onclick={resetRound}>Новый раунд</Button>
  </div>
</section>

<style>
  .game {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    padding: 12px 0 20px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
  }

  .score {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 14px;
  }

  .score__char {
    font-size: 1.3rem;
  }

  .score__val {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    min-width: 1.1em;
    text-align: center;
  }

  .score__val_player {
    color: var(--player);
  }

  .score__val_opp {
    color: var(--ai);
  }

  .score__div {
    color: var(--text-muted);
    opacity: 0.5;
  }

  .badge {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 5px 8px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    color: var(--accent);
    border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  }

  .status {
    text-align: center;
    font-size: 1.05rem;
    font-weight: 500;
    color: var(--text-muted);
    margin-bottom: 14px;
    min-height: 1.4em;
  }

  .status_player {
    color: var(--player);
  }

  .status_opp {
    color: var(--ai);
  }

  .status_win {
    color: var(--win);
    font-weight: 600;
  }

  .status_draw,
  .status_lose {
    color: #fbbf24;
  }

  .board-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-top: 14px;
  }

  .actions :global(.btn) {
    min-width: 150px;
  }
</style>
