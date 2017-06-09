## 代码示例

建立本地的例子,运行:
```
npm install grunt-cli -g
npm install
grunt serve
```

Then open [`http://localhost:8000/webpack-dev-server/`](http://localhost:8000/webpack-dev-server/) in a browser.



## 项目自动化建立（如果想要自己创建项目，可以参考下面的方法）
1.安装yeoman自动化构建工具
```
npm install -g yo
```
2.安装generator-react-webpack
```
npm install -g generator-react-webpack@1.2.11
```

3.自动化创建
```
//因为'墙'的原因，需要先安装phantomjs
mkdir filename && cd filename
yo react-webpack 
```
4.添加less编译环境（node-sass这个包一直下载不了，所以改用less，需要在webpack中配置）
```
npm install less-loader --save-dev
```
webpack.config.js和webpack.dist.config.js分别将sass的配置修改为以下代码
```jsx harmony
//webpack.config.js和webpack.dist.config.js分别将sass的配置修改为以下代码
{
  test: /\.less/,
  loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!less-loader?outputStyle=expanded'
}
```
