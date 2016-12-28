# ui.style
使用方法
======================
**(1)**获取ui.style：通过运行bower install ui.style 安装 ui.style

**(2)**在你的index.html里面包括ui.style.js 和 ui.style.css

**(3)**添加“ui.style”到主模块的列表

```html
<!doctype html>
<html ng-app="myApp">
<head>
		<link rel="stylesheet" href="ui.tyle/ui.style.css" />
    <script src="ui.style/ui.style.js"></script>
    <script>
        var myApp = angular.module('myApp', ['ui.style']);
    </script>
    ...
</head>
<body>
    ...
</body>
</html>
```
