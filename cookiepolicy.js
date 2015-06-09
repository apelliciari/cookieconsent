/*<script>*/


var inject_gtm = function() {

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

checkZepto;

var checkSetupComplete = function(){
    if (cc.setupcomplete == true){
       
        checkcookie();
        }
    else{
        setTimeout(checkSetupComplete,1000);
    }
};

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

var checkScroll = function(){

    Zepto(window).one('scroll', function() {
                 
                    var check = cc.checkcookie();
                     if (check == false){
                        window.has_accepted_cookie_policy = true;
                        cc.onlocalconsentgiven();
                        //inject_gtm();
                   }

                });
}

var checkClick = function () {
         $("a").each(function(i) {
                    Zepto(this).one('click', function() {
                        var check = cc.checkcookie();
                        if (check == false && $(this).attr('href') != cc.settings.linkInformation) {
                            window.has_accepted_cookie_policy = true;
                            cc.onlocalconsentgiven();
                            //inject_gtm();
                        }

                    });

                });
}

var checkClickMobile = function () {
    
         $("a").each(function(i) {
                    Zepto(this).one('click', function() {
                        var check = cc.checkcookie();
                     
                       if (check == false){
                            window.has_accepted_cookie_policy = true;
                            cc.onlocalconsentgiven();
                           // inject_gtm();
                        }
                       
                    });

                });
}


var checkcookie = function() {

    try {

        var zepto = Zepto;
        var funzioni = Zepto.fn.on;
        var check = cc.checkcookie();
  

        Zepto('.' + cc.settings.classLinkSetting).on('click', function() {
          
            cc.showmodal();
        });

       
        // todo acontrollo per mobile
        if (cc.ismobile == false){

            if (check == false && window.location.href.indexOf(cc.settings.linkInformation)== -1) {
                checkScroll();
                checkClick();

            }
        }

        else{
             
                checkScroll();
                checkClickMobile();

        }


    } catch (e) {

        setTimeout(checkcookie, 1000);


    }



}


// andrebbe fatto controllo su presenza cookie accettati (flag unico)
    $(document).ready(function() {

        checkSetupComplete();

});


//</script>