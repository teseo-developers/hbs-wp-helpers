var hbs = require('express-hbs');

var colSizes = [767,768,992,1200],
    totalCols =  12;

var modes = {
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
    srcSizes: function(){

        var srcSizes = '\n';
        var options = arguments[arguments.length - 1];
        //Takes the array of arguments, last argument is options so length -2.
        for(var i = 0; i < arguments.length - 1; ++i) { //classic for loop -> performance :)
            if(i == 0)
                srcSizes += '(max-width:';
            else
                srcSizes += '\n,(min-width:';
            srcSizes += colSizes[i]+'px) '+ (colSizes[i]/(totalCols/arguments[i])).toFixed() +'px';

        }
        return srcSizes;

    },
    srcMediaFitsHeight : function(maxSize, media) {
        var sizes = parseMedia(media);
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

exports.setColSizes = function(customColSizes,customTotalCols){
    colSizes = customColSizes;
    totalCols = customTotalCols;
};
