# 3d-filaments — Claude Code Notes

## Стек
- Vite 8 + React 19 + TypeScript 6
- react-i18next для локализации (RU / EN)
- CSS Modules — каждый компонент имеет `styles.module.css` рядом с `index.tsx`
- Деплой на GitHub Pages через `gh-pages`; base URL: `/3d-filaments/`

## Структура src/

```
src/
├── components/
│   ├── Header/           — sticky header + переключатель языка
│   ├── FilamentGrid/     — grid-контейнер, управляет activeId (useState)
│   ├── FilamentCard/     — карточка пластика с барами
│   ├── ProgressBar/      — переиспользуемый анимированный бар
│   └── FilamentDetail/   — панель деталей при клике на карточку
├── constants/
│   └── filaments.ts      — данные 6 пластиков; цвета и значения баров
├── locales/
│   ├── ru/translation.json
│   └── en/translation.json
├── styles/
│   ├── tokens.css        — CSS-переменные (цвета, отступы, радиусы)
│   └── global.css        — reset + body + main layout
├── types/
│   └── filament.ts       — интерфейсы Filament, FilamentTechProps, BarKey
├── i18n.ts               — инициализация i18next
├── App.tsx
└── main.tsx
```

## Соглашения

- Компоненты: PascalCase, папка `ComponentName/index.tsx`
- Стили: CSS Modules (`styles.module.css`), дизайн-токены через CSS-переменные из `tokens.css`
- Переводимые строки — только в `locales/*/translation.json`; данные пластиков хранят i18n-ключи, не сами строки
- Технические значения (температуры °C) не переводятся — хранятся напрямую в `filaments.ts`
- Значения `uv`, `moisture`, `price` в `FilamentTechProps` — это i18n-ключи (`uv.weak`, `price.high` и т.д.)

## Добавить новый пластик

1. Добавить объект в `src/constants/filaments.ts`
2. Добавить переводы в `locales/ru/translation.json` и `locales/en/translation.json` под ключом `filaments.<id>`
3. Выбрать цвет `accent` и сгенерировать `accentDim` как `rgba(..., 0.15)`

## Команды

```bash
npm run dev       # dev-сервер на localhost:5174/3d-filaments/
npm run build     # production build → dist/
npm run preview   # превью собранного dist/
npm run deploy    # деплой на GitHub Pages (запускает build + gh-pages)
```
