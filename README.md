# client

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

#### Noop login

To bypass the OAuth authentication, the custom http header `X-Custom-User` can be set
with the attributes `email`, `name` and/or `provider`. With this data the back-end will
try to create or find a user.

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
