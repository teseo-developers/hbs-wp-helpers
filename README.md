# hbs-wp-helpers 

Handlebars helpers for rendering responsive images in posts while using [Wordpress API V2](https://www.npmjs.com/package/wpapi).

Passing post's media object and bootstrap column sizes:
```handlebars
<img src="/images/if-no-image.jpg" class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
     srcset="{{{srcSet post._embedded.wp:featuredmedia.0. }}}""
     sices="{{{srcSizes 12 6 4 3}}}">
```
will render into:
```html
<img
    src="http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1.jpg"
    srcset="
        http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1-150x150.jpg 150w,
        http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1-300x225.jpg 250w,
        http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1-600x600.jpg 200w,
        http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1-1280x720.jpg 320w "
    sizes="
        (max-width:767px) 383.5px,
        (min-width:768px) 256px,
        (min-width:992px) 330.6666666666667px,
        (min-width:1200px) 400px;" >
```


## Installation

```sh
npm install hbs-wp-helpers --save
```
## Usage
Just declare it. It registers helpers to handlebars.
```javascript
hbsWpHelpers  = require('hbs-wp-helpers');
```
## Helpers

### srcSet
Generates the html attribute *srcset* to an *img* by parsing the "featured_media" object from a post.
Input:
```javasctipt
srcSet(postMediaObject)
```
Output:
```html
<img src="http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/fullsize.jpg"
srcset="[image-small-size-path]  [small-size]w,
        [image-medium-size-path] [medium-size]w,
        [image-large-size-path]  [large-size]w">
```
### srcSetByHeight
Same as `srcSet` but uses height values.

### srcMediaFitsHeight & srcMediaFitsWidth
Takes the closest image that covers the height/width passed as param:
```javasctipt
srcMediaFitsHeight(300px, postMediaObject)
```

### srcSizes
Generates the html attribute *sizes* to an *img* by giving the number of columns occuped in the grid.
Input:
```javasctipt
srcSizes(col-xs,col-sm,[...])
```
Output:
```html
<img src="http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/fullsize.jpg"
sizes=" (max-width:767px) [pixels-col-xs-passed]px,
        (min-width:768px) [pixels-col-sm-passed]px,
        ...
        ">
```
## Custom media queries
You can define custom media queries. Default values are bootstrap sizes [767,768,992,1200].

```javascript
 //First argument is an array of media quieries in pixels, first argmuent is a max media qu and next are min:
 //Second argument is the total number of columns of the grid, bootstrap and skeleton use 12, other may use 16.
hbsWpHelpers.setColSizes([100,500,2000],16);
...
 {{{srcSizes 16 8 4}}}>
```
Then:
```html
sizes="
        (max-width:100px) 100px,
        (min-width:500px) 250px,
        (min-width:2000px) 500px;" >
```

## Dependencies

- [express-hbs](https://github.com/barc/express-hbs): Express 3 handlebars template engine complete with multiple layouts, partials and blocks.

## License

ISC
