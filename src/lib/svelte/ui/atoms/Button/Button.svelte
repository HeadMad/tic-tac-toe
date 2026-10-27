<script>
  /**
   * @typedef {Object} Props
   * @property {'primary' | 'secondary' | 'icon'} [variant]
   * @property {boolean} [disabled]
   * @property {() => void} [onclick]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let {
    variant = 'primary',
    disabled = false,
    onclick,
    children
  } = $props()
</script>

<button
  class="btn"
  class:btn_primary={variant === 'primary'}
  class:btn_secondary={variant === 'secondary'}
  class:btn_icon={variant === 'icon'}
  {disabled}
  {onclick}
>
  {@render children?.()}
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 24px;
    border-radius: 14px;
    font-family: var(--font);
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .btn_primary {
    background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #000));
    color: #fff;
    box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 40%, transparent);
    width: 100%;
  }

  .btn_primary:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  .btn_secondary {
    background: color-mix(in srgb, var(--text) 6%, transparent);
    color: var(--text);
    border: 1px solid var(--border);
  }

  .btn_secondary:hover:not(:disabled) {
    background: color-mix(in srgb, var(--text) 10%, transparent);
  }

  .btn_icon {
    width: 42px;
    height: 42px;
    padding: 0;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: color-mix(in srgb, var(--text) 5%, transparent);
    font-size: 1.2rem;
  }

  .btn_icon:hover:not(:disabled) {
    background: color-mix(in srgb, var(--text) 10%, transparent);
  }
</style>
