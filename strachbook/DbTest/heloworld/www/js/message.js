﻿(function (eko, $, undefined) {
    eko.message = (function () {

        const MODULE_ID = "MessagingModule"
        const LOCAL_CACHE_ID = "LocalCahce";
        const DEBUG_ME = false;
        if (DEBUG_ME) {
            console.log(MODULE_ID + " PRESTART");
        }

        showError = function (data) {

		angular.element(document.getElementById('appControler')).scope().showAlert(data);
		
	


        },

        showLoading =function()
        {
            	$(".spinner").show();
                $(".tab-content").hide();
                //$(".tab-content")
                
                
        }
        hideLoading =function()
        {
            //	.hide(); 
                $(".tab-content").show();
        }
        return {
            showError: showError,
            showLoading: showLoading,
            hideLoading : hideLoading,

            ERROR_TITLE: "Greška",
            ERROR_LOADING_CACHE: "Provjerite internet konekciju",
            HIDE_NOT_FAVORITE: "Sakriti neoznačene",
            SHOW_NOT_FAVORITE: "Prikaži i neoznačene",
            HIDE_PASSED: "Sakriti prošle",
            SHOW_PASSED: "Show prošle"

        };
    })();
} (window.eko = window.eko || {}, jQuery));