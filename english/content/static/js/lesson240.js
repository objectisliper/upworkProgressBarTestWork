/* 4 cards  (malware)
	241 - Types of Malware
	242 - Prevention
	243 - movie
	244 - Challenge
*/

//"book" before chapter8
var Lesson230 = {
	pre: function()
	{
		Course.showBotButtons(230,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson230.pre();
				Course.enaLessonMenu(230);
				$('#lesson230 .page-book .chapter-book').removeClass('active');

				Course.showLesson(230, function()
				{
					$('#lesson230 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(230,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson240.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson220.next(0);
	}
};

var Lesson240 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(240,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson240 .is_sam').show();
			$('#lesson240 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson240 .is_sam').hide();
			$('#lesson240 .is_sue').show();
		}
		
		$('#lesson240 div.card').hide();
		Lesson240.setCardIco();

		if(!Lesson240.f_pre)
		{
			Lesson240.f_pre = true;
			
			$('#lesson240 div.card').click(function()
			{
				if($(this).hasClass('card241')) Lesson241.next(0);
				if($(this).hasClass('card242')) Lesson242.next(0);
				if($(this).hasClass('card243')) Lesson243.next(0);
				if($(this).hasClass('card244')) Lesson244.next(0);
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

		if(Course.oState.card241  >= 100) //types
			setIco($('#lesson240 div.card241'), 'a');
		else if(Course.oState.card241 >= 1)
			setIco($('#lesson240 div.card241'), 'p');

		if(Course.oState.card242  >= 100) //Prevention
			setIco($('#lesson240 div.card242'), 'a');
		else if(Course.oState.card242 >= 1)
			setIco($('#lesson240 div.card242'), 'p');

		if(Course.oState.card243  >= 100) //movie
			setIco($('#lesson240 div.card243'), 'a');
		else if(Course.oState.card243 >= 1)
			setIco($('#lesson240 div.card243'), 'p');

		if(Course.oState.card244  >= 100) //Challenge
			setIco($('#lesson240 div.card244'), 'a');
		else if(Course.oState.card244 >= 1)
			setIco($('#lesson240 div.card244'), 'p');
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson240.pre();
				Course.showLesson(240, function()
				{
					$('#lesson240 div.card243').fadeIn(400, function()
					{
						$('#lesson240 div.card241').fadeIn(400, function()
						{
							$('#lesson240 div.card242').fadeIn(400, function()
							{
								$('#lesson240 div.card244').fadeIn(400, function()
								{
									Course.showBotButtons(240,true);
								});
							});
						});
					});
				});
				break;
			case 1:
				Lesson250.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson230.next(0);
	}
};

var Lesson241 = {
	f_pre: false,
	n_acc: 0, //number of accordion items
	row1cy: 0,

	pre: function()
	{
		Course.showBotButtons(241,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson241 .is_sam').show();
			$('#lesson241 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson241 .is_sam').hide();
			$('#lesson241 .is_sue').show();
		}

		if(Course.oState.card241 < 1)
		{
			Course.oState.card241 = 1;
			OCookies.set("card241", Course.oState.card241);
		}

		if(!Lesson241.f_pre)
		{
			Lesson241.f_pre = true;

			Lesson241.n_acc = $('#lesson241 .accordion > h3').length;
			$('#lesson241 .accordion > h3').attr('data-act',0);

			$('#lesson241 .accordion').accordion({
				collapsible: true,
				heightStyle: "content",
				active: false,
				activate: function(event, ui) {
					ui.newHeader.attr('data-act',1);

					//calc count of data-act=1
					var n = 0;
					$('#lesson241 .accordion > h3').each(function()
					{
						if($(this).attr('data-act') == 1) n++;
					});
					//console.log("n act",n,ui.newHeader);
					Course.oState.card241 = n/Lesson241.n_acc * 100;
					OCookies.set("card241", Course.oState.card241);

					if(n == Lesson241.n_acc)
					{
						lucyDispatchEvent('"Malware types" card was passed');
					}
				},
				beforeActivate: function(event, ui) {
					//hide/show row1
					if(ui.newHeader.length > 0)
					{
						Lesson241.row1cy = $('#lesson241 .row1').height();
						$('#lesson241 .row1').animate({
							height: 0
						}, 400, function()
						{
							$('#lesson241 .accordion').css({ 'margin-top': '-10px' });
						});
					}
					else
					{
						$('#lesson241 .row1').show(400);
						$('#lesson241 .row1').animate({
							height: Lesson241.row1cy
						}, 400, function()
						{
							$('#lesson241 .row1').css('height','auto');
							$('#lesson241 .accordion').css({ 'margin-top': '0px' });
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
				Lesson241.pre();
				Course.showLesson(241, function()
				{
					Course.showBotButtons(241,true);
				});
				break;
			case 1: //back to 240
				Lesson240.next(0);
		}
	},
};

var Lesson242 = {
	f_pre: false,
	n_acc: 0, //number of accordion items
	row1cy: 0,

	pre: function()
	{
		Course.showBotButtons(242,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson242 .is_sam').show();
			$('#lesson242 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson242 .is_sam').hide();
			$('#lesson242 .is_sue').show();
		}

		if(Course.oState.card242 < 1)
		{
			Course.oState.card242 = 1;
			OCookies.set("card242", Course.oState.card242);
		}

		if(!Lesson242.f_pre)
		{
			Lesson242.f_pre = true;

			Lesson242.n_acc = $('#lesson242 .accordion > h3').length;
			$('#lesson241 .accordion > h3').attr('data-act',0);

			$('#lesson242 .accordion').accordion({
				collapsible: true,
				heightStyle: "content",
				active: false,
				activate: function(event, ui) {
					ui.newHeader.attr('data-act',1);

					//calc count of data-act=1
					var n = 0;
					$('#lesson242 .accordion > h3').each(function()
					{
						if($(this).attr('data-act') == 1) n++;
					});
					//console.log("n act",n,ui.newHeader);
					Course.oState.card242 = n/Lesson242.n_acc * 100;
					OCookies.set("card242", Course.oState.card242);

					if(n == Lesson242.n_acc)
					{
						lucyDispatchEvent('"Malware Prevention" card was passed');
					}
				},
				beforeActivate: function(event, ui) {
					//hide/show row1
					if(ui.newHeader.length > 0)
					{
						Lesson242.row1cy = $('#lesson242 .row1').height();
						$('#lesson242 .row1').animate({
							height: 0
						}, 400, function()
						{
							$('#lesson242 .accordion').css({ 'margin-top': '-10px' });
						});
					}
					else
					{
						$('#lesson242 .row1').show(400);
						$('#lesson242 .row1').animate({
							height: Lesson241.row1cy
						}, 400, function()
						{
							$('#lesson242 .row1').css('height','auto');
							$('#lesson242 .accordion').css({ 'margin-top': '0px' });
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
				Lesson242.pre();
				Course.showLesson(242, function()
				{
					Course.showBotButtons(242,true);
				});
				break;
			case 1: //back to 240
				Lesson240.next(0);
		}
	},
};

var Lesson243 = {
	video_init: false,
	video_player: null,
	video_started: false,
	video_finished: false,
	video_duration: 1,
	viewed_slides: 1,

	pre: function()
	{
		Course.showBotButtons(243,false);

		if(!Lesson243.video_init)
		{
			Lesson243.video_player = $("#lesson243 .vplayer").flowplayer()
				.on("finish", function(e, api) {
					console.log("finished video243");
					Lesson243.video_finished = true;
					Course.oState.card243 = 100;
					OCookies.set("card243",Course.oState.card243);
					lucyDispatchEvent("phishing video finished");
				})
				.on("progress", function(e) {
					Lesson243.video_started = true;
				})
				.on("ready", function (e) {
					Lesson243.video_player = flowplayer($("#lesson243 .vplayer"));
					if(Lesson243.video_player)
					{
						Lesson243.video_duration = Lesson243.video_player.video.duration;
						console.log("video243 ready", Lesson243.video_duration);
						Lesson243.video_init = true;
						Course.videoModify("#lesson243 .vplayer");
						if(Course.oState.card243 < 1)
						{
							Course.oState.card243 = 1;
							OCookies.set("card243",Course.oState.card243);
						}
					}
				});
		}
	},

	videoPause: function()
	{
		if(Lesson243.video_duration > 1)
		{
			Lesson243.video_player.pause();
			Lesson243.video_player.seekTo(0);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson243.pre();
				Course.showLesson(243, function()
				{
					Course.showBotButtons(243,true);

					if(Lesson243.video_duration > 1)
					{
						Lesson243.video_player.play();
					}
				});
				break;

			case 1: //back to 80
				Lesson243.videoPause();
				Lesson240.next(0);
		}
	},
};
