<script>
  import StartScreen from './lib/svelte/ui/organisms/StartScreen/index.js'
  import GameScreen from './lib/svelte/ui/organisms/GameScreen/index.js'
  import { getScreen, getGameOver, getResult, resetRound } from './lib/svelte/state/game.svelte.js'
  import { getMode } from './lib/svelte/state/settings.svelte.js'
  import './lib/svelte/state/theme.svelte.js'

  const screen = $derived(getScreen())
  const gameOver = $derived(getGameOver())
  const result = $derived(getResult())
  const mode = $derived(getMode())

  const overlayVisible = $derived(gameOver && result.winner)

  function overlayData() {
    if (result.winner === 'player') {
      return { emoji: '🎉', title: 'Победа!', sub: 'Отличная игра' }
    }
    if (result.winner === 'draw') {
      return { emoji: '🤝', title: 'Ничья!', sub: 'Равная партия' }
    }
    if (mode === 'human') {
      return { emoji: '🏆', title: 'Победа игрока 2', sub: 'Хорошая игра' }
    }
    return { emoji: '💀', title: 'Поражение', sub: 'ИИ оказался сильнее' }
  }

  const od = $derived(overlayData())
</script>

<div class="bg-orbs">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
</div>

<div class="app">
  {#if screen === 'start'}
    <StartScreen />
  {:else}
    <GameScreen />
  {/if}
</div>

{#if overlayVisible}
  <div class="overlay">
    <div class="overlay__card glass">
      <div class="overlay__emoji">{od.emoji}</div>
      <h2>{od.title}</h2>
      <p>{od.sub}</p>
      <button class="overlay__btn" onclick={resetRound} type="button">Продолжить</button>
    </div>
  </div>
{/if}

<style>
  .app {
    position: relative;
    z-index: 1;
    height: 100%;
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: env(safe-area-inset-top) 16px env(safe-area-inset-bottom);
    overflow: hidden;
    min-height: 0;
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: color-mix(in srgb, var(--bg) 72%, transparent);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeIn 0.25s ease;
  }

  .overlay__card {
    text-align: center;
    padding: 32px 24px;
    max-width: 300px;
    width: 100%;
    animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .overlay__emoji {
    font-size: 3.2rem;
    margin-bottom: 10px;
  }

  .overlay__card h2 {
    font-family: var(--font-display);
    font-size: 1.6rem;
    margin-bottom: 4px;
  }

  .overlay__card p {
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  .overlay__btn {
    width: 100%;
    padding: 14px;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #000));
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 40%, transparent);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.85); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
</style>
