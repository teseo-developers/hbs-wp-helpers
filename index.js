var hbs = require('express-hbs');

const modes = {
    vertical: 'v',
    horizontal:'w'
};

var helpers = {
    srcSet: function(media){
        return buildSrcSet( parseMedia(media) , modes.horizontal );
    },
    srcSetByHeight: function(media){
        return buildSrcSet( parseMedia(media) , modes.vertical );
    },
    srcMediaFitsHeight : function(maxSize, media, acf) {
        var sizes;
        if(acf)
            sizes = parseAcfMedia(media);
        else
            sizes = parseMedia(media);
        if(!sizes)
            return;
        var i = 0;
        while(i < sizes.length-1 && sizes[i].height < maxSize){
            i++;
        };
        var src = sizes[i].src;
        // console.log(sizes);
        return src;

    },
    srcMediaFitsWidth : function(maxSize, media, acf) {
        var sizes;
        if(acf)
            sizes = parseAcfMedia(media);
        else
            sizes = parseMedia(media);
        if(!sizes)
            return;
        var i = 0;
        while(i < sizes.length-1 && sizes[i].width < maxSize){
            i++;
        };
        var src = sizes[i].src;
        // console.log(sizes);
        return src;

    },
    safeString: function (data) {
        return new Handlebars.SafeString(data);
    },
    toArray: function(){
        var array =[];
        for(var i = 0; i < arguments.length-1; i++){
            console.log('element',  arguments[i]);
            array.push(arguments[i]);
        }
        return array;
    },
    parseLinksInText: function(str, classes) {
        if(!str.length)
            return str;
        str
            .match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
            .map(function(url){
                str = str.replace(url, '<a href="'+url+'">'+url+'</a>');
                // console.log('Map',url, 'str',str);
            });
        return str;
    },
    pluralize: function(count, singular, plural){
        console.log(count, singular, plural);
        var word =
            (count > 1) ? plural    :
                (count == 0) ? zero      : singular;
        console.log(word);
        return word;
    },
    pagination: function(currentPage, totalPage, size, options) {
        var startPage, endPage, context;

        if (arguments.length === 3) {
            options = size;
            size = 5;
        }

        startPage = currentPage - Math.floor(size / 2);
        endPage = currentPage + Math.floor(size / 2);

        if (startPage <= 0) {
            endPage -= (startPage - 1);
            startPage = 1;
        }

        if (endPage > totalPage) {
            endPage = totalPage;
            if (endPage - size + 1 > 0) {
                startPage = endPage - size + 1;
            } else {
                startPage = 1;
            }
        }

        context = {
            startFromFirstPage: false,
            pages: [],
            next: currentPage+1,
            previous: currentPage-1,
            lastPage: totalPage,
            firstPage: 1,
            endAtLastPage: false,
        };
        if (startPage === 1) {
            context.startFromFirstPage = true;
        }
        for (var i = startPage; i <= endPage; i++) {
            context.pages.push({
                page: i,
                isCurrent: i === currentPage,
            });
        }
        if (endPage === totalPage) {
            context.endAtLastPage = true;
        }

        return options.fn(context);
    }
};

var buildSrcSet = function(srcSet,mode){
    if(!srcSet)
        return '';
    if(!srcSet.length)
        return '';
    var built = '\n';
    srcSet.forEach(function(size,i){
        if(mode == modes.horizontal)
            built+= size.src + ' ' + size.width + mode;
        else
            built+= size.src + ' ' + size.height + mode;
        if(i != srcSet.length-1){
            built += ',\n';
        }
    });
    return built;
};

var parseMedia = function(media){
    if(!media)
        return console.warn('Media is',media);
    if(!media.media_details)
        return console.warn('Media has no details',media);
    var srcSet = [];
    for (var property in media.media_details.sizes) {
        var size = media.media_details.sizes[property];
        srcSet.push({
            width: 	size.width,
            height: size.height,
            src: 	size.source_url
        });
    }
    return srcSet;
};

var parseAcfMedia = function(media){
    if(!media)
        return console.warn('Media is',media);

    var srcSet = [];

    if(media.sizes.thumbnail){
        srcSet.push({
            width: 	media.sizes['thumbnail-width'],
            height: media.sizes['thumbnail-height'],
            src: 	media.sizes.thumbnail
        });
    }
    if(media.sizes.medium){
        srcSet.push({
            width: 	media.sizes['medium-width'],
            height: media.sizes['medium-height'],
            src: 	media.sizes.medium
        });
    }
    if(media.sizes.medium_large){
        srcSet.push({
            width: 	media.sizes['medium_large-width'],
            height: media.sizes['medium_large-height'],
            src: 	media.sizes.medium_large
        });
    }
    if(media.sizes.large){
        srcSet.push({
            width: 	media.sizes['large-width'],
            height: media.sizes['large-height'],
            src: 	media.sizes.large
        });
    }

    return srcSet;
};

/**
 * Regsiter helpers to handlebars.
 */
for(var key in helpers){
    hbs.registerHelper(key, helpers[key]);
}

