/* SECURITY INCIDENTS */

//"book" before chapter9
var Lesson250 = {
	pre: function()
	{
		Course.showBotButtons(250,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Course.enaLessonMenu(250);
				Lesson250.pre();
				$('#lesson250 .page-book .chapter-book').removeClass('active');

				Course.showLesson(250, function()
				{
					$('#lesson250 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(250,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson260.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson240.next(0);
	}
};

var Lesson260 = {
	pre: function()
	{
		Course.showBotButtons(260,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson260 .is_sam').show();
			$('#lesson260 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson260 .is_sam').hide();
			$('#lesson260 .is_sue').show();
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson260.pre();
				Course.showLesson(260, function()
				{
					if(Course.oState.card261 < 1)
					{
						Course.oState.card261 = 1;
						OCookies.set("card261",Course.oState.card261);
					}

					Course.setLessonFragment(260,1);
					Course.showBotButtons(260,true);
				});
				break;

			case 1:
				Lesson261.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson250.next(0);
	}
};

/* TIPs */
var Lesson261 = {
	f_pre: false,
	n_slides: 4,
	viewed_slides: 0,

	pre: function()
	{
		Course.showBotButtons(261,false);
		$('#lesson261 .bg .lbub').css('left', '-164px');

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson261 .is_sam').show();
			$('#lesson261 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson261 .is_sam').hide();
			$('#lesson261 .is_sue').show();
		}

		if(Course.oState.card261 < 1)
		{
			Course.oState.card261 = 1;
			OCookies.set("card261",Course.oState.card261);
		}

		if(!Lesson261.f_pre)
		{
			Lesson261.f_pre = true;

			$('#lesson261 .tips-slider').slick({
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
			Lesson261.viewed_slides = 1;

			$('#lesson261 button.slick-prev, #lesson261 button.slick-next').click(function()
			{
				var curr_slide = $('#lesson261 .slick-list .slick-active');
				var ind = parseInt(curr_slide.attr('data-slick-index'));
				switch(ind)
				{
					case 1: Lesson261.viewed_slides |= 2; break;
					case 2: Lesson261.viewed_slides |= 4; break;
					case 3: Lesson261.viewed_slides |= 8; break;
					case 4: Lesson261.viewed_slides |= 16; break;
				}

				var n = 0, i;
				for(i=0; i<Lesson261.n_slides; i++)
				{
					if((Lesson261.viewed_slides >> i) & 1) n++;
				}

				Course.oState.card261 = n*100 / Lesson261.n_slides;
				OCookies.set("card261", Course.oState.card261);

				if(n >= Lesson261.n_slides)
				{
					//enable NEXT button
					Course.enaBotNextButton(261,true);
				}
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson261.pre();
				Course.enaBotNextButton(261,false);
				Course.showLesson(261, function()
				{
					$(window).resize(); //for slider

					setTimeout(function()
					{
						$('#lesson261 .bg .lbub').animate({
							'left': '79px'
						}, 1000);
					}, 800);

					Course.showBotButtons(261,true);
				}, 1500);
				break;
			case 1:
				Lesson280.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson260.next(0);
	}
};
