# apollo-law-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# npm run build之后打开index.html打开之后是空白页面该怎么处理？
修改config/index.js中的build之下的assetsPublicPath: ‘/’,改为assetsPublicPath: ‘./’
HTML5 History模式的原因 解决：// mode: 'history',//将这个模式关闭就好

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
