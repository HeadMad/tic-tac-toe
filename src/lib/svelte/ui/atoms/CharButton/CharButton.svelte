<script>
  /**
   * @typedef {Object} Props
   * @property {string} emoji
   * @property {string} [title]
   * @property {boolean} [selected]
   * @property {() => void} [onclick]
   */

  /** @type {Props} */
  let { emoji, title = '', selected = false, onclick } = $props()
</script>

<button
  class="char-btn"
  class:char-btn_selected={selected}
  {title}
  {onclick}
  type="button"
>
  {emoji}
</button>

<style>
  .char-btn {
    aspect-ratio: 1;
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    background: color-mix(in srgb, var(--text) 4%, transparent);
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    line-height: 1;
  }

  .char-btn:hover {
    background: color-mix(in srgb, var(--text) 8%, transparent);
    transform: scale(1.06);
  }

  .char-btn_selected {
    border-color: var(--accent);
    background: color-mix(in srgb, var(--accent) 18%, transparent);
    box-shadow: 0 0 20px color-mix(in srgb, var(--accent) 35%, transparent);
    transform: scale(1.08);
  }
</style>
