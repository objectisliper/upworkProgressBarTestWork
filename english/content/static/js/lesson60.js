/* 4 cards
	61 - Phishing, Smishing & Co -----> 80
	62 - Visitors
	63 - Baiting
	64 - Shoulder Surfing
*/

var Lesson60 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(60,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson60 .is_sam').show();
			$('#lesson60 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson60 .is_sam').hide();
			$('#lesson60 .is_sue').show();
		}
		
		$('#lesson60 div.card').hide();

		Lesson60.setCardIco();

		if(!Lesson60.f_pre)
		{
			Lesson60.f_pre = true;
			
			$('#lesson60 div.card').click(function()
			{
				if($(this).hasClass('card61')) Lesson800.next(0);
				if($(this).hasClass('card62')) Lesson620.next(0);
				if($(this).hasClass('card63')) Lesson630.next(0);
				if($(this).hasClass('card64')) Lesson640.next(0);
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

		if(Course.oState.card81  >= 100 && //video
		   Course.oState.card82  >= 100 && //types
		   Course.oState.card83  >= 100 && //what to look
		   Course.oState.card84  >= 100 && //understand URLs
		   Course.oState.card90  >= 100 && //TIPs
		   Course.oState.card101 >= 100 && //challenge: ph quiz
		   Course.oState.card102 >= 100) //challenge: domains
		{
			setIco($('#lesson60 div.card61'), 'a');
		}
		else if(Course.oState.card81  >= 1 || //video
				Course.oState.card82  >= 1 || //types
				Course.oState.card83  >= 1 || //what to look
				Course.oState.card84  >= 1 || //understand URLs
				Course.oState.card90  >= 1 || //TIPs
				Course.oState.card101 >= 1 || //challenge: ph quiz
				Course.oState.card102 >= 1) //challenge: domains
		{
			setIco($('#lesson60 div.card61'), 'p');
		}
		else
		{
			setIco($('#lesson60 div.card61'), '');
		}

		//visitors
		if(Course.oState.card62 >= 100) setIco($('#lesson60 div.card62'), 'a');
		else setIco($('#lesson60 div.card62'), '');

		if(Course.oState.card63 >= 100 && //baiting
		   Course.oState.card73 >= 100) //challenge
			setIco($('#lesson60 div.card63'), 'a');
		else if(Course.oState.card63 >= 1 ||
				Course.oState.card73 >= 1)
			setIco($('#lesson60 div.card63'), 'p');
		else
			setIco($('#lesson60 div.card63'), '');

		//shoulder surfing
		if(Course.oState.card64 >= 100)
			setIco($('#lesson60 div.card64'), 'a');
		else setIco($('#lesson60 div.card64'), '');
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson60.pre();
				Course.showLesson(60, function()
				{
					$('#lesson60 div.card61').fadeIn(400, function()
					{
						$('#lesson60 div.card62').fadeIn(400, function()
						{
							$('#lesson60 div.card63').fadeIn(400, function()
							{
								$('#lesson60 div.card64').fadeIn(400, function()
								{
									Course.showBotButtons(60,true);
								});
							});
						});
					});
				});
				break;
			case 1:
				Lesson120.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson50.next(2);
	}
};

//"book" before chapter1: soc eng / Visitors
var Lesson620 = {
	pre: function()
	{
		Course.showBotButtons(620,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson620.pre();
				$('#lesson620 .page-book .chapter-book').removeClass('active');

				Course.showLesson(620, function()
				{
					$('#lesson620 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(620,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson62.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson60.next(0);
	}
};

var Lesson62 = {
	pre: function()
	{
		Course.showBotButtons(62,false);
		$('#lesson62 .block2 img.hand1').show();
		$('#lesson62 .block2 img.hand2').hide();
		$('#lesson62 .block2 .bubble3').hide();
		$('#lesson62 .block2 img.sign').hide();
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson62.pre();
				$('#lesson62 .block1').show();
				$('#lesson62 .block2').hide();
				Course.showLesson(62, function()
				{
					Course.setLessonFragment(62,1);
					Course.showBotButtons(62,true);
				});
				break;
			case 1:
				if(Course.oState.currFragment == 2)
				{
					Lesson60.next(0);
					return;
				}

				Course.showBotButtons(62,false);
				$('#lesson62 .block1').fadeOut(1500);
				$('#lesson62 .block2').fadeIn(1500, function()
				{
					Course.setLessonFragment(62,2);

					setTimeout(function()
					{
						$('#lesson62 .block2 .bubble3').fadeIn(500, function()
						{
							$('#lesson62 .block2 img.hand1').fadeOut(500);

							setTimeout(function()
							{
								$('#lesson62 .block2 img.hand2').fadeIn(500);
								$('#lesson62 .block2 img.sign').fadeIn(500);
								Course.oState.card62 = 100;
								OCookies.set("card62",Course.oState.card62);
								Course.showBotButtons(62,true);
							}, 800);
						});
					}, 1000);
				});
				break;
		}
	},

	back: function()
	{
		Course.showBotButtons(62,false);

		if(Course.oState.currFragment == 2)
		{
			$('#lesson62 .block2').fadeOut(1500);
			$('#lesson62 .block1').fadeIn(1500, function()
			{
				$('#lesson62 .block2 img.hand1').show();
				$('#lesson62 .block2 img.hand2').hide();
				$('#lesson62 .block2 .bubble3').hide();
				$('#lesson62 .block2 img.sign').hide();

				Course.setLessonFragment(62,1);
				Course.showBotButtons(62,true);
			});
		}
		else
		{
			Lesson620.next(0);
		}
	}
};

//"book" before chapter1: soc eng / Baiting
var Lesson630 = {
	pre: function()
	{
		Course.showBotButtons(630,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson630.pre();
				$('#lesson630 .page-book .chapter-book').removeClass('active');

				Course.showLesson(630, function()
				{
					$('#lesson630 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(630,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson63.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson60.next(0);
	}
};

var Lesson63 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(63,false);
		Lesson63.avatar(1,0);

		$('#lesson63 .bg img.floor, #lesson63 .bg img.people, #lesson63 .bg img.scr, #lesson63 .bg .intro').show();
		$('#lesson63 .bg .block2, #lesson63 .bg .block3').hide();
		$('#lesson63 .bg .block2 .bubble3').hide();

		$('#lesson63 .bg img.board').css({
			'top':'32px',
			'left':'439px',
			'width':'569px',
			'height':'361px',
			'display': 'block'
		});

		if(!Lesson63.f_pre)
		{
			Lesson63.f_pre = true;

			$('#lesson63 .bg .block2 a.aref').hover(
				function()
				{
					var pos = $('#lesson63 .bg .block2 a.aref').position();
					var cybub = $('#lesson63 .bg .block2 .bubble3').outerHeight(true);
					$('#lesson63 .bg .block2 .bubble3').css({
						'top': parseInt(pos.top) - cybub - 35 + 'px',
						'left': pos.left + 35 + 'px'
					}).show();
				},

				function()
				{
					$('#lesson63 .bg .block2 .bubble3').hide();
				}
			);
		}
	},

	avatar: function(m, t) //mode, time
	{
		var ava_active, ava_inactive;
		if(Course.oState.avatar == 0) //0 - Sam
		{
			ava_active = $('#lesson63 img.avatar_sam');
			ava_inactive = $('#lesson63 img.avatar_sue');
			$('#lesson63 span.is_sam').show();
			$('#lesson63 span.is_sue').hide();
		}
		else
		{
			ava_active = $('#lesson63 img.avatar_sue');
			ava_inactive = $('#lesson63 img.avatar_sam');
			$('#lesson63 span.is_sam').hide();
			$('#lesson63 span.is_sue').show();
		}

		if(t == 0)
		{
			if(m == 1)
				ava_active.css({ 'opacity': '1' });
			else
				ava_active.css({ 'opacity': '0' });

			ava_inactive.css({ 'opacity': '0' });
			return;
		}

		//t > 0
		if(m == 1) //fadeIn
		{
			ava_active.animate({
				'opacity': '1'
			}, t);
		}
		else //fadeOut
		{
			ava_active.animate({
				'opacity': '0'
			}, t);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson63.pre();
				Course.showLesson(63, function()
				{
					Course.oState.card63 = 100;
					OCookies.set("card63",Course.oState.card63);

					Course.setLessonFragment(63,1);
					Course.showBotButtons(63,true);
				});
				break;

			case 1:
				if(Course.oState.currFragment == 1) //go to page2
				{
					$('#lesson63 .bg img.floor, #lesson63 .bg img.people, #lesson63 .bg img.scr, #lesson63 .bg .intro').fadeOut(500);
					Lesson63.avatar(0,500);

					$('#lesson63 .bg img.board').animate({
						'left': '-8px',
						'top': '-16px',
						'width': '1026px',
						'height': '621px'
					}, 1500, function()
					{
						$('#lesson63 .bg .block2').fadeIn(500);
						Course.setLessonFragment(63,2);
					});
					break;
				}
				if(Course.oState.currFragment == 2) //go to challenge
				{
					Lesson730.next(0); //challenge for les63
				}				
				break;
		}
	},

	back: function()
	{
		Course.showBotButtons(63,false);

		if(Course.oState.currFragment == 2)
		{
			$('#lesson63 .bg .block2 .bubble3').hide();
			$('#lesson63 .bg .block2').fadeOut(500);

			$('#lesson63 .bg img.board').animate({
				'top':'32px',
				'left':'439px',
				'width':'569px',
				'height':'361px',
				'display': 'block'
			}, 1500, function() {
				Lesson63.avatar(1,500); 
				Course.elFadeIn($('#lesson63 .bg .intro, #lesson63 .bg img.floor, #lesson63 .bg img.people, #lesson63 .bg img.scr'),500);
				Course.setLessonFragment(63,1);
				Course.showBotButtons(63,true);
			});

		}
		else
		{
			Lesson60.next(0);
		}
	}
};

//"book" before chapter1: soc eng / Shoulder Surfing
var Lesson640 = {
	pre: function()
	{
		Course.showBotButtons(640,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson640.pre();
				$('#lesson640 .page-book .chapter-book').removeClass('active');

				Course.showLesson(640, function()
				{
					$('#lesson640 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(640,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson64.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson60.next(0);
	}
};

var Lesson64 = {
	next: function(n)
	{
		switch(n)
		{
			case 0:
				Course.showBotButtons(64,false);
				Course.showLesson(64, function()
				{
					Course.oState.card64 = 100;
					OCookies.set("card64",Course.oState.card64);
					Course.showBotButtons(64,true);
				});
				break;

			case 1:
				Lesson60.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson60.next(0);
	}
};
