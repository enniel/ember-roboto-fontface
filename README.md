# ember-roboto-fontface

The addon includes the Roboto assets (CSS, Icons) in your project (can be disabled), using [roboto-fontface](https://github.com/choffmeister/roboto-fontface-bower) npm package as source.

## Installation

In your application's directory:

`ember i ember-roboto-fontface`

## Importing Assets

### Importing static CSS Assets

When not using a CSS preprocessor (see below) ember-roboto-fontface will automatically import the static Roboto CSS into your ember-cli build. You can opt out of CSS import by setting the importRobotoCSS option to false in your ember-cli-build.js:

```js
// your-app/ember-cli-build.js

/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
    var app = new EmberApp({
        'ember-roboto-fontface': {
            'importRobotoCSS': false
        }
    });

    return app.toTree();
};
```
### Using CSS preprocessors

ember-roboto-fontface supports [Less](http://lesscss.org) (with [ember-cli-less](https://github.com/gdub22/ember-cli-less)) and [Sass](http://sass-lang.com) (with [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass)) CSS preprocessors:

```css
// app.scss

@import 'ember-roboto-fontface/roboto/sass/roboto-fontface';

body {
  font-family: 'Roboto'
}

```

## Importing the Roboto fonts

By default the fonts is added to your app's dist folder. If you do not want to use it, you can opt out of the font import by setting the importRobotoFonts option to false in your ember-cli-build.js:

```js
// your-app/ember-cli-build.js

/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
    var app = new EmberApp({
        'ember-roboto-fontface': {
            'importRobotoFonts': false
        }
    });

    return app.toTree();
};
```

## Credits

- [Evgeni Razumov](https://github.com/enniel)
- [All Contributors](../../contributors)

##Support

Having trouble? [Open an issue](https://github.com/enniel/ember-roboto-fontface/issues/new)!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
