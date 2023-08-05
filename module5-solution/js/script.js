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
    var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";
    var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";

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

    var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") === -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};


function buildAndShowMenuItemsHTML (categoryMenuItems) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    menuItemsTitleHtml,
    function (menuItemsTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        menuItemHtml,
        function (menuItemHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive();

          var menuItemsViewHtml =
            buildMenuItemsViewHtml(categoryMenuItems,
                                   menuItemsTitleHtml,
                                   menuItemHtml);
          insertHtml("#main-content", menuItemsViewHtml);
        },
        false);
    },
    false);
}


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
