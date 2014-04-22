var buswatch = {};
buswatch.app = {
    // Application Constructor
    initialize: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        FastClick.attach(document.body);
        document.addEventListener('backbutton',handleBackButton);
    }


};

function handleBackButton() {
    var currentPageId = $.mobile.activePage.attr('id');

    if(currentPageId != 'home') {
        $.mobile.changePage("index.html", {
            transition : "slide",
            reverse : true,
            changeHash : false
        });
    }else{
        var message = "Are you sure?";
        var title = "Exit App";
        var buttons = "OK,Cancel";
        navigator.notification.confirm(message,
            function(r) {
                console.log("You selected " + r);
                if(r==1) {
                    navigator.app.exitApp();
                }
            },
            title,
            buttons);
    }
}


function getRoutes() {
var url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=stl';

$.ajax({
    type: "GET",
    url: url,
    dataType: "xml",
    success: xmlParser
});
}

function xmlParser(xml) {

    $(xml).find("route").each(function () {
        //alert($(this).attr("title"));
        $("#output").append($(this).attr("title") + "<br />");
    });
}