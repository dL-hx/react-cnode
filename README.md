## 基于Antd4 和React-hooks的项目开发

### 项目依赖使用

- react 16.13
- react-redux 7.x
- react-router-dom 5.x
- redux 4.x
- antd 4
- axios
- moment 2.24 (日期格式化)
- qs

### 项目视图说明

- 首页
- 主题详情
- 用户列表
- 用户详情
- 关于

### 配置按需加载

https://3x.ant.design/docs/react/use-with-create-react-app-cn#%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE

`$ yarn add react-app-rewired customize-cra`



## 高级配置[#](https://3x.ant.design/docs/react/use-with-create-react-app-cn#高级配置)

这个例子在实际开发中还有一些优化的空间，比如无法进行主题配置，而且上面的例子加载了全部的 antd 组件的样式（gzipped 后一共大约 60kb）。

此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 [react-app-rewired](https://github.com/timarney/react-app-rewired) （一个对 create-react-app 进行自定义配置的社区解决方案）。

引入 react-app-rewired 并修改 package.json 里的启动配置。由于新的 [react-app-rewired@2.x](https://github.com/timarney/react-app-rewired#alternatives) 版本的关系，你还需要安装 [customize-cra](https://github.com/arackaf/customize-cra)。

```null
$ yarn add react-app-rewired customize-cra
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。

```js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

### 使用 babel-plugin-import[#](https://3x.ant.design/docs/react/use-with-create-react-app-cn#使用-babel-plugin-import)

> 注意：antd 默认支持基于 ES module 的 tree shaking，js 代码部分不使用这个插件也会有按需加载的效果。

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件（[原理](https://3x.ant.design/docs/react/getting-started-cn#按需加载)），现在我们尝试安装它并修改 `config-overrides.js` 文件。

```bash
$ yarn add babel-plugin-import
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```

然后移除前面在 `src/App.css` 里全量添加的 `@import '~antd/dist/antd.css';` 样式代码，并且按下面的格式引入模块。

```diff
  // src/App.js
  import React, { Component } from 'react';
- import Button from 'antd/es/button';
+ import { Button } from 'antd';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      );
    }
  }

  export default App;
```

最后重启 `yarn start` 访问页面，antd 组件的 js 和 css 代码都会按需加载，你在控制台也不会看到这样的[警告信息](https://zos.alipayobjects.com/rmsportal/vgcHJRVZFmPjAawwVoXK.png)。关于按需加载的原理和其他方式可以阅读[这里](https://3x.ant.design/docs/react/getting-started-cn#按需加载)。



### 自定义主题[#](https://3x.ant.design/docs/react/use-with-create-react-app-cn#自定义主题)

按照 [配置主题](https://3x.ant.design/docs/react/customize-theme-cn) 的要求，自定义主题需要用到 less 变量覆盖功能。我们可以引入 `customize-cra` 中提供的 less 相关的函数 [addLessLoader](https://github.com/arackaf/customize-cra#addlessloaderloaderoptions) 来帮助加载 less 样式，同时修改 `config-overrides.js` 文件如下。

```bash
$ npm install less@3.9.0 less-loader@4.1.0 --save-dev
- const { override, fixBabelImports } = require('customize-cra');
+ const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
-   style: 'css',
+   style: true,
  }),
+ addLessLoader({
+   javascriptEnabled: true,
+   modifyVars: { '@primary-color': '#1DA57A' },
+ }),
);
```

这里利用了 [less-loader](https://github.com/webpack/less-loader#less-options) 的 `modifyVars` 来进行主题配置，变量和其他配置方式可以参考 [配置主题](https://3x.ant.design/docs/react/customize-theme-cn) 文档。

修改后重启 `yarn start`，如果看到一个绿色的按钮就说明配置成功了。

> 你也可以使用 [craco](https://github.com/sharegate/craco) 和 [craco-antd](https://github.com/FormAPI/craco-antd) 来实现和 customize-cra 一样的修改 create-react-app 配置的功能。



### * react hooks 中的state使用
```jsx
+   import { useSelector } from 'react-redux'
+   console.log(useSelector(state => state));
+   console.log(useSelector(state => state.topic));

+ // 获取search
+ import qs from 'qs';
+ const { search } = useLocation();
+ const { tab } = qs.parse(search.substr(1))
```

获取地址栏id参数
```jsx
import { useParams } from 'react-router-dom';
let { id } = useParams()
```

获取history对象,返回上一页
```jsx
import { useHistory } from 'react-router-dom';

let history = useHistory()
afterClose={()=>{
    history.goBack()
}}
```

### 配置页面整体布局和响应式处理方案
> 配置通用头部+Footer底部
> <Grid /> 组件基于bootstrap的响应式处理

### 列表实现
### 获取异步数据
> 如何获取异步数据,hooks写法与之前有何不同
> 数据和reducer进行关联
```jsx
let getData = useTopicsList()
let {search} = useLocation()
let {tab, page} = qs.parse(search.substr(1));
useEffect(() => {// 调接口
getData(tab, page)
}, [tab, page]);
// ....

function useTopicsList() {
    const dispatch = useDispatch()
    return function (tab = "dev", page = 1, limit = 20, mdrender = false) {
        dispatch({
            type: 'topics_loading',
        })
        http.get(`/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=${mdrender}`)
            .then(res => {
                dispatch({// 存入state的数据
                    type: 'topics_loadover',
                    data: res.data.data
                })
            })
    }
}


```
![img.png](src/static/img/img.png)

### moment转日期格式
dayjs处理时间
https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
```jsx
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

  {/* 日期内容 */}
  {/* 返回现在到当前实例的相对时间。 */}
  {dayjs(last_reply_at).fromNow()}
```
![Alt text](src/static/img/image.png)


### 分页
>  获取分类,点击分页时,修改地址栏参数(关联)
Pagination组件
```jsx
import React from "react";
import { Pagination } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import qs from 'qs'

// 获取分类,点击分页时,修改地址栏参数(关联)
export default function IndexPagination() {
    // 通过qs获取分类
    let { search } = useLocation();
    let { tab = "all", page = 1 } = qs.parse(search.substr(1));
    return <div className="index-pagination">
        <Pagination
            defaultCurrent={page}
            defaultPageSize={20}
            total={1000}
            showSizeChanger={false}
            itemRender={(page, type) => {
                switch (type) {
                    case 'page':
                        return <Link to={`/?tab=${tab}&page=${page}`}>{page}</Link>
                    case 'prev':
                        return <Link to={`/?tab=${tab}&page=${page}`}> {"<"} </Link>

                    case 'next':
                        return <Link to={`/?tab=${tab}&page=${page}`}> {">"}</Link>
                    default:
                        return <Link to={`/?tab=${tab}&page=${page}`}> {"..."}</Link>

                }
            }}
        />
    </div>
}
```
![Alt text](src/static/img/image1.png)


### 详情
### 封装时间组件
```jsx
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

// 处理时间的组件
export default function FromNow(props){
    let {date} = props
    return dayjs(date).fromNow()
}

```
使用
> `<FromNow date={create_at}/>`
> `<FromNow date={last_reply_at}/>`



### 评论列表组件
```jsx
import React from 'react'
import {Avatar, Card, List, Comment} from "antd";
import {UserOutlined} from "@ant-design/icons";
import FromNow from "../../components/FromNow";
import {Link} from "react-router-dom";

export default function Replies(props) {
    let {data=[], loading} = props
    return <Card
        title="评论列表"
        loading={loading}
        id='replies'
    >
        <List
            dataSource={data}
            renderItem={(itemData) => {
                // console.log(itemData)
                return <List.Item>
                    <Comment
                        author={<Link to={`/user/${itemData.author.loginname}`}>{itemData.author.loginname}</Link>}
                        avatar={<Avatar
                            icon={<UserOutlined/>}
                            src={itemData.author.avatar_url}
                            title={itemData.author.loginname}
                        />}
                        content={<div
                            dangerouslySetInnerHTML={{
                                __html: itemData.content
                            }}
                        />
                        }
                        datetime={<time>发布于: <FromNow data={itemData.create_at}/></time>}
                    />
                </List.Item>
            }}
            pagination={{
                simple: true
            }}
        />
    </Card>
}
```
引用组件
+ `<Replies data={data.replies} loading={loading}/>`
![Snipaste_2023-12-05_23-23-51.png](src%2Fstatic%2Fimg%2FSnipaste_2023-12-05_23-23-51.png)


### 用户详情
![Snipaste_2023-12-05_23-43-25.png](src%2Fstatic%2Fimg%2FSnipaste_2023-12-05_23-43-25.png)