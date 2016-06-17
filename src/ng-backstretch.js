/*!
 * ng-backstretch
 * https://github.com/rprovost/ng-backstretch
 *
 * Copyright (c) 2014-2015 Ryan Provost
 * Licensed under the MIT license.
 */
angular.module('ng-backstretch', []).

directive('backstretch', ['$window', '$timeout', function($window, $timeout) {
  return {
    restrict: 'A',
    scope: {
      images: '&backstretchImages',
      duration: '&backstretchDuration',
      fade: '&backstretchFade'
    },
    link: function(scope, element, attributes) {

      /* In its simplest form, we allow Backstretch to be called on an image path.
       * e.g. <div backstretch backstretch-url="'/path/to/image.jpg'">
       * So, we need to turn this back into an array.
       */
      scope.images = Array.isArray(scope.images()) ? scope.images() : [scope.images()];
      scope.duration = scope.duration() || 5000;
      scope.fade = scope.fade() || 0;

      // We need at least one image or method name
      if (scope.images.length === 0) {
        return false;
      }

      /* STYLES
       * 
       * Baked-in styles that we'll apply to our elements.
       * In an effort to keep the plugin simple, these are not exposed as options.
       * That said, anyone can override these in their own stylesheet.
       * ========================= */
      var styles = {
        wrapper: {
          left: 0,
          top: 0,
          overflow: 'hidden',
          margin: 0,
          padding: 0,
          height: '100%',
          width: '100%',
          zIndex: -999998,
          position: 'absolute'
        },
        image: {
          position: 'absolute',
          opacity: 0,
          margin: 0,
          padding: 0,
          border: 'none',
          width: 'auto',
          height: 'auto',
          maxHeight: 'none',
          maxWidth: 'none',
          zIndex: -999999,
          transition: 'all '+scope.fade+'s'
        }
      };

      // create the scope.wrapper element
      scope.wrapper = angular.element('<div class="backstretch"></div>');
      scope.wrapper.css(styles.wrapper);

      scope.images.forEach(function(element, index, array){
        scope.image = angular.element('<img>');
        scope.image[0].src = element;
        scope.image.css(styles.image);

        // append these images to the wrapper
        scope.wrapper.append(scope.image);
      });

      // append the wrapper
      element.append(scope.wrapper);

      // Set the first image
      scope.index = 0;

      scope.load = function(e) {          
        // figure out what the width:height ratio is
        scope.ratio = this.width / this.height;

        // perform an initial sizing
        scope.resize();

        // display the first image
        scope.show(scope.index++);
      };

      scope.resize = function(e) {

        // set some default css
        var background_css = {left: 0, top: 0, width: 'auto', height: 'auto'};

        // set some initial calculations
        var root_width = element[0].offsetWidth,
            background_width = root_width,

            // Check which height-element that should be used
            root_height = element[0].offsetHeight > 0 ? element[0].offsetHeight : element[0].offsetParent.offsetHeight,
            background_height = background_width / scope.ratio,

            background_offset;

        // make adjustments based on image ratio
        if (background_height >= root_height) {
          background_offset = (background_height - root_height) / 2;
          background_css.top = '-' + background_offset + 'px';

        } else {
          background_height = root_height;
          background_width = background_height * scope.ratio;
          background_offset = (background_width - root_width) / 2;

          background_css.left = '-' + background_offset + 'px';
        }

        // set the css for the width and height
        background_css.width = background_width + 'px';
        background_css.height = background_height + 'px';

        // apply the appropriate styles to the wrapper and image
        scope.wrapper.css({ width: root_width, height: root_height });

        for(var i = 0; i < scope.wrapper.children().length; i++) {
          var img = angular.element(scope.wrapper.children()[i]);
          img.css(background_css);
        }
      };

      scope.show = function(index) {

        var element = scope.wrapper.children()[index];
        scope.image = angular.element(element);

        // only one image
        if (scope.images.length === 1) {
          scope.image.css({opacity:1});
          return;
        }

        // bring things back around once we've hit the end
        if (index >= scope.images.length-1) {
          scope.index = 0;
        }

        // show the image since it's finished loading
        scope.image.css({opacity:1});

        // hide it once the duration has been reached
        $timeout(function(){
          scope.image.css({opacity:0});
        }, scope.duration);

        $timeout(function(){
          scope.show(scope.index++);
        }, scope.duration);
      };

      // don't do anything until the image has finished loading
      scope.image.bind('load', scope.load);

      // make sure to update the image sizes when the page scales/changes
      angular.element($window).bind('resize', scope.resize);
    }
  };
}]);
