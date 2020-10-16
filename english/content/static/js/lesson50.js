/* soc eng video */
var Lesson50 = {
	video_init: false,
	video_player: null,
	video_started: false,
	video_finished: false,
	video_duration: 1,

	pre: function()
	{
		Course.showBotButtons(50,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson50 .is_sam').show();
			$('#lesson50 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson50 .is_sam').hide();
			$('#lesson50 .is_sue').show();
		}
		$('#lesson50 .bg img.floor, #lesson50 .bg img.people, #lesson50 .bg div.intro').show();

		$('#lesson50 .bg div.videoplayer').hide();

		$('#lesson50 .bg img.board').css({
			'top':'-12px',
			'left':'210px',
			'width':'807px',
			'height':'489px',
			'display': 'block'
		});

		if(!Lesson50.video_init)
		{
			Lesson50.video_player = $("#lesson50 .vplayer").flowplayer()
				.on("finish", function(e, api) {
					console.log("finished v1");
					Lesson50.video_finished = true;
					Course.oState.f_video50 = 1;
					OCookies.set("video50",1);
					lucyDispatchEvent("SOCIAL ENGINEERING: video-finish");
				})
				.on("ready", function (e) {
					Lesson50.video_player = flowplayer($("#lesson50 .vplayer"));
					if(Lesson50.video_player)
					{
						Lesson50.video_duration = Lesson50.video_player.video.duration;
						console.log("video ready", Lesson50.video_duration);
						Lesson50.video_init = true;

						Course.videoModify("#lesson50 .vplayer");
					}
				});
/*
				.on("progress", function(e) {
console.log("v progress");
					Lesson50.video_started = true;
					//var time = Lesson50.video_player.video.time;
					//var perc = parseInt(time/Lesson50.video_duration * 100);
					//Lesson50.percent = perc;
					//LProgress.setPercent(perc);
					//OCookies.setLessonAttr(1, "percent", Lesson10.percent);
				})
*/
		}
	},

	video: function()
	{
		Course.showBotButtons(50,false);

		$('#lesson50 .bg img.floor, #lesson50 .bg img.people, #lesson50 .bg div.intro').fadeOut(500);
		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson50 .bg img.is_sam').fadeOut(500);
		}
		else //1 - Sue
		{
			$('#lesson50 .bg img.is_sue').fadeOut(500);
		}

		$('#lesson50 .bg img.board').animate({
			'left': '20px',
			'width': '971px',
			'height': '621px'
		}, 1500);

		setTimeout(function()
		{
			Course.showBotButtons(50,true);

			//start video
			$('#lesson50 .bg div.videoplayer').fadeIn(500, function()
			{
				if(Lesson50.video_duration > 1)
				{
					Lesson50.video_player.play();
				}
			});
		}, 1500);
	},

	videoPause: function()
	{
		if(Lesson50.video_duration > 1)
		{
			Lesson50.video_player.pause();
			Lesson50.video_player.seekTo(0);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Course.enaLessonMenu(50);
				Lesson50.pre();
				$('#lesson50 .page-book').show();
				$('#lesson50 .page-chapter').hide();
				$('#lesson50 .page-book .chapter-book').removeClass('active');

				Course.showLesson(50, function()
				{
					$('#lesson50 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.setLessonFragment(50,1);
						Course.showBotButtons(50,true);
					}, 1000);
				});
				break;

			case 1:
				if(Course.oState.currFragment > 1)
				{
					Lesson50.videoPause();
					Lesson60.next(0);
					break;
				}

				//else next page
				setTimeout(function()
				{
					$('#lesson50 .page-book').fadeOut(1000);
					Course.setLessonFragment(50,2);
				},500);

				$('#lesson50 .page-chapter').fadeIn(1500);
				break;

			case 2:
				Lesson50.pre();
				$('#lesson50 .page-book').hide();
				$('#lesson50 .page-chapter').show();
				Course.showLesson(50, function()
				{
					Course.setLessonFragment(50,2);
					Course.showBotButtons(50,true);
				});
				break;
		}
	},

	back: function()
	{
		if(Course.oState.currFragment > 1)
		{
			$('#lesson50 .page-book .chapter-book').removeClass('active');
			setTimeout(function()
			{
				$('#lesson50 .page-book').fadeIn(1000, function()
				{
					$('#lesson50 .page-book .chapter-book').addClass('active');
					Course.setLessonFragment(50,1);
				});
			},500);

			$('#lesson50 .page-chapter').fadeOut(1500);
			return;
		}

		Lesson50.videoPause();
		Lesson45.next(0);
	}
};
