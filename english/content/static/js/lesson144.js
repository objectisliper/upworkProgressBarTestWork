/* les144 */
var Lesson144 = {
	f_pre: false,
	n_slides: 11,
	viewed_slides: 0,

	pre: function()
	{
		Course.showBotButtons(144,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson144 .is_sam').show();
			$('#lesson144 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson144 .is_sam').hide();
			$('#lesson144 .is_sue').show();
		}

		if(Course.oState.card144 < 1)
		{
			Course.oState.card144 = 1;
			OCookies.set("card144",Course.oState.card144);
		}

		if(!Lesson144.f_pre)
		{
			Lesson144.f_pre = true;

			$('#lesson144 .block .tips-slider').slick({
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
			Lesson144.viewed_slides = 1;

			$('#lesson144 button.slick-prev, #lesson144 button.slick-next').click(function()
			{
				var curr_slide = $('#lesson144 .slick-list .slick-active');
				var ind = parseInt(curr_slide.attr('data-slick-index'));
				switch(ind)
				{
					case 1: Lesson144.viewed_slides |= 2; break;
					case 2: Lesson144.viewed_slides |= 4; break;
					case 3: Lesson144.viewed_slides |= 8; break;
					case 4: Lesson144.viewed_slides |= 16; break;
					case 5: Lesson144.viewed_slides |= 32; break;
					case 6: Lesson144.viewed_slides |= 64; break;
					case 7: Lesson144.viewed_slides |= 128; break;
					case 8: Lesson144.viewed_slides |= 256; break;
					case 9: Lesson144.viewed_slides |= 512; break;
					case 10: Lesson144.viewed_slides |= 1024; break;
					case 11: Lesson144.viewed_slides |= 2048; break;
					case 12: Lesson144.viewed_slides |= 4096; break;
				}

				var n = 0, i;
				for(i=0; i<=12; i++)
				{
					if((Lesson144.viewed_slides >> i) & 1) n++;
				}

				//8 slides + 1 last page
				Course.oState.card144 = n*100 / Lesson144.n_slides;
				//if the last page exists then:
				//Course.oState.card144 = n*100 / (Lesson144.n_slides+1.0);
				OCookies.set("card144", Course.oState.card144);

				if(n >= Lesson144.n_slides)
				{
					//enable NEXT button
					Course.enaBotNextButton(144,true);
				}
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson144.pre();
				$('#lesson144 .block1').show();
				$('#lesson144 .block2').hide();
				$('#lesson144 .block1 .lbub').css('left', '-164px');
				Course.enaBotNextButton(144,false);
				Course.showLesson(144, function()
				{
					$(window).resize(); //for slider

					setTimeout(function()
					{
						$('#lesson144 .block1 .lbub').animate({
							'left': '79px'
						}, 1000);
					}, 800);

					Course.setLessonFragment(144,1);
					Course.showBotButtons(144,true);
				}, 1500);
				break;
			case 1:
				//if page = 2 go to 140
				//if(Course.oState.currFragment == 2)
				//{
					Lesson140.next(2);
					break;
				//}

				/*
				//page2 - the last page
				Course.showBotButtons(144,false);

				setTimeout(function()
				{
					$('#lesson144 .block1').fadeOut(1000);
				},500);

				$('#lesson144 .block2').fadeIn(1500);

				setTimeout(function()
				{
					Course.oState.card144 = 100;
					OCookies.set("card144", Course.oState.card144);

					Course.setLessonFragment(144,2);
					Course.showBotButtons(144,true);
				}, 1500);
				break;
				*/
		}
	},

	back: function()
	{
		//if page = 2 go to 144 / page 1
		if(Course.oState.currFragment == 2)
		{
			Course.showBotButtons(144,false);
			Course.enaBotNextButton(144,false);

			setTimeout(function()
			{
				$('#lesson144 .block2').fadeOut(1000);
			},500);

			$('#lesson144 .block1').fadeIn(1500);
			setTimeout(function()
			{
				Course.setLessonFragment(144,1);
				Course.showBotButtons(144,true);
			},1500);
			return;
		}

		Lesson140.next(2);
	}
};
