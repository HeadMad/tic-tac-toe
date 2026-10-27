# Neon Tac

Стильная PWA-версия крестиков-ноликов на **Svelte 5** + **Vite** + **pnpm**.

## Возможности

- Персонажи вместо X/O
- Режим против ИИ (сложный) или вдвоём
- Размеры поля: **3×3**, **4×4**, **5×5**
- Вариант **исчезающих ходов** (старые метки пропадают)
- Счёт побед (localStorage)
- Переключение **тёмной / светлой** темы
- PWA (офлайн)

## Архитектура

Проект следует [atomic-architecture](https://github.com/HeadMad/atomic-architecture):

- Папка-контейнер на каждую сущность
- `index.js` как точка реэкспорта
- Svelte 5 runes only
- Pure JS: 1 функция = 1 файл
- Нативный CSS + design tokens + themes

```
src/
  lib/
    css/          # tokens, resets, themes, global
    js/           # pure utilities (checkWinner, getAiMove, …)
    svelte/
      state/      # .svelte.js модули состояния
      ui/
        atoms/
        molecules/
        organisms/
  App.svelte
  main.js
```

## Локальная разработка

```bash
pnpm install
pnpm dev
```

## Сборка и деплой

Сборка и публикация на **GitHub Pages** выполняются автоматически через GitHub Actions (`.github/workflows/deploy.yml`) при пуше в `main`.

В настройках репозитория: **Settings → Pages → Source: GitHub Actions**.

## Стек

- Svelte 5 (runes)
- Vite 6
- pnpm
- Pure CSS (nesting, color-mix, tokens)
