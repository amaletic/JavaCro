(function (eko, $, undefined) {
    eko.predavanja = (function () {

        const MODULE_ID = "PredavanjaModule"
        const DEBUG_ME = true;
      
        console.log(MODULE_ID + " PRESTART");

       
        formatVrijeme=function(data) {
            if (data == null) {
                return "00";
            }
            data = data + "";
            while (data.length < 2) {
                data = "0" + data;
            }
            return data;
        }
        loadEventHadler=function() {
            $(".date-time-tbl").hide();
            $(".tbl-body-container").hide();
            $('.arrow-title').on('click',  function (event) {

                var show = $(this).attr("show");
                if (show == "true") {
                    $(this).closest(".prlu").find(".date-time-tbl").hide();
                 
                    $(this).attr("show", false);

                    $(this).removeClass("icon ion-arrow-left-b");
                    $(this).addClass("ion-arrow-down-b");

                } else {
                    $(this).closest(".prlu").find(".date-time-tbl").show();
                    $(this).attr("show", true);

                    $(this).removeClass("ion-arrow-down-b");
                    $(this).addClass("icon ion-arrow-left-b");
                }
            });

            $('.arrow-time').on('click',  function (event) {

                var show = $(this).attr("show");
                if (show == "true") {

                    $(this).closest(".tbl-body-hdr").find(".tbl-body-container").hide();


 
                    $(this).attr("show", false);
                    $(this).removeClass("icon ion-arrow-left-b");
                    $(this).addClass("ion-arrow-down-b");

                } else {
                    $(this).closest(".tbl-body-hdr").find(".tbl-body-container").show();
                    $(this).attr("show", true);
                    $(this).removeClass("ion-arrow-down-b");
                    $(this).addClass("icon ion-arrow-left-b");
                }
            });



        }

        loadTemplate= function(callback) {
            

            if (ionic.Platform.isAndroid()) {
                url = "/android_asset/www/predavanjeTemplate.html";
            } else {
                url = "../predavanjeTemplate.html";
            }

            $.ajax({
                url: url,
                context: document.body
            }).done(function (data) {
                if (DEBUG_ME) {
                    console.log(MODULE_ID + " Load template done")
                }
                if (callback != null) {
                    callback(data);
                }
            });


        }
        
        buildHtml = function (dataCont,dayList,template)
        {
            var cloned;
            var currentDay;
            var time;
            var currentBody;
            if (DEBUG_ME) {
                console.log(MODULE_ID + " dataSize=" + dayList.length);
            }
            for (var i = 0; i < dayList.length; i++) {
                currentDay = dayList[i];
                cloned = $(template);

                cloned.find(".date-time-title").html(currentDay.dayCode + " (" + currentDay.hrDayName + ")");


                currentBody = cloned.find(".tbl");
                currentBody.empty();

                buldVrijeme(currentDay, template, currentBody);




                cloned.appendTo(dataCont);
            }
        }
        buldVrijeme = function (currentDay,template, currentBody) {


            var currentVrijeme;
            var vrijemeHeaderTemplate;
            var predavanjeTemplate;
            var vrijemeUIRow;
            var predavanjeUIRow;
            var bodyContainer;
            if (currentDay.vrijemeList != null && currentDay.vrijemeList.length > 0) {
                for (var j = 0; j < currentDay.vrijemeList.length; j++) {
                    currentVrijeme = currentDay.vrijemeList[j];
                    if (DEBUG_ME) {
                        console.log(MODULE_ID + " vrijeme=" + currentVrijeme);
                    }
            
                    predavanjeUIRow = $(template).find(".tbl-body-hdr");
                    predavanjeUIRow.empty();
                    vrijemeHeaderTemplate = $(template).find(".tbl-hdr");
                    bodyContainer = $(template).find(".tbl-body-container");
                    bodyContainer.empty();

                    vrijemeHeaderTemplate.find(".hdr-cell2").html(formatVrijeme(currentVrijeme.sat) + ":" + formatVrijeme(currentVrijeme.min));
                 
                    buildPredavanje(bodyContainer, template, currentVrijeme.dvoranaList);
                    vrijemeHeaderTemplate.appendTo(predavanjeUIRow);
                    predavanjeUIRow.appendTo(currentBody);
                    bodyContainer.appendTo(predavanjeUIRow);
                }
            }
        }

        buildPredavanje = function (bodyContainer, template, dvoranaList) {
            if (DEBUG_ME) {
                console.log(MODULE_ID + " dvorana build =" + dvoranaList);
            }
            if (dvoranaList == null || dvoranaList.length == 0) {
                return;
            }
            var currentDvorana;
            var predavanjeTemplate;
            for (var i = 0; i < dvoranaList.length; i++) {
                predavanjeTemplate = $(template).find(".tbl-row");
                currentDvorana = dvoranaList[i];
            
                console.log(currentDvorana);
                predavanjeTemplate.find(".cell1").html(currentDvorana.naziv);
                predavanjeTemplate.find(".cell2").html(currentDvorana.predavanje.naziv);

                predavanjeTemplate.appendTo(bodyContainer);
            }
           
         


        }


        getPredavanjaCache = function() {

            eko.cache.getPredavanjaCache(function (data) {
                if (DEBUG_ME) {
                    console.log(MODULE_ID + " LOAD START");
                    console.log(data);
                    console.log(MODULE_ID + " LOAD START data="+ data==null);
                }
                if (data == null || data.dayList==null || data.dayList.length == 0) {
                    console.error(MODULE_ID + " Load template no data")
                    return;
                }
                loadTemplate(function(template) {

                    var dataCont = $(".dataCont");

                    buildHtml(dataCont,data.dayList, template);

                   // $(template).appendTo(dataCont);
                    loadEventHadler();
                });

            });
        }
        $(document).ready(function () {
            getPredavanjaCache();
        });

      

        return {
        

        };
    })();
}(window.eko = window.eko || {}, jQuery));