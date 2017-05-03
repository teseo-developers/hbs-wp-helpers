var colSizes = {
    colXs: 767,
    colSm: 768,
    colMd: 992,
    colLg:1200
}

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
    srcSizes: function(colXs,colSm,colMd,colLg){
        return ' sizes=" '+
            ' (max-width:767px) '+ (767/(12/colXs)) +'px,' +
            ' (min-width:768px) '+  (768/(12/colSm)) +'px,'+
            ' (min-width:992px) '+  (992/(12/colMd)) +'px,'+
            ' (min-width:1200px) ' ; (1200/(12/colLg)) +'px' + ';"';
    }
};

exports.setColSizes = function(colXs,colSm,colMd,colLg){
    colSizes = {
        colXs: colXs,
        colSm: colSm,
        colMd: colMd,
        colLg: colLg
    }
}

exports.registerHelper = function(hbs){
    for(var key in helpers){
        hbs.registerHelper(key, helpers[key]);
    }
}