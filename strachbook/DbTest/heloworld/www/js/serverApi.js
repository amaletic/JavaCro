(function(eko, $, undefined) {
	eko.serverApi = (function() {
  const MODULE_ID="ServerAPI"
	    const SERVER_URL = "http://www.ekonerg.hr/ionic/rs";
	    const LECTURE_LIST = "pn/listj";
	    const DEBUG_ME = false;
  
	reloadCache=function(data)
	{
	
		eko.database.uploadPredavanjeDataToDatabase(data);
	
	}


	getJsonData = function(serviceCode,showError, callback)
	{
	    var jqxhr = $.getJSON(SERVER_URL + "/" + serviceCode, function (data) {
	            if (DEBUG_ME) {
	                console.log(MODULE_ID + "AJAX success");
	            }
	            callback(true, data);
		})
		.fail(function(error) {
			
					console.error( MODULE_ID +" AJAX failed " + error.message);
				});
		
 
	}	
	getPredavanja = function(sucessCallback) {

		getJsonData(LECTURE_LIST, true, function(sucess,data)
		{
		    if (DEBUG_ME) {
		        console.log(MODULE_ID + " result " + sucess);
		    }
		    // $(".data").html(JSON.stringify(data)); 
				
			
				    sucessCallback(sucess,data);
				    //console.log($(".data"))
				   
		
			
		});
		
	};


	
	return {
	    getPredavanja: getPredavanja
		};
	})();
}(window.eko = window.eko || {}, jQuery));