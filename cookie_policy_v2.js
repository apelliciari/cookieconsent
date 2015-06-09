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

var checksocial = function(){
   
    if(document.cookie.indexOf('cc_social=yes') >-1){

        dataLayer.push({'event' : 'GAevent', 'eventCategory' : 'social_cookie_consent','eventLabel':'yes' });
    }


}
     

var checkSetupComplete = function(){
    if (cc.setupcomplete == true){
        checkcookie();
        }
    else{
        setTimeout(checkSetupComplete,100);
    }
};

var checkZepto = function() {
    try {

        var zepto = Zepto;
        var funzioni = Zepto.fn.on;

        Zepto("#cc-approve-button-thissite").on("click", function() {
            window.has_accepted_cookie_policy = true;
            //inject_gtm();

        });
    } catch (e) {
    
        setTimeout(checkZepto, 1000);
    }
}

var checkScroll = function(){

    Zepto(window).one('scroll', function() {
            //controllo sulla splash se non c'è attivo scroll
    
                    var check = cc.checkcookie();
            
                     if (check == false){
                       
                        if($('#splash').css('display')=='none' || $('#splash').length == 0)

                        {
                        window.has_accepted_cookie_policy = true;
                        cc.onlocalconsentgiven();
                        //dataLayer.push({'event': 'reload on cookie consent', 'eventCategory': 'reload', 'eventAction': 'cookies accepted'});
                       // inject_gtm();
                   }
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
                            //dataLayer.push({'event': 'reload on cookie consent', 'eventCategory': 'reload', 'eventAction': 'cookies accepted'});
                            //inject_gtm();
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

        checksocial();

        if (check == false && window.location.href.indexOf(cc.settings.linkInformation)== -1) {
            checkScroll();
            checkClick();

        }
       


    } catch (e) {

        setTimeout(checkcookie, 100);


    }



}


// andrebbe fatto controllo su presenza cookie accettati (flag unico)
    $(document).ready(function() {

        checkSetupComplete();

});


//</script>