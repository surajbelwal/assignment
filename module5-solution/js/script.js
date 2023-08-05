$(function(){ //same as document.addEventListener("DOMContentLoaded")
    $("#navbar-toggler").blur(function(event){
        var screenwidth = window.innerWidth;
        if (screenwidth < 768){
            $("navbarSupportedContent").collapse('hide');
        }
    });
});

(function (global){

    var dc = {};
    var homeHtml = "D:\\Course Era\\bootstrap-5.3.0-dist\\snippet\\home-snippet.html";

    //convinience function for inserting innerHTML for 'select'
    var insertHtml = function(selector,html){
        var targetElem = document.querySelector(selector)
        targetElem.innerHTML = html;
    };
//show loading icon inside element identified as 'selector'
    var showLoading = function(selector){
        var html = "<div class='text-center'>";
        html += "<img src='D:\\Course Era\\Images\\load_icon.gif'></div>";
        insertHtml(selector, html); 
    };
// on page load (before images or css)
    document.addEventListener("DOMContentLoaded",function(event){
        //on first load show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(homeHtml,function(responseText){
            document.querySelector("#main-content").innerHTML = responseText;
        },
        false);
    });
    global.$dc = dc;
}) (window);
