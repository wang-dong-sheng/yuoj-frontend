# yuoj-frontend

## 根据后台生成代码

```shell
openapi --input http://localhost:8101/api/user/v2/api-docs?group=default --output ./generated/services/user --client axios
openapi --input http://localhost:8101/api/question/v2/api-docs?group=default --output ./generated/services/question --client axios
openapi --input http://localhost:8101/api/judge/v2/api-docs?group=default --output ./generated/services/judge --client axios


```


## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
