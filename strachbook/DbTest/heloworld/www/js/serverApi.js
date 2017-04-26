

$(function() {

  const MODULE_ID="ServerAPI"
  const SERVER_URL = "http://www.ekonerg.hr/ionic/rs";
  const  LECTURE_LIST="pc/listj";
  


	reloadCache=function(data)
	{
	
		eko.database.uploadPredavanjeDataToDatabase(data);
	
	}


	getJsonData = function(serviceCode,showError, callback)
	{
 		var jqxhr = $.getJSON( SERVER_URL+ "/"+ serviceCode, function(data) {
			console.log(MODULE_ID+ "AJAX success" );
			callback(true, data);
		})
		.fail(function(error) {
					console.log(error);
					console.error( MODULE_ID +" AJAX failed " + error.message);
				});
		
 
	}


	
	getList = function(sucessCallback) {
	
		getJsonData(LECTURE_LIST, true, function(sucess,data)
		{
			if(sucess)
			{
			
			if(sucessCallback!=null)
			{
				sucessCallback(reloadCache(data));
			}
			
			$(".data").html(
				JSON.stringify(data));
			}
		});
		
	};
	
	

  getList(reloadCache);
});