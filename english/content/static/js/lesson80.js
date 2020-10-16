/* NEW: card sequence
	80 - Phishing, Phishing video
	82 - Phishing types
	83 - What to look for
	84 - Understand URLs

	9x - TIPs
	100 - 2 challenges
*/

//"book" before chapter1: soc eng / phishing
var Lesson800 = {
	pre: function()
	{
		Course.showBotButtons(800,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson800.pre();
				$('#lesson800 .page-book .chapter-book').removeClass('active');

				Course.showLesson(800, function()
				{
					$('#lesson800 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(800,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson80.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson60.next(0);
	}
};

var Lesson80 = {
	video_init: false,
	video_player: null,
	video_started: false,
	video_finished: false,
	video_duration: 1,

	pre: function()
	{
		Course.showBotButtons(80,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson80 .is_sam').show();
			$('#lesson80 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson80 .is_sam').hide();
			$('#lesson80 .is_sue').show();
		}
		$('#lesson80 .bg img.floor, #lesson80 .bg img.people, #lesson80 .bg div.intro').show();

		$('#lesson80 .bg div.videoplayer').hide();

		$('#lesson80 .bg img.board').css({
			'top':'-12px',
			'left':'210px',
			'width':'807px',
			'height':'489px',
			'display': 'block'
		});

		if(!Lesson80.video_init)
		{
			Lesson80.video_player = $("#lesson80 .vplayer").flowplayer()
				.on("finish", function(e, api) {
					console.log("finished v1");
					Lesson80.video_finished = true;
					Course.oState.card81 = 100;
					OCookies.set("card81",Course.oState.card81);
					lucyDispatchEvent("PHISHING: video-finish");
				})
				.on("ready", function (e) {
					Lesson80.video_player = flowplayer($("#lesson80 .vplayer"));
					if(Lesson80.video_player)
					{
						Lesson80.video_duration = Lesson80.video_player.video.duration;
						console.log("video ready", Lesson80.video_duration);
						Lesson80.video_init = true;

						Course.videoModify("#lesson80 .vplayer");
					}
				});
		}
	},

	video: function()
	{
		Course.showBotButtons(80,false);

		$('#lesson80 .bg img.floor, #lesson80 .bg img.people, #lesson80 .bg div.intro').fadeOut(500);
		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson80 .bg img.is_sam').fadeOut(500);
		}
		else //1 - Sue
		{
			$('#lesson80 .bg img.is_sue').fadeOut(500);
		}

		$('#lesson80 .bg img.board').animate({
			'left': '20px',
			'width': '971px',
			'height': '621px'
		}, 1500);

		setTimeout(function()
		{
			Course.showBotButtons(80,true);

			//start video
			$('#lesson80 .bg div.videoplayer').fadeIn(500, function()
			{
				if(Lesson80.video_duration > 1)
				{
					Lesson80.video_player.play();
				}
			});
		}, 1500);
	},

	videoPause: function()
	{
		if(Lesson80.video_duration > 1)
		{
			Lesson80.video_player.pause();
			Lesson80.video_player.seekTo(0);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson80.pre();
				Course.showLesson(80, function()
				{
					Course.showBotButtons(80,true);
				});
				break;

			case 1:
				Lesson80.videoPause();
				Lesson820.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson80.videoPause();
		Lesson800.next(0);
	}
};

/* OLD: 4 cards  (phishing)
	81 - Explainer video
	82 - Phishing types
	83 - What to look for
	84 - Understand URLs

	9x - TIPs
	100 - 2 challenges
var Lesson80 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(80,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson80 .is_sam').show();
			$('#lesson80 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson80 .is_sam').hide();
			$('#lesson80 .is_sue').show();
		}
		
		$('#lesson80 div.card').hide();
		Lesson80.setCardIco();

		if(!Lesson80.f_pre)
		{
			Lesson80.f_pre = true;
			
			$('#lesson80 div.card').click(function()
			{
				if($(this).hasClass('card81')) Lesson81.next(0);
				if($(this).hasClass('card82')) Lesson82.next(0);
				if($(this).hasClass('card83')) Lesson83.next(0);
				if($(this).hasClass('card84')) Lesson84.next(0);
			});
		}
	},

	setCardIco: function()
	{
		function setIco(el, ico_class)
		{
			if(ico_class == 'a')
				el.addClass('active').removeClass('partial');
			else if(ico_class == 'p')
				el.addClass('partial').removeClass('active');
			else
				el.removeClass('active partial');
		}

		if(Course.oState.card81  >= 100) //video
			setIco($('#lesson80 div.card81'), 'a');
		else if(Course.oState.card81 >= 1)
			setIco($('#lesson80 div.card81'), 'p');

		if(Course.oState.card82  >= 100) //types
			setIco($('#lesson80 div.card82'), 'a');
		else if(Course.oState.card82 >= 1)
			setIco($('#lesson80 div.card82'), 'p');

		if(Course.oState.card83  >= 100) //what to look
			setIco($('#lesson80 div.card83'), 'a');

		if(Course.oState.card84  >= 100) //what to look
			setIco($('#lesson80 div.card84'), 'a');
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson80.pre();
				Course.showLesson(80, function()
				{
					$('#lesson80 div.card81').fadeIn(400, function()
					{
						$('#lesson80 div.card82').fadeIn(400, function()
						{
							$('#lesson80 div.card83').fadeIn(400, function()
							{
								$('#lesson80 div.card84').fadeIn(400, function()
								{
									Course.showBotButtons(80,true);
								});
							});
						});
					});
				});
				break;
			case 1:
				Lesson90.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson60.next(0);
	}
};

var Lesson81 = {
	video_init: false,
	video_player: null,
	video_started: false,
	video_finished: false,
	video_duration: 1,
	viewed_slides: 1,

	pre: function()
	{
		Course.showBotButtons(81,false);

		if(!Lesson81.video_init)
		{
			Lesson81.video_player = $("#lesson81 .vplayer").flowplayer()
				.on("finish", function(e, api) {
					console.log("finished video81");
					Lesson81.video_finished = true;
					Course.oState.card81 = 100;
					OCookies.set("card81",Course.oState.card81);
					lucyDispatchEvent("phishing video finished");
				})
				.on("progress", function(e) {
					Lesson81.video_started = true;
				})
				.on("ready", function (e) {
					Lesson81.video_player = flowplayer($("#lesson81 .vplayer"));
					if(Lesson81.video_player)
					{
						Lesson81.video_duration = Lesson81.video_player.video.duration;
						console.log("video81 ready", Lesson81.video_duration);
						Lesson81.video_init = true;
						if(Course.oState.card81 < 1)
						{
							Course.oState.card81 = 1;
							OCookies.set("card81",Course.oState.card81);
						}
					}
				});
		}
	},

	videoPause: function()
	{
		if(Lesson81.video_duration > 1)
		{
			Lesson81.video_player.pause();
			Lesson81.video_player.seekTo(0);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson81.pre();
				Course.showLesson(81, function()
				{
					Course.showBotButtons(81,true);

					if(Lesson81.video_duration > 1)
					{
						Lesson81.video_player.play();
					}
				});
				break;

			case 1: //back to 80
				Lesson81.videoPause();
				Lesson80.next(0);
		}
	},
};
*/

//"book" before chapter1: soc eng / phishing types
var Lesson820 = {
	pre: function()
	{
		Course.showBotButtons(820,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson820.pre();
				$('#lesson820 .page-book .chapter-book').removeClass('active');

				Course.showLesson(820, function()
				{
					$('#lesson820 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(820,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson82.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson800.next(0);
	}
};

var Lesson82 = {
	f_pre: false,
	n_acc: 0, //number of accordion items
	row1cy: 0,

	pre: function()
	{
		Course.showBotButtons(82,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson82 .is_sam').show();
			$('#lesson82 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson82 .is_sam').hide();
			$('#lesson82 .is_sue').show();
		}

		if(Course.oState.card82 < 1)
		{
			Course.oState.card82 = 1;
			OCookies.set("card82", Course.oState.card82);
		}

		if(!Lesson82.f_pre)
		{
			Lesson82.f_pre = true;

			Lesson82.n_acc = $('#lesson82 .accordion > h3').length;
			$('#lesson82 .accordion > h3').attr('data-act',0);

			$('#lesson82 .accordion').accordion({
				collapsible: true,
				heightStyle: "content",
				active: false,
				activate: function(event, ui) {
					ui.newHeader.attr('data-act',1);

					//calc count of data-act=1
					var n = 0;
					$('#lesson82 .accordion > h3').each(function()
					{
						if($(this).attr('data-act') == 1) n++;
					});
					//console.log("n act",n,ui.newHeader);
					if(n == 4)
					{
						Course.oState.card82 = 100;
						OCookies.set("card82", Course.oState.card82);
						lucyDispatchEvent('"Phishing types" card was passed');
					}
				},
				beforeActivate: function(event, ui) {
					//hide/show row1
					if(ui.newHeader.length > 0)
					{
						Lesson82.row1cy = $('#lesson82 .row1').height();
						$('#lesson82 .row1').animate({
							height: 0
						}, 400, function()
						{
							$('#lesson82 .accordion').css({ 'margin-top': '-10px' });
						});
					}
					else
					{
						$('#lesson82 .row1').show(400);
						$('#lesson82 .row1').animate({
							height: Lesson82.row1cy
						}, 400, function()
						{
							$('#lesson82 .row1').css('height','auto');
							$('#lesson82 .accordion').css({ 'margin-top': '20px' });
						});
					}
				}
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson82.pre();
				Course.showLesson(82, function()
				{
					Course.showBotButtons(82,true);
				});
				break;
			case 1:
				Lesson830.next(0);
		}
	},

	back: function()
	{
		Lesson820.next(0);
	}
};

//"book" before chapter1: soc eng / What to look for?
var Lesson830 = {
	pre: function()
	{
		Course.showBotButtons(830,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson830.pre();
				$('#lesson830 .page-book .chapter-book').removeClass('active');

				Course.showLesson(830, function()
				{
					$('#lesson830 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(830,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson83.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson820.next(0);
	}
};

var Lesson83 = {
	pre: function()
	{
		Course.showBotButtons(83,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson83.pre();
				Course.showLesson(83, function()
				{
					Course.oState.card83 = 100;
					OCookies.set("card83", Course.oState.card83);
					Course.showBotButtons(83,true);
				});
				break;
			case 1:
				Lesson840.next(0);
		}
	},

	back: function()
	{
		Lesson830.next(0);
	}
};

//"book" before chapter1: soc eng / Understand Domains
var Lesson840 = {
	pre: function()
	{
		Course.showBotButtons(840,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson840.pre();
				$('#lesson840 .page-book .chapter-book').removeClass('active');

				Course.showLesson(840, function()
				{
					$('#lesson840 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(840,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson84.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson830.next(0);
	}
};

var Lesson84 = {
	f_pre: false,
	pre: function()
	{
		Course.showBotButtons(84,false);
		$('#lesson84 .bubble3').hide();

		if(!Lesson84.f_pre)
		{
			Lesson84.f_pre = true;

			$('#lesson84 div.url').hover(
				function()
				{
					$('#lesson84 .bubble3').show();
				},

				function()
				{
					$('#lesson84 .bubble3').hide();
				}
			);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson84.pre();
				Course.showLesson(84, function()
				{
					Course.oState.card84 = 100;
					OCookies.set("card84", Course.oState.card84);
					Course.showBotButtons(84,true);
				});
				break;
			case 1:
				Lesson900.next(0);
		}
	},

	back: function()
	{
		Lesson840.next(0);
	}
};
