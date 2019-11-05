var num = 0;
var hiddenPlayer = $('#hidden-player');
var player = $('#player');
var title = $('.title');
var artist = $('.artist');
var cover = $('.coverr');

function secondsTimeSpanToHMS(s) {
	var h = Math.floor(s / 3600); //Get whole hours
	s -= h * 3600;
	var m = Math.floor(s / 60); //Get remaining minutes
	s -= m * 60;
	return (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s); //zero padding on minutes and seconds
};

songs = [{
		src: "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3",
		title: "Fast Lane Speedin'",
		artist: "Oddisee",
		coverart: "http://static.djbooth.net/pics-features/oddisee-art-thumb.jpg"
	},

	{
		src: "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3",
		title: "Superhuman",
		artist: "Andy Mineo",
		coverart: "http://static.djbooth.net/pics-artist/andy-mineo.jpg"
	},

	{
		src: "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3",
		title: "Wild Things",
		artist: "Andy Mineo",
		coverart: "http://static.djbooth.net/pics-artist/andy-mineo.jpg"
	},

	{
		src: "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3",
		title: "Work Out",
		artist: "J. Cole",
		coverart: "https://s3.amazonaws.com/hiphopdx-production/2014/12/J.-Cole-%E2%80%93-Apparently-e1418166093622-300x300.jpg"
	},

	{
		src: "https://s3-us-west-2.amazonaws.com/live.swipesapp.com/uploads/ONY8E94FL/1514889265-UZTYMBVGO/wild-things-remix.mp3",
		title: "Cocky",
		artist: "Andy Mineo",
		coverart: "http://static.djbooth.net/pics-artist/andy-mineo.jpg"
	}
];

var initSongSrc = songs[0].src;
var initSongTitle = songs[0].title;
var initSongArtist = songs[0].artist;
var initSongCover = songs[0].coverart;

hiddenPlayer.attr("src", initSongSrc);
title.html(initSongTitle);
artist.html(initSongArtist);
cover.css("background-image", "url(" + initSongCover + ")"); 

hiddenPlayer.attr('order', '0');
hiddenPlayer[0].onloadedmetadata = function() {
	var dur = hiddenPlayer[0].duration;
	var songLength = secondsTimeSpanToHMS(dur)
	var songLengthParse = songLength.split(".")[0];
	$('.time-finish').html(songLengthParse);
};

var items = songs.length - 1;

$('.next').on('click', function() {
	var songOrder = hiddenPlayer.attr('order');

	if (items == songOrder) {
		num = 0;
		var songSrc = songs[0].src;
		var songTitle = songs[0].title;
		var songArtist = songs[0].artist;
		var songCover = songs[0].coverart;
        hiddenPlayer.attr('order', '0');
        $(".play-button").addClass("spoticon-pause-16");
	    $(".play-button").removeClass("spoticon-play-16");
		hiddenPlayer.attr('src', songSrc).trigger('play');
		title.html(songTitle);
		artist.html(songArtist);
		cover.css("background-image", "url(" + songCover + ")"); 
	} else {
		console.log(songOrder);
		num += 1;
		var songSrc = songs[num].src;
		var songTitle = songs[num].title;
		var songArtist = songs[num].artist;
        var songCover = songs[num].coverart;
        $(".play-button").addClass("spoticon-pause-16");
	    $(".play-button").removeClass("spoticon-play-16");
		hiddenPlayer.attr('src', songSrc).trigger('play');
		title.html(songTitle);
		artist.html(songArtist);
		cover.css("background-image", "url(" + songCover + ")"); 
		hiddenPlayer.attr('order', num);
	}
});

