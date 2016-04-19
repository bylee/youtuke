# YouTuke Music Player
A SPA (Single Page Application) Music Player App that Never Stops Playing, built with AngularJS & Materialize CSS.

## What for ?
Whenever I am tired of listening to songs on my phone or in Google Music, I go to Youtube to listen to a new song.

I search for the first song that comes to my mind and start listening to it. When the song ends, I just play whatever I like the in the related videos section. When there are more than one song that I like in the related videos section, I open a new tab for the other song and listen to it later.

Now I have two tabs for two videos with two lists of related videos. If I keep doing the same thing as above, I will end up with four tabs for four videos with four lists of related videos.

I could, of course, use Youtube's playlist, watch-later, or history feature, but you either have to know what you want to add in advance or have to go to a different page to do the same thing.

In this app, you only need to search and play the video once. The app will automatically generate a playlist that include songs related to the current video without you having to click a thing.

## Key Features
* You can search for a new song without the current video stopping (No page refresh needed).
* A new list of related videos will be generated and loaded whenever a new song starts playing.
* If there is no next song in the playlist, a song from the related videos list will automatically be added to the playlist and start playing.
* Every song you play is automatically saved to the playlist.
* The playlist is automatically saved, and it is retrieved in users' next visit.
* Drag and drop each video in the playlist to change the order.

## Demo
[http://lyndonchun.com/youtuke/](http://lyndonchun.com/youtuke/)

## Features to add in the future
* Fix responsiveness issues with Materialize CSS's collections and grids.
* Additional stylings.
* A page where user can set their preferences for search results and playback controls.
* Dialog boxes for playback control buttons.
* Options for additional playback controls such as shuffle and repeat.