# ng-backstretch

A native Angular directive derived from the jQuery Backstretch plugin (http://srobbin.com/jquery-plugins/backstretch)

## Installation

Installation is easy since the only external dependency is AngularJS

When defining your AngularJS project, all you need to do is inject the `ng-backstretch` module into your Angular project:

```javascript
angular.module('myModule', ['ng-backstretch']);
```

Project files are also available through your favourite package manager:
* **Bower**: `bower install ng-backstretch`

## Usage
Simply add the required directive attributes to any DOM element.

```html
<div backstretch backstretch-url="http://placehold.it/1600x1600"></div>
```
