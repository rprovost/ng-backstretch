# ng-backstretch

A native Angular directive derived from the jQuery Backstretch plugin (http://srobbin.com/jquery-plugins/backstretch)

## Installation

Download the project with Bower:

```javascript
bower install ng-backstretch
```

Include ng-backstretch in your project:

```html
<script src="bower_components/ng-backstretch/dist/ng-backstretch.min.js"></script>
```

Inject the `ng-backstretch` module into your Angular project:

```javascript
angular.module('myApp', ['ng-backstretch']);
```


## Usage
Add the required attributes to any DOM element.

### A single image:
```html
<div backstretch backstretch-images="'http://placehold.it/1600x1600'"></div>
```

### An array of images:
```javascript
angular.module('myAPP')
.controller('myController', function($scope){
  $scope.images = [
    'http://dl.dropbox.com/u/515046/www/garfield-interior.jpg',
    'http://dl.dropbox.com/u/515046/www/outside.jpg',
    'http://dl.dropbox.com/u/515046/www/cheers.jpg'
  ];
});
```

```html
<div backstretch backstretch-images="images"></div>
```

### Slideshow Attributes
A slideshow duration and fade period can be specified through additional directive attributes.

```html
<div backstretch backstretch-images="images" backstretch-duration="5000" backstretch-fade="1"></div>  
```

`backstretch-duration` is specified in milliseconds and defaults to `5000` if none is specified.
`backstretch-fade` is specified in seconds and defaults to `1` if none is specified.