$('.prev').on('click', function() {
	var songOrder = hiddenPlayer.attr('order');

	if (songOrder == 0) {
		num = items;
		var songSrc = songs[items].src;
		var songTitle = songs[items].title;
		var songArtist = songs[items].artist;
        var songCover = songs[num].coverart;
        hiddenPlayer.attr('order', items);
        $(".play-button").addClass("spoticon-pause-16");
	    $(".play-button").removeClass("spoticon-play-16");
		hiddenPlayer.attr('src', songSrc).trigger('play');
		title.html(songTitle);
		artist.html(songArtist);
		cover.css("background-image", "url(" + songCover + ")"); 
	} else {
		num -= 1;
		var songSrc = songs[num].src;
		var songTitle = songs[num].title;
        var songArtist = songs[num].artist;
        var songCover = songs[num].coverart;
        $(".play-button").addClass("spoticon-pause-16");
	    $(".play-button").removeClass("spoticon-play-16");
		hiddenPlayer.attr('src', songSrc).trigger('play');
		title.html(songTitle);
		artist.html(songArtist);
		cover.css("background-image", "url(" + songCover + ")"); 
		hiddenPlayer.attr('order', num);
	}
});

$(".play-button").click(function() {
	if ($(this).hasClass("spoticon-pause-16")) {
        $(this).removeClass("spoticon-pause-16");
	    $(this).addClass("spoticon-play-16");
    hiddenPlayer[0].pause();
	} else {
        $(this).addClass("spoticon-pause-16");
	    $(this).removeClass("spoticon-play-16");
		hiddenPlayer[0].play();
	}
});

hiddenPlayer.on('timeupdate', function() {
	var songLength = secondsTimeSpanToHMS(this.duration)
	var songLengthParse = songLength.split(".")[0];
	$('.time-finish').html(songLengthParse);

	var songCurrent = secondsTimeSpanToHMS(this.currentTime)
	var songCurrentParse = songCurrent.split(".")[0];
	$('.time-now').html(songCurrentParse);
    var progressValue=(-100+(this.currentTime / this.duration)*100);
    $('.progress').css("transform", "translateX("+progressValue+"%)"); 
	if (!hiddenPlayer[0].paused) {
		$(".play-button").removeClass('paused');
		$('.audio_progress_bar').css('cursor', 'pointer');
		
		
		$('.audio_progress_bar').on('click', function(e) {
			var parentOffset = $(this).parent().offset(); 
			var relX = e.pageX - parentOffset.left;
			var percPos = relX * 100 / parentOffset.left;
			var second = hiddenPlayer[0].duration * parseInt(percPos) / 100;
			hiddenPlayer[0].currentTime = second;
		})
    }
    $('.volume_bar_full').css('cursor', 'pointer');
    $('.volume_bar_full').on('click', function(e) {
        var parentOffset = $(this).parent().offset(); 
        var relX = e.pageX - parentOffset.left;
        var volume = parseInt(relX) / 100;
        var progressValue=(-100+ (volume*100));
        $('.volume__bar').css("transform", "translateX("+ progressValue +"%)"); 
        hiddenPlayer[0].volume = volume>1?1:volume;
    })
    $(".volume-bar__icon").click(function() {
        if ($(this).hasClass("spoticon-volume-off-16")) {
            $(this).removeClass("spoticon-volume-off-16");
            $(this).addClass("spoticon-volume-16");
            hiddenPlayer[0].muted=false;
            var progressValue=(-100+ ((hiddenPlayer[0].volume/1)*100));
        $('.volume__bar').css("transform", "translateX("+ progressValue +"%)"); 
        } else {
            $(this).removeClass("spoticon-volume-16");
            $(this).addClass("spoticon-volume-off-16");
            hiddenPlayer[0].muted=true;
            $('.volume__bar').css("transform", "translateX("+ 100 +"%)"); 
        }
       
    });

    $(".control_repeat").click(function() {
        if ($(this).hasClass("control-button--active")) {
            $(this).removeClass("control-button--active");
            hiddenPlayer[0].loop=false;
        } else {
           
            $(this).addClass("control-button--active");
            hiddenPlayer[0].loop=true;
           
        }
       
    });

	if (this.currentTime == this.duration) {
		$('.next').trigger('click');
	}
});

