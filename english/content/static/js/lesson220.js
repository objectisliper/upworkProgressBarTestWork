/* USING PUBLIC WI-FI’s - 2 cards 
	221 - Risks
	222 - TIPs
*/

//"book" before chapter7
var Lesson210 = {
	pre: function()
	{
		Course.showBotButtons(210,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Course.enaLessonMenu(210);
				Lesson210.pre();
				$('#lesson210 .page-book .chapter-book').removeClass('active');

				Course.showLesson(210, function()
				{
					$('#lesson210 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(210,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson220.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson200.next(0);
	}
};

var Lesson220 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(220,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson220 .is_sam').show();
			$('#lesson220 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson220 .is_sam').hide();
			$('#lesson220 .is_sue').show();
		}

		$('#lesson220 div.card').hide();
		Lesson220.setCardIco();

		if(!Lesson220.f_pre)
		{
			Lesson220.f_pre = true;
			
			$('#lesson220 div.card').click(function()
			{
				if($(this).hasClass('card221')) Lesson221.next(0);
				if($(this).hasClass('card222')) Lesson222.next(0);
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

		if(Course.oState.card221  >= 100) //Risks
			setIco($('#lesson220 div.card221'), 'a');
		else if(Course.oState.card221 >= 1)
			setIco($('#lesson220 div.card221'), 'p');

		if(Course.oState.card222  >= 100) //TIPs
			setIco($('#lesson220 div.card222'), 'a');
		else if(Course.oState.card222 >= 1)
			setIco($('#lesson220 div.card222'), 'p');
	},

	showCards: function()
	{
		$('#lesson220 div.card221').fadeIn(400, function()
		{
			$('#lesson220 div.card222').fadeIn(400, function()
			{
				Course.showBotButtons(220,true);
			});
		});
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson220.pre();
				Course.showLesson(220, function()
				{
					Lesson220.showCards();
				});
				break;

			case 1:
				Lesson230.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson210.next(0);
	}
};

var Lesson221 = {
	f_pre: false,
	n_slides: 2,
	viewed_slides: 0,
	first_anim: 1,

	pre: function()
	{
		Course.showBotButtons(221,false);
		$('#lesson221 .bg .lbub').css('left', '-164px');

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson221 .is_sam').show();
			$('#lesson221 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson221 .is_sam').hide();
			$('#lesson221 .is_sue').show();
		}

		if(Course.oState.card221 < 1)
		{
			Course.oState.card221 = 1;
			OCookies.set("card221",Course.oState.card221);
		}

		if(!Lesson221.f_pre)
		{
			Lesson221.f_pre = true;

			$('#lesson221 .tips-slider').slick({
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
			Lesson221.viewed_slides = 1;

			$('#lesson221 button.slick-prev, #lesson221 button.slick-next').click(function()
			{
				var curr_slide = $('#lesson221 .slick-list .slick-active');
				var ind = curr_slide.find('input.num').val();

				switch(parseInt(ind))
				{
					case 1:
						Lesson221.viewed_slides |= 1;
						Lesson221.disSliderBut(true);
						Lesson221.initSlide1();
						Lesson221.animSlide1();
						break;
					case 2:
						Lesson221.viewed_slides |= 2;
						break;
				}

				var n = 0, i;
				for(i=0; i<Lesson221.n_slides; i++)
				{
					if((Lesson221.viewed_slides >> i) & 1) n++;
				}

				Course.oState.card221 = n*100 / Lesson221.n_slides;
				OCookies.set("card221", Course.oState.card221);

				if(n >= Lesson221.n_slides)
				{
					//enable NEXT button
					Course.enaBotNextButton(221,true);
				}
			});
		}
	},

	disSliderBut: function(mode)
	{
		$('#lesson221 .tips-slider button').prop('disabled', mode);
	},

	initSlide1: function()
	{
		$('#lesson221 .tip1 .wifinet, #lesson221 .tip1 .contbut, #lesson221 .tip1 .ring').hide();
		$('#lesson221 .tip1 .cursor').css({ 'top': '364px', 'left': '353px' });
		Lesson221.disSliderBut(true);
	},

	animSlide1: function()
	{
		//start anim
		setTimeout(function()
		{
			$('#lesson221 .tip1 .wifinet').fadeIn(500);
		},1200);

		setTimeout(function()
		{
			$('#lesson221 .tip1 .cursor').animate({
				'top': '222px',
				'left': '253px'
			},1000);

			setTimeout(function()
			{
				$('#lesson221 .tip1 .contbut').fadeIn(500, function()
				{
					$('#lesson221 .tip1 .contbut').fadeOut(200, function()
					{
						setTimeout(function()
						{
							$('#lesson221 .tip1 .ring').fadeIn(500);
							$('#lesson221 .tip1 .cursor').css({ 'top': '364px', 'left': '353px' });

							Lesson221.disSliderBut(false);
						}, 300);
					});
				});
			},1000);
		}, 2100);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson221.pre();
				Lesson221.initSlide1();
				Course.enaBotNextButton(221,false);

				Course.showLesson(221, function()
				{
					$(window).resize(); //for slider
					if(Lesson221.first_anim)
					{
						Lesson221.first_anim = 0;
						Lesson221.animSlide1();
					}
					else
					{
						var curr_slide = $('#lesson221 .slick-list .slick-active');
						var ind = curr_slide.find('input.num').val();
						if(parseInt(ind) == 1)
						{
							Lesson221.disSliderBut(true);
							Lesson221.initSlide1();
							Lesson221.animSlide1();
						}
						else
						{
							Lesson221.disSliderBut(false);
						}
					}

					setTimeout(function()
					{
						$('#lesson221 .bg .lbub').animate({
							'left': '79px'
						}, 1000);
					}, 800);

					Course.showBotButtons(221,true);
				}, 1500);
				break;
			case 1:
				Lesson220.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson220.next(0);
	}
};

var Lesson222 = {
	f_pre: false,
	n_slides: 2,
	viewed_slides: 0,
	first_anim: 1,

	pre: function()
	{
		Course.showBotButtons(222,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson222 .is_sam').show();
			$('#lesson222 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson222 .is_sam').hide();
			$('#lesson222 .is_sue').show();
		}

		if(Course.oState.card222 < 1)
		{
			Course.oState.card222 = 1;
			OCookies.set("card222",Course.oState.card222);
		}

		if(!Lesson222.f_pre)
		{
			Lesson222.f_pre = true;

			$('#lesson222 .tips-slider').slick({
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
			Lesson222.viewed_slides = 1;

			$('#lesson222 button.slick-prev, #lesson222 button.slick-next').click(function()
			{
				var curr_slide = $('#lesson222 .slick-list .slick-active');
				var ind = curr_slide.find('input.num').val();

				switch(parseInt(ind))
				{
					case 1:
						Lesson222.viewed_slides |= 1;
						Lesson222.disSliderBut(true);
						Lesson222.initSlide1();
						Lesson222.animSlide1();
						break;
					case 2:
						Lesson222.viewed_slides |= 2;
						break;
				}

				var n = 0, i;
				for(i=0; i<Lesson222.n_slides; i++)
				{
					if((Lesson222.viewed_slides >> i) & 1) n++;
				}

				Course.oState.card222 = n*100 / Lesson222.n_slides;
				OCookies.set("card222", Course.oState.card222);

				if(n >= Lesson222.n_slides)
				{
					//enable NEXT button
					Course.enaBotNextButton(222,true);
				}
			});
		}
	},

	disSliderBut: function(mode)
	{
		$('#lesson222 .tips-slider button').prop('disabled', mode);
	},

	initSlide1: function()
	{
		$('#lesson222 .tip1 .man, #lesson222 .tip1 .ring').hide();
		Lesson222.disSliderBut(true);
	},

	animSlide1: function()
	{
		//start anim
		setTimeout(function()
		{
			$('#lesson222 .tip1 .man').fadeIn(500);
		},2000);

		setTimeout(function()
		{
			$('#lesson222 .tip1 .ring').fadeIn(500);
			Lesson222.disSliderBut(false);
		}, 3000);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson222.pre();
				Lesson222.initSlide1();
				Course.enaBotNextButton(222,false);

				Course.showLesson(222, function()
				{
					$(window).resize(); //for slider
					Course.showBotButtons(222,true);

					if(Lesson222.first_anim)
					{
						Lesson222.first_anim = 0;
						Lesson222.animSlide1();
					}
					else
					{
						var curr_slide = $('#lesson222 .slick-list .slick-active');
						var ind = curr_slide.find('input.num').val();
						if(parseInt(ind) == 1)
						{
							Lesson222.disSliderBut(true);
							Lesson222.animSlide1();
						}
						else
						{
							Lesson222.disSliderBut(false);
						}
					}

					Course.showBotButtons(222,true);
				}, 1500);
				break;
			case 1:
				Lesson220.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson220.next(0);
	}
};
