var hbs = require('express-hbs');

var colSizes = [767,768,992,1200],
    totalCols =  12;

var helpers = {
    srcSet: function(media){
        if(!media)
            return;
        if(!media.media_details)
            return;
        var buildSrcSet = function(srcSet){
            var built = '\n';
            srcSet.forEach(function(size,i){
                built+= size.src + ' ' + size.width + 'w';
                if(i != srcSet.length-1){
                    built += ',\n';
                }
            });
            return built;
        };

        var srcSet = [];
        for (var property in media.media_details.sizes) {
            var size = media.media_details.sizes[property];
            srcSet.push({
                width: 	size.width,
                src: 	size.source_url
            });
        }
        return buildSrcSet(srcSet);
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

    }
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
