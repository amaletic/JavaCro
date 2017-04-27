(function (eko, $, undefined) {
    eko.cache = (function () {

        const  MODULE_ID = "CahceModule"
        const LOCAL_CACHE_ID = "LocalCahce";
        const DEBUG_ME = true;
        if (DEBUG_ME) {
            console.log(MODULE_ID + " PRESTART");
        }
        getPredavanja = function () {

           //return null;
            var ret = localStorage.getItem(LOCAL_CACHE_ID);
            if (ret != null && !(ret === undefined) && ret != "undefined") 
                {
                    return JSON.parse(ret);
                }


                return null;

            }

        setPredavanja = function (data) {

            localStorage.setItem(LOCAL_CACHE_ID,JSON.stringify( data));

        }

        getPredavanjaCache = function(onSucess) {
            var data = getPredavanja();
            if (DEBUG_ME) {
                console.log(MODULE_ID + ".getPredavanjaCache cache data =" + data);
            }
            if (data != null && !(data === undefined) && data != "undefined") {
                if (onSucess != null) {
                
                    onSucess(data);
                  
                }
                return;
            }
            if (DEBUG_ME) {
                console.log(MODULE_ID + ".getPredavanjaCache server load start");
            }
            eko.serverApi.getPredavanja(function (sucess, data) {

               
                
              //  console.log(MODULE_ID + ".getPredavanjaCache server load end sucess= "+ sucess + " data="+data);
                if (!sucess) {
                    eko.message.showError(eko.message.ERROR_LOADING_CACHE);
                    return;
                } else {
                    setPredavanja(data);
                    if (onSucess != null) {
                        onSucess(data);
                     
                    }
                    return;
                }
            });
        }


        return {
            getPredavanjaCache: getPredavanjaCache,

        };
    })();
}(window.eko = window.eko || {}, jQuery));