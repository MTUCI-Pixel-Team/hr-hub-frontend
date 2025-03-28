# HR Hub
![image](https://github.com/user-attachments/assets/d23908ec-f042-4baa-9fd2-d8803255f15a)

**HR Hub** — это веб-приложение, которое помогает HR-специалистам отслеживать сообщения со всех популярных мессенджеров в одном месте. Новые сообщения автоматически парсятся и отображаются на сайте, а функционал управления пользователями позволяет структурировать информацию по отдельным кандидатам и их активности в разных сервисах.

---

## Функционал

- **Отслеживание сообщений**: Получение сообщений с различных мессенджеров в реальном времени.
- **Структурирование пользователей**: Добавление и управление пользователями, связанных с конкретными сервисами.

---

## Технологии

Проект построен с использованием следующих технологий:

- **Архитектура**: FSD (Feature-Sliced Design) для структурирования кода.
- **Библиотеки**:
  - **React**: Основной фронтенд-фреймворк.
  - **TypeScript**: Для типизации и повышения надежности кода.
  - **Zustand**: Легковесное управление состоянием.
  - **TanStack Query**: Работа с серверными данными (fetching, caching, синхронизация).
  - **shadcn**: UI-компоненты, базирующиеся на Radix UI и Tailwind CSS.
  - **React Hook Form**: Библиотека для работы с формами в React-приложениях, которая позволяет упростить валидацию и управление состоянием форм.
- **CI/CD**:
  - **GitHub Actions**: Автоматизация тестирования и деплоя.
- **Контейнеризация**:
  - **Docker**: Упаковка приложения для простого развертывания.

---

## Установка и запуск

### 1. Клонируйте репозиторий

```
git clone https://github.com/MTUCI-Pixel-Team/hr-hub-frontend.git
cd hr-hub-frontend
```
### 2. Установите зависимости
```
npm install
```
### 3. Запуск приложения
```
npm run dev
```

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
