<script>
  /**
   * @typedef {Object} Props
   * @property {string | null} mark
   * @property {string} [emoji]
   * @property {boolean} [isWin]
   * @property {boolean} [disabled]
   * @property {() => void} [onclick]
   */

  /** @type {Props} */
  let {
    mark = null,
    emoji = '',
    isWin = false,
    disabled = false,
    onclick
  } = $props()
</script>

<button
  class="cell"
  class:cell_filled={!!mark}
  class:cell_win={isWin}
  class:cell_disabled={disabled}
  {disabled}
  {onclick}
  type="button"
>
  {#if mark}
    <span class="cell__mark">{emoji}</span>
  {/if}
</button>

<style>
  .cell {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    min-height: 0;
    background: color-mix(in srgb, var(--text) 4%, transparent);
    border: 1px solid var(--border);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
    padding: 0;
  }

  .cell:hover:not(.cell_filled):not(.cell_disabled) {
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
    transform: scale(1.03);
  }

  .cell_filled {
    cursor: default;
  }

  .cell_disabled {
    pointer-events: none;
  }

  .cell_win {
    background: color-mix(in srgb, var(--win) 15%, transparent);
    border-color: var(--win);
    box-shadow: 0 0 24px color-mix(in srgb, var(--win) 35%, transparent);
    animation: pulse-win 0.6s ease;
  }

  .cell__mark {
    font-size: clamp(1.6rem, 8vw, 2.8rem);
    line-height: 1;
    animation: pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: block;
    width: 1.2em;
    height: 1.2em;
    text-align: center;
  }

  @keyframes pop {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes pulse-win {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.06);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
