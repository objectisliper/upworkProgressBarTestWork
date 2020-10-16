/* Email SECURITY - 4 cards 
	161 - Explainer video
	162 - Threats
	163 - Tips
	164 - Exam
*/

//"book" before chapter4
var Lesson150 = {
	pre: function()
	{
		Course.showBotButtons(150,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Course.enaLessonMenu(150);
				Lesson150.pre();
				$('#lesson150 .page-book .chapter-book').removeClass('active');

				Course.showLesson(150, function()
				{
					$('#lesson150 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(150,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson160.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson140.next(2);
	}
};

var Lesson160 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(160,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson160 .is_sam').show();
			$('#lesson160 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson160 .is_sam').hide();
			$('#lesson160 .is_sue').show();
		}

		$('#lesson160 div.card').hide();

		Lesson160.setCardIco();

		if(!Lesson160.f_pre)
		{
			Lesson160.f_pre = true;
			
			$('#lesson160 div.card').click(function()
			{
				if($(this).hasClass('card161')) Lesson161.next(0);
				if($(this).hasClass('card162')) Lesson1620.next(0);
				if($(this).hasClass('card163')) Lesson163.next(0);
				if($(this).hasClass('card164')) Lesson164.next(0);
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

		if(Course.oState.card161  >= 100) //video
			setIco($('#lesson160 div.card161'), 'a');
		else if(Course.oState.card161 >= 1)
			setIco($('#lesson160 div.card161'), 'p');

		if((Course.oState.card1621 >= 100) && (Course.oState.card1622 >= 100)) //threats
			setIco($('#lesson160 div.card162'), 'a');
		else if((Course.oState.card1621 >= 1) || (Course.oState.card1622 >= 1))
			setIco($('#lesson160 div.card162'), 'p');

		if(Course.oState.card163  >= 100) //TIPs
			setIco($('#lesson160 div.card163'), 'a');
		else if(Course.oState.card163 >= 1)
			setIco($('#lesson160 div.card163'), 'p');

		if(Course.oState.card164  >= 100) //exam
			setIco($('#lesson160 div.card164'), 'a');
		else if(Course.oState.card164 >= 1)
			setIco($('#lesson160 div.card164'), 'p');
	},

	showCards: function()
	{
		$('#lesson160 div.card161').fadeIn(400, function()
		{
			$('#lesson160 div.card162').fadeIn(400, function()
			{
				$('#lesson160 div.card163').fadeIn(400, function()
				{
					$('#lesson160 div.card164').fadeIn(400, function()
					{
						Course.showBotButtons(160,true);
					});
				});
			});
		});
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson160.pre();
				$('#lesson160 .block1').show();
				$('#lesson160 .block2').hide();
				Course.showLesson(160, function()
				{
					Lesson160.showCards();
				});
				break;

			case 1:
				Lesson170.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson150.next(0);
	}
};

var Lesson161 = {
	video_init: false,
	video_player: null,
	video_started: false,
	video_finished: false,
	video_duration: 1,
	viewed_slides: 1,

	pre: function()
	{
		Course.showBotButtons(161,false);

		if(!Lesson161.video_init)
		{
			Lesson161.video_player = $("#lesson161 .vplayer").flowplayer()
				.on("finish", function(e, api) {
					console.log("finished video161");
					Lesson161.video_finished = true;
					Course.oState.card161 = 100;
					OCookies.set("card161",Course.oState.card161);
					lucyDispatchEvent("E-Mail security awareness video finished");
				})
				.on("progress", function(e) {
					Lesson161.video_started = true;
				})
				.on("ready", function (e) {
					Lesson161.video_player = flowplayer($("#lesson161 .vplayer"));
					if(Lesson161.video_player)
					{
						Lesson161.video_duration = Lesson161.video_player.video.duration;
						console.log("video161 ready", Lesson161.video_duration);
						Lesson161.video_init = true;
						Course.videoModify("#lesson161 .vplayer");

						if(Course.oState.card161 < 1)
						{
							Course.oState.card161 = 1;
							OCookies.set("card161",Course.oState.card161);
						}
					}
				});
		}
	},

	videoPause: function()
	{
		if(Lesson161.video_duration > 1)
		{
			Lesson161.video_player.pause();
			Lesson161.video_player.seekTo(0);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson161.pre();
				Course.showLesson(161, function()
				{
					Course.showBotButtons(161,true);

					if(Lesson161.video_duration > 1)
					{
						Lesson161.video_player.play();
					}
				});
				break;

			case 1: //back to les160
				Lesson161.videoPause();
				Lesson160.next(0);
				break;
		}
	},
};


//"book" before chapter4: E-MAIL SECURITY / THREATS
var Lesson1620 = {
	pre: function()
	{
		Course.showBotButtons(1620,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson1620.pre();
				$('#lesson1620 .page-book .chapter-book').removeClass('active');

				Course.showLesson(1620, function()
				{
					$('#lesson1620 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(1620,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson162.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson160.next(0);
	}
};

var Lesson162 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(162,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson162 .is_sam').show();
			$('#lesson162 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson162 .is_sam').hide();
			$('#lesson162 .is_sue').show();
		}

		$('#lesson162 div.card').hide();
		Lesson162.setCardIco();

		if(!Lesson162.f_pre)
		{
			Lesson162.f_pre = true;
			
			$('#lesson162 div.card').click(function()
			{
				if($(this).hasClass('card1621')) Lesson1621.next(0);
				if($(this).hasClass('card1622')) Lesson1622.next(0);
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

		if(Course.oState.card1621  >= 100) //threat1
			setIco($('#lesson162 div.card1621'), 'a');
		else if(Course.oState.card1621 >= 1)
			setIco($('#lesson162 div.card1621'), 'p');

		if(Course.oState.card1622  >= 100) //threat2
			setIco($('#lesson162 div.card1622'), 'a');
		else if(Course.oState.card1622 >= 1)
			setIco($('#lesson162 div.card1622'), 'p');
	},

	showCards: function()
	{
		$('#lesson162 div.card1621').fadeIn(400, function()
		{
			$('#lesson162 div.card1622').fadeIn(400, function()
			{
				Course.showBotButtons(162,true);
			});
		});
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson162.pre();
				Course.showLesson(162, function()
				{
					Lesson162.showCards();
				});
				break;

			case 1:
				Lesson160.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson160.next(0);
	}
};

var Lesson1621 = {
	bgimg: null,
	f_zoomed: false,
	pre: function()
	{
		Course.showBotButtons(1621,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			Lesson1621.bgimg = $('#lesson1621 .bg img.is_sam');
			$('#lesson1621 .is_sam').show();
			$('#lesson1621 .is_sue').hide();
		}
		else //1 - Sue
		{
			Lesson1621.bgimg = $('#lesson1621 .bg img.is_sue');
			$('#lesson1621 .is_sam').hide();
			$('#lesson1621 .is_sue').show();
		}

		Lesson1621.bgimg.css({
			'width': '1150px',
			'height': '612px',
			'margin-top': '0px'
		});

		$('#lesson1621 .bg div.intro').hide();

		Lesson1621.f_zoomed = false;
	},

	zoom: function()
	{
		Lesson1621.bgimg.animate({
			'width': '2148px',
			'height': '1143px',
			'margin-top': '-83px'
		}, 1500, function()
		{
			$('#lesson1621 .bg div.intro').fadeIn(800);

			Course.oState.card1621 = 100;
			OCookies.set("card1621", Course.oState.card1621);

			Course.showBotButtons(1621,true);
			Lesson1621.f_zoomed = true;
		});
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson1621.pre();
				Course.showLesson(1621, function()
				{
					Lesson1621.zoom();
				});
				break;

			case 1:
				Lesson162.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson162.next(0);
	}
};

var Lesson1622 = {
	bgimg: null,
	f_zoomed: false,
	pre: function()
	{
		Course.showBotButtons(1622,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			Lesson1622.bgimg = $('#lesson1622 .bg img.is_sam');
			$('#lesson1622 .is_sam').show();
			$('#lesson1622 .is_sue').hide();
		}
		else //1 - Sue
		{
			Lesson1622.bgimg = $('#lesson1622 .bg img.is_sue');
			$('#lesson1622 .is_sam').hide();
			$('#lesson1622 .is_sue').show();
		}

		Lesson1622.bgimg.css({
			'width': '1150px',
			'height': '612px',
			'margin-top': '0px'
		});

		$('#lesson1622 .bg div.intro').hide();

		Lesson1622.f_zoomed = false;
	},

	zoom: function()
	{
		Lesson1622.bgimg.animate({
			'width': '2148px',
			'height': '1143px',
			'margin-top': '-83px'
		}, 1500, function()
		{
			$('#lesson1622 .bg div.intro').fadeIn(800);

			Course.oState.card1622 = 100;
			OCookies.set("card1622", Course.oState.card1622);

			Course.showBotButtons(1622,true);
			Lesson1622.f_zoomed = true;
		});
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson1622.pre();
				Course.showLesson(1622, function()
				{
					Lesson1622.zoom();
				});
				break;

			case 1:
				Lesson162.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson162.next(0);
	}
};

/* TIPs */
var Lesson163 = {
	f_pre: false,
	n_slides: 12,
	viewed_slides: 0,

	pre: function()
	{
		Course.showBotButtons(163,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson163 .is_sam').show();
			$('#lesson163 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson163 .is_sam').hide();
			$('#lesson163 .is_sue').show();
		}

		if(Course.oState.card163 < 1)
		{
			Course.oState.card163 = 1;
			OCookies.set("card163",Course.oState.card163);
		}

		if(!Lesson163.f_pre)
		{
			Lesson163.f_pre = true;

			$('#lesson163 .tips-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				cssEase: 'ease',
				autoplaySpeed: 4000,
				fade: false,
				pauseOnHover: true,
				speed: 600,
				asNavFor: '.slider-nav'
			});
			Lesson163.viewed_slides = 1;

			$('#lesson163 button.slick-prev, #lesson163 button.slick-next').click(function()
			{
				var curr_slide = $('#lesson163 .slick-list .slick-active');
				var ind = parseInt(curr_slide.attr('data-slick-index'));
				switch(ind)
				{
					case 1: Lesson163.viewed_slides |= 2; break;
					case 2: Lesson163.viewed_slides |= 4; break;
					case 3: Lesson163.viewed_slides |= 8; break;
					case 4: Lesson163.viewed_slides |= 16; break;
					case 5: Lesson163.viewed_slides |= 32; break;
					case 6: Lesson163.viewed_slides |= 64; break;
					case 7: Lesson163.viewed_slides |= 128; break;
					case 8: Lesson163.viewed_slides |= 256; break;
					case 9: Lesson163.viewed_slides |= 512; break;
					case 10: Lesson163.viewed_slides |= 1024; break;
					case 11: Lesson163.viewed_slides |= 2048; break;
					case 12: Lesson163.viewed_slides |= 4096; break;
					case 13: Lesson163.viewed_slides |= 8192; break;
				}

				var n = 0, i;
				for(i=0; i<Lesson163.n_slides; i++)
				{
					if((Lesson163.viewed_slides >> i) & 1) n++;
				}

				Course.oState.card163 = n*100 / Lesson163.n_slides;
				OCookies.set("card163", Course.oState.card163);

				if(n >= Lesson163.n_slides)
				{
					//enable NEXT button
					Course.enaBotNextButton(163,true);
				}
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson163.pre();
				Course.enaBotNextButton(163,false);
				Course.showLesson(163, function()
				{
					$(window).resize(); //for slider
					Course.showBotButtons(163,true);
				}, 1500);
				break;
			case 1:
				Lesson160.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson160.next(0);
	}
};
