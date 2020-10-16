/* test for 63 (baiting) */

//"book" before chapter1: soc eng / Baiting / Challenge
var Lesson730 = {
	pre: function()
	{
		Course.showBotButtons(730,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson730.pre();
				$('#lesson730 .page-book .chapter-book').removeClass('active');

				Course.showLesson(730, function()
				{
					$('#lesson730 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(730,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson73.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson60.next(0);
	}
};

var Lesson73 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(73,false);
		Course.enaBotNextButton(73,false);

		$('#lesson73 .quest .m').hide();
		$('#lesson73 .quest .a').show();

		function blinking_a(el, cl)
		{
			el.addClass(cl);
			setTimeout(function()
			{
				el.removeClass(cl);
				setTimeout(function()
				{
					el.addClass(cl);
					setTimeout(function()
					{
						el.removeClass(cl);
						setTimeout(function()
						{
							el.children('.a').hide();
							el.children('.m').show();
						}, 500);
					}, 150);
				}, 100);
			}, 100);
		}

		if(!Lesson73.f_pre)
		{
			Lesson73.f_pre = true;
			$('#lesson73 div.quest').click(function()
			{
				if($(this).hasClass('quest_732'))
				{
					Course.lucyAnswer(73,0,true);
					blinking_a($(this), 'bl-green');
					Course.enaBotNextButton(73,true);

					Course.oState.card73 = 100;
					OCookies.set("card73",Course.oState.card73);
				}
				else
				{
					Course.lucyAnswer(73,0,false);
					blinking_a($(this), 'bl-red');
				}
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson73.pre();
				Course.showLesson(73, function()
				{
					Course.showBotButtons(73,true);
				});
				break;
			case 1:
				Lesson60.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson63.next(0);
	}
};
