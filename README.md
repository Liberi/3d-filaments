# 3D Filaments Guide

Интерактивный справочник по пластикам для 3D-печати. Сравнивает PLA, PETG, ABS, ASA, TPU и Nylon по ключевым характеристикам.

[**Открыть сайт →**](https://Liberi.github.io/3d-filaments/)

## Возможности

- Карточки с визуальными шкалами прочности, гибкости, жёсткости и других параметров
- Клик по карточке раскрывает плюсы, минусы, технические характеристики и области применения
- Переключение интерфейса между **русским** и **английским** языком
- Адаптивный дизайн: 3 / 2 / 1 колонка в зависимости от ширины экрана

## Технологии

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/) — сборщик
- [react-i18next](https://react.i18next.com/) — локализация
- CSS Modules — изолированные стили компонентов
- [GitHub Pages](https://pages.github.com/) — хостинг

## Локальный запуск

```bash
git clone https://github.com/Liberi/3d-filaments.git
cd 3d-filaments
npm install
npm run dev
```

Откроется на `http://localhost:5173/3d-filaments/`

## Деплой

```bash
npm run deploy
```

Сборка публикуется в ветку `gh-pages` и становится доступна на GitHub Pages.

## Структура проекта

```
src/
├── components/     # React-компоненты (каждый в отдельной папке)
├── constants/      # Данные пластиков
├── locales/        # Переводы RU / EN
├── styles/         # Глобальные стили и дизайн-токены
└── types/          # TypeScript-интерфейсы
```
