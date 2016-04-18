angular.module("youtukeApp.plst.srvs", [])
    .service("playList", ["fetchData", "$window", "$log", "$cookies", "$rootScope", function(fetchData, $window, $log, $cookies, $rootScope) {

        // reference for playList service
        var box = this;

        // reference point for Youtube player
        var jukebox = {
            player: null,
            playList: [],
            cookies: null,
            relatedPlaylist: [],
            listCtrl: null,
            currentIndex: 0,
            nowPlaying: null,
            status: false,
            pbStatus: 'pause'
        };

        // checking if the cookie is set
        (function visitorCheck () {
            if ($cookies.get("playList") == undefined) {
                $log.info("Welcome!!!");
                // if not set, create a new cookie
                $cookies.put("playList");
            } else if (typeof $cookies.get("playList") == "string" && $cookies.get("playList").length > 1) {
                $log.info("Welcome Back!!!");
                // if set, retrieve the playlist from the cookie
                jukebox.playList = JSON.parse($cookies.get("playList"));
            }
        })();

        // checking whether the playlist already contains the target video
        this.playListCtrl = function (source, target, exit) {
            for (var i = 0; i < source.length; i++) {
                var srcObj;
                if (source.length == 1) {
                    srcObj = source[i];
                } else if (source.length > 1) {
                    srcObj = {
                        id: source[i].id.videoId,
                        title: source[i].snippet.title
                    };
                }
                // check if an object in source is already in target's objects
                var tarObj = target.find(function (obj) {
                    return obj.id === srcObj.id;
                });

                if (!tarObj) {
                    jukebox.listCtrl = true;
                    target.push(srcObj);
                    if (exit) {
                        // when only one video from the related videos is added
                        break;
                    }
                } else {
                    jukebox.listCtrl = false;
                }
            }
        };

        // add a video to the playlist
        this.addtoList = function (id, title) {
            // create an object for a new video to be added
            var newVideo = [{
                id: id,
                title: title
            }];
            if (jukebox.playList.length === 0) {
                // just push it and queue the video
                // only if there is nothing in the playlist
                jukebox.playList.push(newVideo[0]);
                jukebox.player.cueVideoById(id);
            } else if (jukebox.playList.length > 0) {
                // check the playlist and add a video
                // only when it's not in the playlist
                box.playListCtrl(newVideo, jukebox.playList, true);
            }
            // a new video is added, update the cookie with a new playlist
            $cookies.put("playList", JSON.stringify(jukebox.playList));
        };

        // start playing the video
        this.startPlaying = function (id, title) {
            // update the current index value
            // to keep track where we are in the playlist
            for (var i = 0; i < jukebox.playList.length; i++) {
                if (jukebox.playList[i].id === id) {
                    jukebox.currentIndex = i;
                    break;
                }
            }
            // start the video
            jukebox.player.loadVideoById(id);
            // update the video title in the view
            jukebox.nowPlaying = title;
            // update the cookie with a new playlist
            $cookies.put("playList", JSON.stringify(jukebox.playList));
            lapse = 0;
        };

        // remove the video from the playlist
        this.removefromList = function (id) {
            for (var i = 0; i < jukebox.playList.length; i++) {
                if (jukebox.playList[i].id === id) {
                    jukebox.playList.splice(i, 1);
                    break;
                }
            }
            // update the cookie with a new playlist
            $cookies.put("playList", JSON.stringify(jukebox.playList));
        };

        // playback controls
        this.pauseVideo = function () {
            jukebox.player.pauseVideo();
            jukebox.pbStatus = 'pause';
        };
        this.playVideo = function () {
            jukebox.player.playVideo();
            jukebox.pbStatus = 'playing';
        };
        this.nextVideo = function () {
            box.startPlaying(jukebox.playList[jukebox.currentIndex+1].id, jukebox.playList[jukebox.currentIndex+1].title);
        };
        this.prevVideo = function () {
            if (jukebox.playList[jukebox.currentIndex-1]) {
                box.startPlaying(jukebox.playList[jukebox.currentIndex-1].id, jukebox.playList[jukebox.currentIndex-1].title);
            } else {
                box.startPlaying(jukebox.playList[jukebox.currentIndex[0]].id, jukebox.playList[jukebox.currentIndex[0]].title);
            }
        };

        var lapse = 0;

        this.backward = function () {
            lapse += -5;
            jukebox.player.seekTo(lapse, true);
        };
        this.forward = function () {
            lapse += 5;
            jukebox.player.seekTo(lapse, true);
        };

        // configure the youtube player
        $window.onYouTubeIframeAPIReady = function () {
            jukebox.player = new YT.Player(player, {
                height: "100%",
                width: "100%",
                playerVars: {
                    rel: 0,
                    showinfo: 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        // fire when the player is ready
        function onPlayerReady (event) {
            $log.info("Youtube player is ready.");
            // set the status to true so the buttons in the view work
            jukebox.status = true;
            // if a playlist is returned from the cookies
            // queue the first video in the playlist
            if (jukebox.playList[0]) {
                jukebox.player.cueVideoById(jukebox.playList[0].id);
                jukebox.nowPlaying = jukebox.playList[0].title;
            }
            $rootScope.$apply();
        }

        // fire when the player state changes
        function onPlayerStateChange (event) {
            if (event.data == YT.PlayerState.PLAYING) {
                $log.info("Video starting");
                jukebox.pbStatus = 'playing';
                // whenever a video starts playing, update the related videos for the current video
                fetchData.getRequest(null, 20, null, jukebox.playList[jukebox.currentIndex].id);
                jukebox.relatedPlaylist = fetchData.outputRelatedData();
            } else if (event.data == YT.PlayerState.PAUSED) {
                $log.info("Video paused");
                jukebox.pbStatus = 'pause';
            } else if (event.data == YT.PlayerState.ENDED) {
                $log.info("Video ended");
                jukebox.pbStatus = 'pause';
                if (jukebox.playList[jukebox.currentIndex+1]) {
                    // when the playlist has a next video, start playing
                    box.startPlaying(jukebox.playList[jukebox.currentIndex+1].id, jukebox.playList[jukebox.currentIndex+1].title);
                } else {
                    // if no next video is ready, add a video from related videos to the playlist
                    box.playListCtrl(jukebox.relatedPlaylist, jukebox.playList, true);
                    // start playing the added video
                    box.startPlaying(jukebox.playList[jukebox.currentIndex+1].id, jukebox.playList[jukebox.currentIndex+1].title);
                    // update the cookie with a new playlist
                    $cookies.put("playList", JSON.stringify(jukebox.playList));
                }
            }
            $rootScope.$apply();
        }

        // return the playlist to the controller
        this.displayList = function () {
            return jukebox.playList;
        };

        // return the current video title to the controller
        this.displayNowPlaying = function () {
            return jukebox.nowPlaying;
        };

        // return the video status value
        this.playerStatus = function () {
            return jukebox.status;
        };

        // return playback status
        this.playbackStatus = function () {
            return jukebox.pbStatus;
        };

        // return playListCtrl result for dialog box
        this.listControl = function () {
            return jukebox.listCtrl;
        };
    }]);