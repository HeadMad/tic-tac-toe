<script>
  import Button from '../../atoms/Button/index.js'
  import CharButton from '../../atoms/CharButton/index.js'
  import characters from '../../../../js/characters/index.js'
  import {
    getMode,
    setMode,
    getBoardSize,
    setBoardSize,
    getVanishing,
    setVanishing,
    getSelectedCharId,
    setSelectedCharId,
    getPlayer2CharId,
    setPlayer2CharId
  } from '../../../state/settings.svelte.js'
  import { startGame } from '../../../state/game.svelte.js'
  import { getTheme, toggleTheme } from '../../../state/theme.svelte.js'

  const mode = $derived(getMode())
  const boardSize = $derived(getBoardSize())
  const vanishing = $derived(getVanishing())
  const selectedCharId = $derived(getSelectedCharId())
  const player2CharId = $derived(getPlayer2CharId())
  const theme = $derived(getTheme())

  const canStart = $derived(
    !!selectedCharId && (mode === 'ai' || (mode === 'human' && !!player2CharId && player2CharId !== selectedCharId))
  )
</script>

<section class="start">
  <div class="logo">
    <span class="logo__icon">⚡</span>
    <h1>NEON TAC</h1>
    <p class="logo__tag">Крестики-нолики нового поколения</p>
  </div>

  <div class="card glass">
    <div class="card__head">
      <h2>Персонаж {mode === 'human' ? 'игрока 1' : ''}</h2>
      <button class="theme-btn" onclick={toggleTheme} type="button" title="Тема">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
    <div class="chars">
      {#each characters as c}
        <CharButton
          emoji={c.emoji}
          title={c.name}
          selected={selectedCharId === c.id}
          onclick={() => setSelectedCharId(c.id)}
        />
      {/each}
    </div>
  </div>

  {#if mode === 'human'}
    <div class="card glass">
      <h2>Персонаж игрока 2</h2>
      <div class="chars">
        {#each characters as c}
          <CharButton
            emoji={c.emoji}
            title={c.name}
            selected={player2CharId === c.id}
            onclick={() => setPlayer2CharId(c.id)}
          />
        {/each}
      </div>
    </div>
  {/if}

  <div class="card glass">
    <h2>Режим</h2>
    <div class="row">
      <button
        class="opt"
        class:opt_active={mode === 'ai'}
        onclick={() => setMode('ai')}
        type="button"
      >Против ИИ</button>
      <button
        class="opt"
        class:opt_active={mode === 'human'}
        onclick={() => setMode('human')}
        type="button"
      >Вдвоём</button>
    </div>
  </div>

  <div class="card glass">
    <h2>Размер поля</h2>
    <div class="row">
      {#each [3, 4, 5] as s}
        <button
          class="opt"
          class:opt_active={boardSize === s}
          onclick={() => setBoardSize(s)}
          type="button"
        >{s}×{s}</button>
      {/each}
    </div>
  </div>

  <div class="card glass">
    <h2>Вариант</h2>
    <div class="row">
      <button
        class="opt"
        class:opt_active={!vanishing}
        onclick={() => setVanishing(false)}
        type="button"
      >Классика</button>
      <button
        class="opt"
        class:opt_active={vanishing}
        onclick={() => setVanishing(true)}
        type="button"
      >Исчезающие ходы</button>
    </div>
    {#if vanishing}
      <p class="hint">
        Макс. {boardSize} меток на игрока. Победа:
        {boardSize >= 4 ? boardSize - 1 : boardSize} в ряд
      </p>
    {/if}
  </div>

  <Button variant="primary" disabled={!canStart} onclick={startGame}>
    Начать игру
  </Button>
</section>

<style>
  .start {
    display: flex;
    flex-direction: column;
    padding: 16px 0 32px;
    gap: 12px;
  }

  .logo {
    text-align: center;
    margin-bottom: 8px;
  }

  .logo__icon {
    font-size: 36px;
    display: block;
    filter: drop-shadow(0 0 16px color-mix(in srgb, var(--accent) 60%, transparent));
  }

  .logo h1 {
    font-family: var(--font-display);
    font-size: 2.1rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, var(--text) 0%, var(--accent) 60%, var(--accent-2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .logo__tag {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-top: 2px;
  }

  .card {
    padding: 14px 16px;
  }

  .card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .card h2 {
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 10px;
  }

  .card__head h2 {
    margin-bottom: 0;
  }

  .theme-btn {
    font-size: 1.2rem;
    padding: 4px 8px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--text) 6%, transparent);
  }

  .chars {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .row {
    display: flex;
    gap: 8px;
  }

  .opt {
    flex: 1;
    padding: 11px 6px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: color-mix(in srgb, var(--text) 3%, transparent);
    color: var(--text-muted);
    font-size: 0.88rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .opt:hover {
    background: color-mix(in srgb, var(--text) 7%, transparent);
    color: var(--text);
  }

  .opt_active {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 25%, transparent),
      color-mix(in srgb, var(--accent-2) 12%, transparent)
    );
    border-color: var(--accent);
    color: var(--text);
    box-shadow: 0 0 14px color-mix(in srgb, var(--accent) 25%, transparent);
  }

  .hint {
    margin-top: 8px;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
</style>
