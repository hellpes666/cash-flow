# Cash Flow Backend

Backend Cash Flow — это сервис управления личными финансами, отвечающий за доменную логику (пользователи, транзакции, категории, счета), валидацию данных и выдачу агрегированной информации для фронтенда.

## Архитектура и подходы

- NestJS как основной фреймворк: модульная архитектура с разделением по доменам (Auth, Users, Accounts, Transactions, Categories, Analytics и т.д.).
- Слой контроллеров (Controllers) принимает HTTP‑запросы, отвечает за маршрутизацию и маппинг входных/выходных DTO.  
- Слой сервисов (Services) инкапсулирует бизнес‑логику: создание и изменение сущностей, расчёт агрегатов (баланс, итоги по периодам, статистика по категориям), подготовка данных для дашбордов. 
- Слой доступа к данным реализован через ORM (например, Prisma) или репозитории, что обеспечивает прозрачную работу с БД и облегчает тестирование. 

## Основные домены

- Пользователи (Users): регистрация, аутентификация, профили, настройки.
- Счета (Accounts): кошельки, карты и другие источники/хранилища денег, используемые при учёте операций. 
- Транзакции (Transactions): доходы и расходы с привязкой к счёту, категории, дате и дополнительным метаданным.
- Категории (Categories): иерархия категорий расходов/доходов для более точного анализа cash flow. 
- Аналитика (Analytics): агрегированные выборки и расчёты (итоги за период, графики движения денег, ключевые метрики). 

## Паттерны и практики

- Dependency Injection: стандартный DI NestJS для слабой связанности модулей и удобной подмены реализаций (например, репозиториев или адаптеров). 
- Layered Architecture: разделение на слои (контроллеры → сервисы → слой данных) для читаемости и тестируемости.
- DTO и валидация: входные и выходные данные описаны через DTO, валидация выполняется пайпами (class-validator / class-transformer), что защищает API и упрощает контракт между фронтом и бэком. 
- Error Handling: централизованная обработка ошибок (HTTP‑фильтры, глобальные фильтры/интерсепторы) для единообразного формата ответов при ошибках. 
- Конфигурация: использование конфигурационного модуля для работы с переменными окружения (ключи БД, секреты JWT, флаги окружений и т.п.).

## Безопасность и доступ

- Авторизация и аутентификация через JWT (access/refresh токены) либо session‑подход (в зависимости от выбранной стратегии). 
- Ролевая модель и/или права доступа на уровне маршрутов и доменных операций (guards и декораторы NestJS).
- Логирование и аудит ключевых действий (создание/изменение транзакций, изменение настроек пользователя). 

## Работа с cash flow

- Поддержка разных периодов анализа (день/неделя/месяц/год) для построения графиков и отчётов.
- Расчёт текущего и прогнозируемого баланса на основе истории транзакций и запланированных операций. 
- Подготовка данных для визуализаций на фронтенде (серии точек, агрегаты по категориям, сравнение периодов).



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
