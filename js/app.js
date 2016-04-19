angular.module("youtukeApp", ["ngCookies", "ui.sortable", "youtukeApp.data.srvs", "youtukeApp.plst.srvs", "youtukeApp.filters", "youtukeApp.ctrl"])
    .run(function () {
        var tag = document.createElement('script');
        tag.src = "http://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });