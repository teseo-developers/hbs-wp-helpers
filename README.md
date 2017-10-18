# hbs-wp-helpers 

Handlebars helpers for rendering responsive images in posts while using [Wordpress API V2](https://www.npmjs.com/package/wpapi).

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
{{srcSet postMediaObject}}
```
Example:
```handlebars
<img src="/images/if-no-image.jpg" srcset="{{{srcSet post._embedded.wp:featuredmedia.0. }}}">
```
Output:
```html
<img
    src="http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1.jpg"
    srcset="
        http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1-150x150.jpg 150w,
        http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1-300x225.jpg 250w,
        http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1-600x600.jpg 200w,
        http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1-1280x720.jpg 320w ">
```

### srcSetByHeight
Same as `srcSet` but uses height values.

### srcMediaFitsHeight / srcMediaFitsWidth
Takes the closest image that covers the height/width passed as param:
```handlebars
{{srcMediaFitsWidth 200 post._embedded.wp:featuredmedia.0.}}
```
Output:
```html
http://your-wordpress-site.com/wp-content/uploads/sites/2/2017/03/My-Image-1-300x225.jpg
```
### srcMediaFitsHeightAcf / srcMediaFitsWidthAcf
The same as srcMediaFitsHeight / srcMediaFitsWidth but passing custom field's (acf) media as param.

### parsePost (post)
Embeds post object as using Handlebars builtin helper *#with* with some useful new variables:
#### media
Contains the post media reference `post._embedded.wp:featuredmedia.0.` for a smarter code when calling image helpers:
```handlebars
    {{parsePost post}}
        {{title}}
        {{#if media}}
            <img 
                src="{{srcMediaFitsWidth 200 media}}" 
                src-set="{{srcSet media}}">
        {{/if}}
    {{/parsePost}}
``` 
instead of 
```handlebars
    <h1>{{post.title}}</h1>  
    {{#if post._embedded.wp:featuredmedia.0.source}}
        <img 
            src="{{srcMediaFitsWidth 200 post._embedded.wp:featuredmedia.0.}}" 
            src-set="{{srcSet post._embedded.wp:featuredmedia.0.}}">
    {{/if}}
``` 



###toArray
Converts passed params to array:
 ```handlebars
 {{toArray param1 param2 param3}}
 ```
 Output:
```javascript
[param1, param2, param3]
```

### parseLinksInText
Parses urls from text and converts them to <a> tag.
```handlebars
{{parseLinksInText 'My url is http:example.com' 'myClass'}}
```
Output:
```HTML
 My url is <a class="myClass" href="http:example.com">http:example.com</a>
```

### pluralize
Renders singular or plural word depending on the count passed as param.
```handleabrs
{{pluralize count, singular, plural}}
```
Example:
```handleabrs
<span>{{pluralize 5, 'banana', 'bananas'}}</span>
```
Output:
```html
<span>bananas</span>
```

### pagination
Sets the variables needed for the pagination nav.

Example: 
```handlebars
{{#pagination 7 20 5}}
    <ul>
        {{#unless startFromFirstPage}}
            <li>
                <a href="/news/page/{{firstPage}}">first page</a>
            </li>
            <li>
            <a href="/news/page/{{previous}}">previous</a>
            </li>
        {{/unless}}

        {{#each pages}}
            {{#if isCurrent}}
                <li class="active">
                    <a>{{page}}</a>
                </li>
            {{/if}}
            {{#unless isCurrent}}
                <li>
                    <a href="/news/page/page/{{page}}">{{page}}</a>
                </li>
            {{/unless}}
        {{/each}}

        {{#unless endAtLastPage}}
            <li>
                <a href="/news/page/{{next}}">next page</a>
            </li>
            <li>
                <a href="/news/page/{{lastPage}}">last page</a>
            </li>
        {{/unless}}
    </ul>
{{/pagination}}
```
Output:
```html
<ul>
<li><a href="/news/page/1">first page</a></li>
<li><a href="/news/page/6">last</a></li>
<li><a href="/news/page/5">5</a></li>
<li><a href="/news/page/6">6</a></li>
<li class="active">     <a>7</a></li>
<li><a href="/news/page/6">6</a></li>
<li><a href="/news/page/7">7</a></li>
<li><a href="/news/page/8">next</a></li>
<li><a href="/news/page/20">last</a></li>
</ul>
```

## Dependencies

- [express-hbs](https://github.com/barc/express-hbs): Express 3 handlebars template engine complete with multiple layouts, partials and blocks.

## License

ISC
