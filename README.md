# vue-prerender-demo

vue是一个单页面的应用，这导致一些爬虫和百度无法搜索到。如果你想针对你应用的其中某些页面进行SEO优化，让他们可以被爬虫和百度搜索到，你可以进行预渲染操作，无需使用web服务器实时动态编译html，只需要在构建的时候简单的生成针对特定路由的静态html文件。优点是设置预渲染更简单，并可以将你得前端作为一个完全静态的站点。


### 1.先创建一个简单的vue网站，

首页home    ->     关于页面about   ->    我的页面my

运行后可以看到，首页的网络请求只有一个<div id='app'></div>，没有相应的文字和组件，这对seo非常不友好。


![](https://upload-images.jianshu.io/upload_images/2587882-518119655852b5ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000)



### 2. 然后我们要对某些页面进行SEO的优化。

(1)首先要把router的mode改成history，<br>

(2)安装预渲染的插件：npm install prerender-spa-plugin -D <br>

(3)跟着官网的操作，在生产环境下webpack.prod.conf.js内部引入渲染器 <br>

```Javascript
const PrerenderSPAPlugin = require('prerender-spa-plugin')

const Renderer =PrerenderSPAPlugin.PuppeteerRenderer
```

(4)在plugins中new插件进行一些相关的配置

```Javascript
new PrerenderSPAPlugin({

//你存放的静态资源目录

    staticDir:path.join(__dirname,'../dist'),

//你需要对哪几个路由进行SEO，数组形式，可以多个路由

    routes: ['/','/about'],

//预编译的重要配置

    renderer:new Renderer({

inject: {

foo:'far'

        },

headless:false,

//非常重要，文档事件渲染后调用的事件名，在项目的入口中使用

        renderAfterDocumentEvent:'render-event'

    })

})
````

(5)在main.js中配置mounted

```Javascript
mounted() {

document.dispatchEvent(new Event('render-event'))

}
```
Event内的名字就是你在前面声明的名字。



(6)重新执行打包 npm run build

会发现dist目录已经不一样了。多了个about文件夹

![](https://upload-images.jianshu.io/upload_images/2587882-b1f00529eac5de93.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/430)


运行项目后可以看到

![](https://upload-images.jianshu.io/upload_images/2587882-56e2e4b67afc8371.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000)


已经有了相关的组件显示出来了，这就对SEO优化的预渲染


