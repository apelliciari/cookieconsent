/*<script>*/


var inject_gtm = function() {

    console.log("inietto nuovamente il GTM..");

    //inietto di nuovo il GTM
    (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            '//www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-K58HSX');


};

console.log("pre-iniezione listener. versione jquery: " + $.fn.jquery);

checkZepto;

var checkZepto = function() {
    try {

        var zepto = Zepto;
        var funzioni = Zepto.fn.on;


        Zepto("#cc-approve-button-thissite").on("click", function() {
            window.has_accepted_cookie_policy = true;
            inject_gtm();

        });
    } catch (e) {

        setTimeout(checkZepto, 1000);
    }
}


var checkcookie = function() {

    try {

        var zepto = Zepto;
        var funzioni = Zepto.fn.one;
        var check = cc.checkcookie();
        console.log('try check');
        $('.' + cc.settings.classLinkSetting).live('click', function() {
            console.log('apri');
            cc.showmodal();
        });

        if (check == false) {

            Zepto(window).one('scroll', function() {
                //TODO: si potrebbe usare localconsentgiven insieme al controllo sui cookie però
                var check = cc.checkcookie();
                if (check == false) {
                    console.log("scrolled");
                    window.has_accepted_cookie_policy = true;
                    cc.onlocalconsentgiven();
                    inject_gtm();
                }

            });

            $("a").each(function(i) {
                Zepto(this).one('click', function() {
                    var check = cc.checkcookie();
                    if (check == false && $(this).attr('href') != cc.settings.linkInformation) {
                        window.has_accepted_cookie_policy = true;
                        cc.onlocalconsentgiven();
                        inject_gtm();
                    }

                });

            });


        }


    } catch (e) {

        setTimeout(checkcookie, 1000);


    }



}

var

// andrebbe fatto controllo su presenza cookie accettati (flag unico)
    $(document).ready(function() {
    console.log('prima check cookie');
    checkcookie();


});



console.log("iniezione del listener...");
//</script>