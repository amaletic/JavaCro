(function (eko, $, undefined) {
    eko.message = (function () {

        const  MODULE_ID = "MessagingModule"
        const LOCAL_CACHE_ID = "LocalCahce";
        const DEBUG_ME = false;
        if (DEBUG_ME) {
        console.log(MODULE_ID + " PRESTART");
           }
       
        showError = function (data) {

           alert(data);


        }

        return {
            showError: showError,


            ERROR_LOADING_CACHE : "Gre�ka kod u�itavanja podataka. Poku�ajte ponovno"

        };
    })();
}(window.eko = window.eko || {}, jQuery));