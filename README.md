# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Git flow

### Основные ветки

**develop:** основная рабочая ветвь. Все новые ветки создаём из неё. Она содержит код, готовый для тестирования.

**release**: содержит стабильный протестированный код. Код в этой ветке всегда готов к деплою на продакшн.

**Нельзя** делать коммиты напрямую в `develop` и `release,` только в свои фичи-ветки (feature branches).

### Ветки и таски

- На каждую задачу создается отдельная ветка. Вся работа над задачей ведется в этой ветке.

- Формат имени ветки: (фича **feature/name**, фикс **fix/name**) и одно или несколько английских слов, описывающих задачу, через дефисы.

- Смердженные ветки удаляются после PR, **но только когда все изменения приняты, проверены и внесены правки.**

- Следующую ветку проекта в идеале нужно создавать после того, как приняли и смерджили предыдущие задачи с одной из основных веток для того, чтобы не переделывать в старых ветках те изменения, которые были внесены на проверке PR.

- Каждый PR должен быть рабочей версией проекта, которую можно запустить или залить на сервер.

- Можно параллельно делать несколько задач и сдавать их сразу несколько, но тогда нужно вносить изменения по одному из PR в каждую ветку из активных задач

### Как писать коммиты

**4 вида коммитов**

`[*]` - рефакторинг\изменения логики, исправление багов

`[+]` - добавление фичи

`[-]` - удаление файла\фичи

`[~]` - правки, не влияющие на логику проекта (например, линтеры)

**В каждом коммите следует писать Reason(R:) и fixed by(FB:)**

**R**: причина коммита, что этот коммит изменил

**FB**: как исправили, каким способом решили проблему

**Пример правильного коммита:**

[~] правки форматирования и lint

R: код был не оптимальным и плохо форматированным

FB: использовал eslint и prettier

### Как оформлять PR

1. **Заголовок**

В заголовке следует назвать реализованный функционал (что было добавлено, кратко). В самом начале надо указать `BUGFIX` (в случае, если были исправления багов) или `FEAT` (добавление нового функционала). Если PR ещё не готов к просмотру, следует пометить его как черновик (Draft).

2. **Описание**

В описании есть два основных пункта:

- Что было сделано (краткое описание основного функционала приложения)

- Отчет о тестировании (описание тестирования конкретного функционала)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
