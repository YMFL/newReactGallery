## 代码示例

建立本地的例子,运行:
```
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
mkdir filename && cd filename
yo react-webpack 
```
4.添加less编译环境
```
npm install less-loader --save-dev
```
