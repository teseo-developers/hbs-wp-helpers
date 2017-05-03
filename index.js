var colSizes = [767,768,992,1200],
    totalCols =  12;

var helpers = {
    srcSet: function(media, defaultImg){
        var buildSrcSet = function(src,srcSet){
            var built = '';
            if(src)
                built += 'src="' + src + '"';
            if(srcSet){
                built += ' srcset="';

                srcSet.forEach(function(size,i){
                    built+= size.src + ' ' + size.width + 'w';
                    if(i != srcSet.length-1){
                        built += ',';
                    }
                });
                built += ' " ';
            }
            return built;
        };

        if(!media)
            return buildSrcSet(defaultImg /*, noSrcSet*/);
        if(!media.media_details)
            return buildSrcSet(media.source_url /*, noSrcSet*/);

        var srcSet = [];
        for (var property in media.media_details.sizes) {
            var size = media.media_details.sizes[property];
            srcSet.push({
                width: 	size.width,
                src: 	size.source_url
            });
        }
        srcSet.push({
            width: 	media.media_details.width,
            src: 	media.source_url
        });

        return buildSrcSet(media.source_url, srcSet);
    },
    srcSizes: function(){

        var srcSizes = ' sizes=" ';
        var options = arguments[arguments.length - 1];
        //Takes the array of arguments, last argument is options so length -2.
        for(var i = 0; i < arguments.length - 1; ++i) { //classic for loop -> performance :)
            if(i == 0)
                srcSizes += '(max-width:'+colSizes[i]+'px) '+ (colSizes[i]/(totalCols/arguments[i])) +'px';
            else
                srcSizes += ',(min-width:'+colSizes[i]+'px) '+ (colSizes[i]/(totalCols/arguments[i])) +'px';

        }
        srcSizes += ';"'
        return srcSizes;

    }
};

module.exports = {
    init: function(hbs){
        for(var key in helpers){
            hbs.registerHelper(key, helpers[key]);
        }
    },
    setColSizes : function(customColSizes,customTotalCols){
        colSizes = customColSizes;
        totalCols = customTotalCols;
    }
};
