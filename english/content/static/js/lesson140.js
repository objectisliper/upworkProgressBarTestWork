/* Password SECURITY - 5 cards 
	141 - Explainer video
	142 - Why and how hackers go after passwords
	143 - 2FA &amp; Password Manager
	144 - Choosing a good password
	145 - Challenge
*/

//"book" before chapter3
var Lesson130 = {
	pre: function()
	{
		Course.showBotButtons(130,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson130.pre();
				Course.enaLessonMenu(130);
				$('#lesson130 .page-book .chapter-book').removeClass('active');

				Course.showLesson(130, function()
				{
					$('#lesson130 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(130,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson140.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson120.next(2);
	}
};

var Lesson140 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(140,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson140 .is_sam').show();
			$('#lesson140 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson140 .is_sam').hide();
			$('#lesson140 .is_sue').show();
		}

		Lesson140.setCardIco();

		if(!Lesson140.f_pre)
		{
			Lesson140.f_pre = true;
			
			$('#lesson140 div.card').click(function()
			{
				if($(this).hasClass('card141')) Lesson141.next(0);
				if($(this).hasClass('card142')) Lesson142.next(0);
				if($(this).hasClass('card143')) Lesson143.next(0);
				if($(this).hasClass('card144')) Lesson144.next(0);
				if($(this).hasClass('card145')) Lesson145.next(0);
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

		if(Course.oState.card141  >= 100) //video
			setIco($('#lesson140 div.card141'), 'a');
		else if(Course.oState.card141 >= 1)
			setIco($('#lesson140 div.card141'), 'p');

		if(Course.oState.card142  >= 100) //why...
			setIco($('#lesson140 div.card142'), 'a');
		else if(Course.oState.card142 >= 1)
			setIco($('#lesson140 div.card142'), 'p');

		if(Course.oState.card143  >= 100) //pass manager
			setIco($('#lesson140 div.card143'), 'a');
		else if(Course.oState.card143 >= 1)
			setIco($('#lesson140 div.card143'), 'p');

		if(Course.oState.card144  >= 100) //choosing pass
			setIco($('#lesson140 div.card144'), 'a');
		else if(Course.oState.card144 >= 1)
			setIco($('#lesson140 div.card144'), 'p');

		if(Course.oState.card145  >= 100) //challenge
			setIco($('#lesson140 div.card145'), 'a');
		else if(Course.oState.card145 >= 1)
			setIco($('#lesson140 div.card145'), 'p');
	},

	showCards: function()
	{
		$('#lesson140 div.card141').fadeIn(400, function()
		{
			$('#lesson140 div.card142').fadeIn(400, function()
			{
				$('#lesson140 div.card143').fadeIn(400, function()
				{
					$('#lesson140 div.card144').fadeIn(400, function()
					{
						$('#lesson140 div.card145').fadeIn(400, function()
						{
							Course.setLessonFragment(140,2);
							Course.showBotButtons(140,true);
						});
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
				Lesson140.pre();
				$('#lesson140 .block1').show();
				$('#lesson140 .block2').hide();
				Course.showLesson(140, function()
				{
					Course.setLessonFragment(140,1);
					Course.showBotButtons(140,true);
				});
				break;

			case 1:
				//if page = 2 go to next lesson
				if(Course.oState.currFragment == 2)
				{
					Lesson150.next(0);
					break;
				}

				//page2 - cards
				Course.showBotButtons(140,false);
				$('#lesson140 div.card').hide();

				setTimeout(function()
				{
					$('#lesson140 .block1').fadeOut(1000);
				},500);

				$('#lesson140 .block2').fadeIn(1500);
				setTimeout(function()
				{
					Lesson140.showCards();
				},1500);
				break;

			case 2: //go to page2
				Lesson140.pre();
				$('#lesson140 .block1').hide();
				$('#lesson140 div.card').hide();
				$('#lesson140 .block2').show();

				Course.showLesson(140, function()
				{
					Lesson140.showCards();
					Course.setLessonFragment(140,2);
					Course.showBotButtons(140,true);
				});
				break;
		}
	},

	back: function()
	{
		//if page = 2 go to page 1
		if(Course.oState.currFragment == 2)
		{
			Course.showBotButtons(140,false);

			setTimeout(function()
			{
				$('#lesson140 .block2').fadeOut(1000);
			},500);

			$('#lesson140 .block1').fadeIn(1500);
			setTimeout(function()
			{
				Course.setLessonFragment(140,1);
				Course.showBotButtons(140,true);
			},1500);
			return;
		}

		Lesson130.next(0);
	}
};

var Lesson141 = {
	video_init: false,
	video_player: null,
	video_started: false,
	video_finished: false,
	video_duration: 1,
	viewed_slides: 1,

	pre: function()
	{
		Course.showBotButtons(141,false);

		if(!Lesson141.video_init)
		{
			Lesson141.video_player = $("#lesson141 .vplayer").flowplayer()
				.on("finish", function(e, api) {
					console.log("finished video141");
					Lesson141.video_finished = true;
					Course.oState.card141 = 100;
					OCookies.set("card141",Course.oState.card141);
					lucyDispatchEvent("password security awareness video finished");
				})
				.on("progress", function(e) {
					Lesson141.video_started = true;
				})
				.on("ready", function (e) {
					Lesson141.video_player = flowplayer($("#lesson141 .vplayer"));
					if(Lesson141.video_player)
					{
						Lesson141.video_duration = Lesson141.video_player.video.duration;
						console.log("video141 ready", Lesson141.video_duration);
						Lesson141.video_init = true;
						Course.videoModify("#lesson141 .vplayer");

						if(Course.oState.card141 < 1)
						{
							Course.oState.card141 = 1;
							OCookies.set("card141",Course.oState.card141);
						}
					}
				});
		}
	},

	videoPause: function()
	{
		if(Lesson141.video_duration > 1)
		{
			Lesson141.video_player.pause();
			Lesson141.video_player.seekTo(0);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson141.pre();
				Course.showLesson(141, function()
				{
					Course.showBotButtons(141,true);

					if(Lesson141.video_duration > 1)
					{
						Lesson141.video_player.play();
					}
				});
				break;

			case 1: //back to les140 / page2
				Lesson141.videoPause();
				Lesson140.next(2);
				break;
		}
	},
};

var Lesson142 = {
	f_pre: false,
	n_slides: 4,
	viewed_slides: 0,

	pre: function()
	{
		Course.showBotButtons(142,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson142 .is_sam').show();
			$('#lesson142 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson142 .is_sam').hide();
			$('#lesson142 .is_sue').show();
		}

		$('#lesson142 h2.h2-1').show();
		$('#lesson142 h2.h2-2').hide();

		if(Course.oState.card142 < 1)
		{
			Course.oState.card142 = 1;
			OCookies.set("card142", Course.oState.card142);
		}

		if(!Lesson142.f_pre)
		{
			Lesson142.f_pre = true;

			$('#lesson142 .block2 .tips-slider').slick({
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
			Lesson142.viewed_slides = 1;

			$('#lesson142 button.slick-prev, #lesson142 button.slick-next').click(function()
			{
				var curr_slide = $('#lesson142 .slick-list .slick-active');
				var ind = parseInt(curr_slide.attr('data-slick-index'));
				switch(ind)
				{
					case 1:
						Lesson142.viewed_slides |= 2;
						break;
					case 2:
						//anim 3 images
						$('#lesson142 .block2 .tip3 p.img img').css('display', 'none');
						setTimeout(function()
						{
							$('#lesson142 .block2 .tip3 p.img img.img1').fadeIn(500, function()
							{
								$('#lesson142 .block2 .tip3 img.img2').fadeIn(500, function()
								{
									$('#lesson142 .block2 .tip3 img.img3').fadeIn(500);
								});
							});
						}, 800);
						Lesson142.viewed_slides |= 4;
						break;
					case 3:
						Lesson142.viewed_slides |= 8;
						break;
					case 4: Lesson142.viewed_slides |= 16;
						break;
				}

				var n = 0, i;
				for(i=0; i<4; i++)
				{
					if((Lesson142.viewed_slides >> i) & 1) n++;
				}

				if(n >= Lesson142.n_slides)
				{
					//enable NEXT button
					Course.enaBotNextButton(142,true);
				}

				Course.oState.card142 = n / Lesson142.n_slides * 100;
				OCookies.set("card142", Course.oState.card142);
			});
		}
	},

	genPassw: function()
	{
		var trypass = $('#lesson142 .tip1 .try-pass-vac');
		var asym = [ ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '2020', '19', '!', '-19', '-2019', '20', '2019', '-21', '-2020', '#22', '#2019', '#19', '#2020' ];
		var sarr = [];
		var n = 0;
		var v = 0;

		var tm = setInterval(function()
		{
			if(trypass.is(':hidden')) { clearInterval(tm); }

			var s;
			if(v == 1) s = 'Vacation' + asym[n];
			else s = 'vacation' + asym[n];
			if(sarr.length >= 6) sarr.shift();
			sarr.push(s);

			s = '';
			for(var i=0; i<sarr.length; i++)
			{
				s += sarr[i] + '<br>';
			}
			trypass.html(s);

			if(n < (asym.length-1)) n++;
			else
			{
				n = 0;
				if(v == 0) v = 1;
				else v = 0;
			}
		},500);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson142.pre();
				$('#lesson142 .block1').show();
				$('#lesson142 .block2').hide();
				Course.showLesson(142, function()
				{
					Course.setLessonFragment(142,1);
					Course.showBotButtons(142,true);
				});
				break;

			case 1:
				//if page = 2
				if(Course.oState.currFragment == 2)
				{
					Course.oState.f_card14x |= 2;
					OCookies.set("card14x", Course.oState.f_card14x);
					Lesson140.next(2);
					break;
				}

				//page2
				Course.showBotButtons(142,false);
				Course.enaBotNextButton(142,false);
				$('#lesson142 .block2 .lbub').css('left', '-164px');

				$('#lesson142 h2.h2-1').hide();
				$('#lesson142 h2.h2-2').show();

				setTimeout(function()
				{
					$('#lesson142 .block1').fadeOut(1000);

					$(window).resize(); //for slider
				},500);

				$('#lesson142 .block2').fadeIn(1500);

				setTimeout(function()
				{
					//anim tip1
					$('#lesson142 .try-pass-vac').show();
					Lesson142.genPassw();

					$('#lesson142 .block2 .lbub').animate({
						'left': '79px'
					}, 1000);

					Course.setLessonFragment(142,2);
					Course.showBotButtons(142,true);
				}, 1500);
				break;

			case 2: //go to page2
				Lesson142.pre();
				$('#lesson142 h2.h2-1').hide();
				$('#lesson142 h2.h2-2').show();
				$('#lesson142 .block1').hide();
				$('#lesson142 .block2').show();

				Course.showLesson(142, function()
				{
					Course.setLessonFragment(142,2);
					Course.showBotButtons(142,true);
				});
				break;
		}
	},

	back: function()
	{
		//if page = 2 go to 142 / page 1
		if(Course.oState.currFragment == 2)
		{
			Course.showBotButtons(142,false);

			$('#lesson142 h2.h2-1').show();
			$('#lesson142 h2.h2-2').hide();

			setTimeout(function()
			{
				$('#lesson142 .block2').fadeOut(1000);
			},500);

			$('#lesson142 .block1').fadeIn(1500);
			setTimeout(function()
			{
				Course.setLessonFragment(142,1);
				Course.showBotButtons(142,true);
				Course.enaBotNextButton(142,true);
			},1500);
			return;
		}

		Lesson140.next(2);
	}
};

/*
//client course (2FA is deleted)
var Lesson143 = {
	pre: function()
	{
		Course.showBotButtons(143,false);
		$('#lesson143 .block1').hide();
		$('#lesson143 .block2').show();
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson143.pre();
				Course.showLesson(143, function()
				{
					Course.oState.card143 = 100;
					OCookies.set("card143", Course.oState.card143);

					Course.showBotButtons(143,true);
				});
				break;

			case 1: //back to les140 / page2
				Lesson140.next(2);
				break;
		}
	},

	back: function()
	{
		Lesson140.next(2);
	}
};
*/
//generic course
var Lesson143 = {
	pre: function()
	{
		Course.showBotButtons(143,false);
		$('#lesson143 .block1').show();
		$('#lesson143 .block2').hide();

		$('#lesson143 .block1 .example .field-pwd').html('');
		$('#lesson143 .block1 .example .field-login').show();
		$('#lesson143 .block1 .example .field-but').show();
		$('#lesson143 .block1 .example .s-code, #lesson143 .block1 .example .s-ok').hide();
		$('#lesson143 .block1 .example div.mobile').css({ 'opacity': '0' });
		$('#lesson143 .block1 .example .hand').css({
			'bottom': '-115px', 'right': '-205px'
		});

		if(Course.oState.card143 < 1)
		{
			Course.oState.card143 = 1;
			OCookies.set("card143", Course.oState.card143);
		}
	},

	anim1: function(fu)
	{
		$('#lesson143 .block1 .example .field-pwd').html('*****');
		$('#lesson143 .block1 .example .hand').animate({
			'bottom': '0px', 'right': '-49px'
		}, 1500);

		setTimeout(function()
		{
			$('#lesson143 .block1 .example .field-login').hide();
			$('#lesson143 .block1 .example .field-pwd').html('');
			$('#lesson143 .block1 .example .s-code').show();

			$('#lesson143 .block1 .example .hand').animate({
				'bottom': '-115px', 'right': '-205px'
			}, 1000);

			setTimeout(function()
			{
				$('#lesson143 .block1 .example div.mobile').animate({ 'opacity': '1' }, 1000);

				setTimeout(function()
				{
					$('#lesson143 .block1 .example .field-pwd').html('*****');

					$('#lesson143 .block1 .example .hand').animate({
						'bottom': '0px', 'right': '-49px'
					}, 1500);
					setTimeout(function()
					{
						$('#lesson143 .block1 .example .hand').animate({
							'bottom': '-115px', 'right': '-205px'
						}, 1000);
						setTimeout(function()
						{
							$('#lesson143 .block1 .example .field-but').hide();
							setTimeout(function()
							{
								$('#lesson143 .block1 .example .s-ok').show();
								fu();
							}, 800)
						}, 1000);
					}, 1500);
				}, 1800);
			}, 1500);
		}, 1500);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson143.pre();
				Course.showLesson(143, function()
				{
					Course.setLessonFragment(143,1);
					Lesson143.anim1(function()
					{
						Course.showBotButtons(143,true);
					});
				});
				break;

			case 1:
				if(Course.oState.currFragment == 2)
				{
					//back to les140 / page2
					Lesson140.next(2);
					break;
				}

				//page 2
				Course.showBotButtons(143,false);

				setTimeout(function()
				{
					$('#lesson143 .block1').fadeOut(1000);
				},500);

				$('#lesson143 .block2').fadeIn(1500);
				setTimeout(function()
				{
					Course.oState.card143 = 100;
					OCookies.set("card143", Course.oState.card143);

					Course.setLessonFragment(143,2);
					Course.showBotButtons(143,true);
				},1500);
				break;
		}
	},

	back: function()
	{
		if(Course.oState.currFragment == 2)
		{
			//go to page1
			Course.showBotButtons(143,false);

			setTimeout(function()
			{
				$('#lesson143 .block2').fadeOut(1000);
			},500);

			$('#lesson143 .block1').fadeIn(1500);
			setTimeout(function()
			{
				Course.setLessonFragment(143,1);
				Course.showBotButtons(143,true);
			},1500);
			return;
		}

		//back to les140 / page2
		Lesson140.next(2);
	}
};
