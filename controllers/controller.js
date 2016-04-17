angular.module("youtukeApp.ctrl", [])
    .controller("youtukeCtrl",["$scope", "$location", "$cookies", "$log", "fetchData", "playList", function ($scope, $location, $cookies, $log, fetchData, playList) {

        // contains data to be seen in the view
        $scope.data = {};

        $scope.pageSize = 5;
        
        $scope.currentPage = 1;
        // change the page
        $scope.changePage = function (newPage) {
            $scope.currentPage = newPage;
        };
        // update the paginatino class
        $scope.changePageClass = function (newPage) {
            return $scope.currentPage == newPage ? "active" : "";
        };

        // value for navigation tab change
        $scope.currentTab = "results";
        // update the currentTab value and change the view
        $scope.navigateResult = function (result) {
            $scope.currentTab = result;
            $location.path("/" + result);
        };
        // apply the class depending on the currentTab value
        $scope.tabClass = function (page) {
            return $scope.currentTab == page ? "active" : "";
        };

        // value for the button to switch between player and playlist
        $scope.whichTab = "player";
        // update the value above
        $scope.changeTab = function (newTab) {
            $scope.whichTab = newTab;
        };
        // apply the class for the clicked tab
        $scope.plstTabClass = function (newTab) {
            return $scope.whichTab == newTab ? "active" : "";
        };
        $scope.playTab = function (newTab) {
            if ($scope.whichTab == newTab) {
                return true;
            }
        };

        // watching the values
        $scope.$watch(function () {
            $scope.data.videos = fetchData.outputData();
            $scope.data.relatedVideos = fetchData.outputRelatedData();
            $scope.nowPlaying = playList.displayNowPlaying();
            $scope.playList = playList.displayList();
            $scope.status = playList.playerStatus();
        });

        // load the initial result page and execute the search
        $scope.makeRequest = function () {
            Materialize.toast('Searching for music...', 500);
            fetchData.getRequest(this.query, 25, "10", null);
            $location.path("/");
            $scope.currentTab = "results";
        };

        // add the video and start playing the video
        $scope.playButton = function (id, title) {
            if ($scope.status) {
                playList.addtoList(id, title);
                Materialize.toast('Added to Playlist!', 1000);
                playList.startPlaying(id, title);
                $location.path("/related");
                $scope.currentTab = "related";
            }
        };
        // just add the video to the playlist
        $scope.addButton = function (id, title) {
            playList.addtoList(id, title);
            Materialize.toast('Added to Playlist!', 1000);
        };
        // start playing the video in the playlist
        $scope.resultPlayButton = function (id, title) {
            if ($scope.status) {
                playList.startPlaying(id, title);
            }
        };
        // remove the video from the playlist
        $scope.removeButton = function (id) {
            playList.removefromList(id);
            Materialize.toast('Video Removed!!!', 1000);
        };
    }]);