/* Soc Media usage - 2 cards 
	201 - Risks
	202 - TIPs
*/

//"book" before chapter6
var Lesson190 = {
	pre: function()
	{
		Course.showBotButtons(190,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Course.enaLessonMenu(190);
				Lesson190.pre();
				$('#lesson190 .page-book .chapter-book').removeClass('active');

				Course.showLesson(190, function()
				{
					$('#lesson190 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(190,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson200.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson181.next(0);
	}
};

var Lesson200 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(200,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson200 .is_sam').show();
			$('#lesson200 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson200 .is_sam').hide();
			$('#lesson200 .is_sue').show();
		}

		$('#lesson200 div.card').hide();
		Lesson200.setCardIco();

		if(!Lesson200.f_pre)
		{
			Lesson200.f_pre = true;
			
			$('#lesson200 div.card').click(function()
			{
				if($(this).hasClass('card201')) Lesson201.next(0);
				if($(this).hasClass('card202')) Lesson202.next(0);
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

		if(Course.oState.card201  >= 100) //Risks
			setIco($('#lesson200 div.card201'), 'a');
		else if(Course.oState.card201 >= 1)
			setIco($('#lesson200 div.card201'), 'p');

		if(Course.oState.card202  >= 100) //TIPs
			setIco($('#lesson200 div.card202'), 'a');
		else if(Course.oState.card202 >= 1)
			setIco($('#lesson200 div.card202'), 'p');
	},

	showCards: function()
	{
		$('#lesson200 div.card201').fadeIn(400, function()
		{
			$('#lesson200 div.card202').fadeIn(400, function()
			{
				Course.showBotButtons(200,true);
			});
		});
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson200.pre();
				Course.showLesson(200, function()
				{
					Lesson200.showCards();
				});
				break;

			case 1:
				Lesson210.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson190.next(0);
	}
};

var Lesson201 = {
	f_pre: false,
	n_slides: 5,
	viewed_slides: 0,

	pre: function()
	{
		Course.showBotButtons(201,false);
		$('#lesson201 .bg .lbub').css('left', '-164px');

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson201 .is_sam').show();
			$('#lesson201 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson201 .is_sam').hide();
			$('#lesson201 .is_sue').show();
		}

		if(Course.oState.card201 < 1)
		{
			Course.oState.card201 = 1;
			OCookies.set("card201",Course.oState.card201);
		}

		if(!Lesson201.f_pre)
		{
			Lesson201.f_pre = true;

			$('#lesson201 .tips-slider').slick({
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
			Lesson201.viewed_slides = 1;

			$('#lesson201 button.slick-prev, #lesson201 button.slick-next').click(function()
			{
				var curr_slide = $('#lesson201 .slick-list .slick-active');
				var ind = curr_slide.find('input.num').val();

				switch(parseInt(ind))
				{
					case 1:
						Lesson201.viewed_slides |= 1;
						break;
					case 2:
						Lesson201.viewed_slides |= 2;
						break;
					case 3:
						Lesson201.viewed_slides |= 4;
						break;
					case 4:
						Lesson201.viewed_slides |= 8;
						break;
					case 5:
						Lesson201.viewed_slides |= 16;
						break;
				}

				var n = 0, i;
				for(i=0; i<Lesson201.n_slides; i++)
				{
					if((Lesson201.viewed_slides >> i) & 1) n++;
				}

				Course.oState.card201 = n*100 / Lesson201.n_slides;
				OCookies.set("card201", Course.oState.card201);

				if(n >= Lesson201.n_slides)
				{
					//enable NEXT button
					Course.enaBotNextButton(201,true);
				}
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson201.pre();
				Course.enaBotNextButton(201,false);

				Course.showLesson(201, function()
				{
					$(window).resize(); //for slider

					setTimeout(function()
					{
						$('#lesson201 .bg .lbub').animate({
							'left': '79px'
						}, 1000);
					}, 800);
					Course.showBotButtons(201,true);
				}, 1500);
				break;
			case 1:
				Lesson200.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson200.next(0);
	}
};

var Lesson202 = {
	f_pre: false,
	n_slides: 8,
	viewed_slides: 0,

	pre: function()
	{
		Course.showBotButtons(202,false);
		$('#lesson202 .bg .lbub').css('left', '-164px');

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson202 .is_sam').show();
			$('#lesson202 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson202 .is_sam').hide();
			$('#lesson202 .is_sue').show();
		}

		if(Course.oState.card202 < 1)
		{
			Course.oState.card202 = 1;
			OCookies.set("card202",Course.oState.card202);
		}

		if(!Lesson202.f_pre)
		{
			Lesson202.f_pre = true;

			$('#lesson202 .tips-slider').slick({
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
			Lesson202.viewed_slides = 1;

			$('#lesson202 button.slick-prev, #lesson202 button.slick-next').click(function()
			{
				var curr_slide = $('#lesson202 .slick-list .slick-active');
				var ind = curr_slide.find('input.num').val();

				switch(parseInt(ind))
				{
					case 1:
						Lesson202.viewed_slides |= 1;
						break;
					case 2:
						Lesson202.viewed_slides |= 2;
						break;
					case 3:
						Lesson202.viewed_slides |= 4;
						break;
					case 4:
						Lesson202.viewed_slides |= 8;
						break;
					case 5:
						Lesson202.viewed_slides |= 16;
						break;
					case 6:
						Lesson202.viewed_slides |= 32;
						break;
					case 7:
						Lesson202.viewed_slides |= 64;
						break;
					case 8:
						Lesson202.viewed_slides |= 128;
						break;
				}

				var n = 0, i;
				for(i=0; i<Lesson202.n_slides; i++)
				{
					if((Lesson202.viewed_slides >> i) & 1) n++;
				}

				Course.oState.card202 = n*100 / Lesson202.n_slides;
				OCookies.set("card202", Course.oState.card202);

				if(n >= Lesson202.n_slides)
				{
					//enable NEXT button
					Course.enaBotNextButton(202,true);
				}
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson202.pre();
				Course.enaBotNextButton(202,false);

				Course.showLesson(202, function()
				{
					$(window).resize(); //for slider

					setTimeout(function()
					{
						$('#lesson202 .bg .lbub').animate({
							'left': '79px'
						}, 1000);
					}, 800);

					Course.showBotButtons(202,true);
				}, 1500);
				break;
			case 1:
				Lesson200.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson200.next(0);
	}
};
