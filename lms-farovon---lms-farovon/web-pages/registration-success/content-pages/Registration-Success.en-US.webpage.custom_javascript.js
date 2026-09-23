let selectedAttendees = [];
let registrationCounter = 0;

 

$(document).ready(function(){

    let courseId = "{{request.params['id'] | xml_escape}}";
    
    var attendeeid= "{{user.contactid}}";
    var selector='.contactimg';
    loadImage(attendeeid,selector);   

    //Get the image
    // Столбец-картинку читаем как /$value: форма «/<столбец>/?size=full» после перехода
    // на явные списки полей Web API трактуется как «все столбцы» и отдаёт 403 (90040101).
    var courseCoverUrl = "/_api/msdynce_courses({{request.params['id']}})/msdynce_entityimage/$value?size=full";
    var courseCoverProbe = new Image();
    courseCoverProbe.onload = function () { $(".image-view").attr("src", courseCoverUrl); };
    courseCoverProbe.src = courseCoverUrl;

    $(".card-body span.date").each(function(){
        var date = moment.utc(this.innerHTML);
        $(this).text(moment(date).local().format("MMMM DD"));
    });

    $(".card-body span.time").each(function(){
        var time = moment.utc(this.innerHTML);
        $(this).text(moment(time).local().format("hh:mm a"));
    });

      

    function loadImage(objectid, selector){
      var imgURL = "";
      var query="/_api/contacts(" + objectid + ")?$select=entityimage";
      webapi.safeAjax({
      type: "GET",
      url: query,
      contentType: "application/json",
      success: function (res, status) {
          if (res.entityimage){
            var imgBaseString = res.entityimage;
            var imgHTML = "";
            imgURL = "data:image/png;base64," + imgBaseString;
            $(selector).attr("src", imgURL);
          }   
        }
      });
    }

    
});