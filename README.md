>  本项目是基于vue2最新实战项目，vue2 +vue-router2 + vuex + axios + better-scroll + sass + es6 +webpack 高仿饿了么app,适合刚开始学习Vue2.0的小伙伴们实战练习。

### 项目技术架构
***
*  vue-cli
*  vue2.0
*  vuex
*  axios
*  vue-router2.0
*  better-scroll
*  sass
*  es6
*  webpack

###项目中已解决的问题
***
*   1、sass引入不生效？
        解决方法：
            a、安装sass-loader：npm install sass-loader --save-dev
            b、安装node-sass：npm install node-sass --save-dev
            c、配置build/webpack.base.conf.js文件，在rules下添加以下配置
                    {
                        test: /\.scss$/,
                        loaders: ['style', 'css', 'sass']
                    }
            d、设置style标签的lang属性为scss

*   2、头部公告栏实现三栏布局且中间多余文字显示省略号
        解决方法：
        a、父级元素添加样式
            
            display:flex;
            flex-flow:row nowrap;
            align-items:center;

        b、在两边的图标元素上设置

            flex: 0 0 auto;
            
        c、在文本元素上设置

            flex:1 1 auto;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
*   3、购物车控制组件中每次点击+号或者减号，左边减号和文本出现抖动现象
        原因：该组件上v-show绑定的是calcFoodSellingCount的值是一个变动的值，每次点击calcFoodSellingCount值的变动都会触发transition动画，从而出现抖动现象，
        修改方法：将calcFoodSellingCount值转化为布尔值：'!!calcFoodSellingCount'
                    <transition name='fade'>
                        <div class='count' v-show='calcFoodSellingCount'>
                            {{calcFoodSellingCount}}
                            <i class='minus' @click='deleteFood(food.name)'>-</i>
                            <span class='text'>{{calcFoodSellingCount}}</span>
                        </div>
                    </transition>
*   4、better-scroll插件引入后的若干问题；
        a、页面无法点击：在实例化better-scroll时需设置click:true；
        b、无法滚动：组件更新时未调用refresh方法
*   5、图片高度自适应问题；
            .parent{
            width: (design-width);
            position: relative;
            overflow: hidden;  //需要触发BFC消除margin折叠的问题
            }
            .parent:after{
            content: '';
            display: block;
            margin-top: 100%; //margin 百分比相对父元素宽度计算
            } 
            img {
            position: absolute;
            top: 0;
            width: 100%;
            }
*   6、使用vuex的commit触发mutations的方法时，传递food和count两个参数，结果在接收端只接受到food，count为undefined;
        原因：mutations只接受两个参数，第一个参数默认为state，第二个参数为基本类型或者对象，如果要传递多个参数，可以使用对象或者数组类型进行包装再传递；
*   7、在vuex的state中使用Map数据时，使用map的set方法添加数据不能响应式变化；
        解决方法：使用数组代替；
*   8、给元素fixed定位，并设置width和height为100%,元素实际却不是相对浏览器窗口定位，而是变成了absolute定位方式；
        原因：当fixed定位的元素的祖先元素中使用transform属性时，该元素就会变成相对该组先元素进行定位；
*   9、购物车小球动画效果：
        实现原理：利用抛物线方程 y= a*x*x + b*x + c,其中a为抛物线的曲率，值越小，抛物线越趋近于直线，项目中我设置a为0.05；然后将鼠标点击的点当作坐标原点
                可算出c=0；然后利用终点的坐标可计算出b的值；运动过程中，小球的x坐标值做匀速运动，可通过deltaX * t/duration来计算(deltaX表示起始点的水平距离，t表示小球已运动的事件)
                y值通过上面的方程计算出来，最终实现小球的抛物线运动；此种方案要求数学知识；
        替代方案：利用CSS3的tranition + transform + js来实现；
###项目中未解决的问题
*   1、better-scroll在组件滚动过程中无法点击问题;
*   2、sass定义的公共变量在main.js中引入时报错问题;
###安装
***
项目地址：（`git clone`）
```shell
git clone https://github.com/hhphhp/eleme
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动服务(http://localhost:8080)

```
npm run dev
```
发布代码

```
npm run build
```
###目录结构
***
<pre>
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── common          // 公共的css js 资源
│   ├── components     // 各种组件
|   |── router          //路由入口文件
|   |── store           //vuex状态管理入口文件
│   ├── App.vue         // 主页面 
│   └── main.js        // Webpack 预编译入口
</pre>

###实现的功能
***
* 商品滚动
* 商品联动
* 加入购物车，移除购物车
* 显示评论 评论筛选
* 图片轮播
* 商品详情  父子组件的通信
* 响应式布局

### 最后
***
* 如果喜欢一定要 star哈!!!（谢谢!!）
* 如果有意见和问题 请在 lssues提出，我会在线解答。
