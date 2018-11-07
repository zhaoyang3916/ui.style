
## 使用方法

安装ui.style：
```base
bower install ui.style
```
引用模块
```js
angular.module('app', [ui.style])
```
实例
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
