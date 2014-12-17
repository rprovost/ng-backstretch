# ng-backstretch

A native Angular directive derived from the jQuery Backstretch plugin (http://srobbin.com/jquery-plugins/backstretch)

## Installation

Installation is easy since the only external dependency is AngularJS

When you are done downloading all the dependencies and project files the only remaining part is to add dependencies on the `ui.bootstrap` AngularJS module:

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
