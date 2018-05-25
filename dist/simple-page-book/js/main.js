var styleDufault = {};
styleDufault['title'] = getStyleDufault('title');
styleDufault['subtitle'] = getStyleDufault('subtitle');
styleDufault['author'] = getStyleDufault('author');

$(window).on('load', function () {
    $( window ).resize(function() {
        setSize();
    });

    $('.header-bg').backgroundBlur({
        imageURL : $(".book-cover img").attr('src'),
        blurAmount : 40,
        imageClass : 'bg-blur'
    });

    setSize();
    notLifeSort();
});


function setSize() {
    var h_buy_buttons = $(".button-box").height();
    var h_book_desc = $(".book-cover img").height();
    var book_cover = $(".book-cover").height();
    var h_text_box = h_book_desc - h_buy_buttons;

    if ($(window).width() > 700) {
        $(".text-box").height(h_text_box);
        $(".book-desc").height(h_book_desc).css("margin-top", (book_cover - h_book_desc) / 2 + "px")
            .css("margin-bottom", (book_cover - h_book_desc) / 2 + "px");
    } else {
        $('.book-desc').height('auto');
        $('.text-box').height('auto');
    }

    if( $(window).width() > 700 && h_text_box < 320 ) {
        fontFit(h_text_box);
    } else {
        applyStyleDufault();
    }

    $(".bg-blur, .header-bg").height($("header").height());
}

function notLifeSort() {
    $.each( $(".not-life"), function( key, value ) {
        $(".button-box ul").append( value );
    });
}

function resizeOnePercent(classname, percent) {
    $("."+ classname).css("font-size", parseFloat( $("."+ classname).css("font-size") ) * percent + 'px')
        .css("line-height", parseFloat( $("."+ classname).css("line-height") ) * percent + 'px')
        .css("margin-bottom", parseFloat( $("."+ classname).css("margin-bottom") ) * percent + 'px')
}

function fontFit(h_text_box) {
    var p = 1, i = 0;
    while( Math.abs($(".wrap-text-box").height() - h_text_box) > 15 && i < 1000) {
        $(".wrap-text-box").height() > h_text_box ? p = 0.99 : p = 1.01;
        resizeOnePercent('title', p);
        resizeOnePercent('subtitle', p);
        resizeOnePercent('author', p);
        i++;
    }
}

function getStyleDufault(classname) {
    var style = {};
    style['font-size'] = $("."+ classname).css("font-size");
    style['line-height'] = $("."+ classname).css("line-height");
    style['margin-bottom'] = $("."+ classname).css("margin-bottom");
    return style;
}

function applyStyleDufault() {
    for (classname in styleDufault) {
        for (prop in styleDufault[classname]) {
            $("." + classname).css(prop, styleDufault[classname][prop]);
        }
    }
}