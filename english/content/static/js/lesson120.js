/* PHYSICAL SECURITY - 5 cards 
	121 - Explainer video
	122 - Clean Desk Policy
	123 - Handling sensitive information
	124 - Challenge 1
	125 - Challenge 2
*/
var Lesson120 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(120,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson120 .is_sam').show();
			$('#lesson120 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson120 .is_sam').hide();
			$('#lesson120 .is_sue').show();
		}
		
		$('#lesson120 div.card').hide();

		Lesson120.setCardIco();
		
		if(!Lesson120.f_pre)
		{
			Lesson120.f_pre = true;
			
			$('#lesson120 div.card').click(function()
			{
				if($(this).hasClass('card121')) Lesson121.next(0);
				if($(this).hasClass('card122')) Lesson122.next(0);
				if($(this).hasClass('card123')) Lesson123.next(0);
				if($(this).hasClass('card124')) Lesson124.next(0);
				if($(this).hasClass('card125')) Lesson125.next(0);
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

		if(Course.oState.card121  >= 100) //video
			setIco($('#lesson120 div.card121'), 'a');
		else if(Course.oState.card121 >= 1)
			setIco($('#lesson120 div.card121'), 'p');

		if(Course.oState.card122  >= 100) //clean desk
			setIco($('#lesson120 div.card122'), 'a');

		if(Course.oState.card123  >= 100) //handling
			setIco($('#lesson120 div.card123'), 'a');

		if(Course.oState.card124  >= 100) //challenge1
			setIco($('#lesson120 div.card124'), 'a');
		else if(Course.oState.card124 >= 1)
			setIco($('#lesson120 div.card124'), 'p');

		if(Course.oState.card125  >= 100) //challenge2
			setIco($('#lesson120 div.card125'), 'a');
		else if(Course.oState.card125 >= 1)
			setIco($('#lesson120 div.card125'), 'p');
	},

	showCards: function()
	{
		$('#lesson120 div.card121').fadeIn(400, function()
		{
			$('#lesson120 div.card121').fadeIn(400, function()
			{
				$('#lesson120 div.card122').fadeIn(400, function()
				{
					$('#lesson120 div.card123').fadeIn(400, function()
					{
						$('#lesson120 div.card124').fadeIn(400, function()
						{
							$('#lesson120 div.card125').fadeIn(400, function()
							{
								Course.showBotButtons(120,true);
							});
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
				Course.enaLessonMenu(120);
				Lesson120.pre();
				$('#lesson120 .page-book').show();
				$('#lesson120 .page-chapter').hide();
				$('#lesson120 .page-book .chapter-book').removeClass('active');

				Course.showLesson(120, function()
				{
					$('#lesson120 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
        				Course.setLessonFragment(120,1);
						Course.showBotButtons(120,true);
					}, 1000);
				});
				break;

			case 1:
				if(Course.oState.currFragment > 1)
				{
					Lesson130.next(0);
					break;
				}

				//else next page
				setTimeout(function()
				{
					$('#lesson120 .page-book').fadeOut(1000);
					Course.setLessonFragment(120,2);
				},500);

				$('#lesson120 .page-chapter').fadeIn(1500, function()
				{
					Lesson120.showCards();
				});
				break;

			case 2:
				Lesson120.pre();
				$('#lesson120 .page-book').hide();
				$('#lesson120 .page-chapter').show();
				Course.showLesson(120, function()
				{
					Lesson120.showCards();
					Course.setLessonFragment(120,2);
					Course.showBotButtons(120,true);
				});
				break;
		}
	},

	back: function()
	{
		if(Course.oState.currFragment > 1)
		{
			$('#lesson120 .page-book .chapter-book').removeClass('active');
			setTimeout(function()
			{
				$('#lesson120 .page-book').fadeIn(1000, function()
				{
					$('#lesson120 .page-book .chapter-book').addClass('active');
					Course.setLessonFragment(120,1);
				});
			},500);

			$('#lesson120 .page-chapter').fadeOut(1500);
			return;
		}

		Lesson60.next(0);
	}
};

var Lesson121 = {
	video_init: false,
	video_player: null,
	video_started: false,
	video_finished: false,
	video_duration: 1,
	viewed_slides: 1,

	pre: function()
	{
		Course.showBotButtons(121,false);

		if(!Lesson121.video_init)
		{
			Lesson121.video_player = $("#lesson121 .vplayer").flowplayer()
				.on("finish", function(e, api) {
					console.log("finished video121");
					Lesson121.video_finished = true;
					Course.oState.card121 = 100;
					OCookies.set("card121",Course.oState.card121);
					lucyDispatchEvent("physical security awareness video finished");
				})
				.on("progress", function(e) {
					Lesson121.video_started = true;
				})
				.on("ready", function (e) {
					Lesson121.video_player = flowplayer($("#lesson121 .vplayer"));
					if(Lesson121.video_player)
					{
						Lesson121.video_duration = Lesson121.video_player.video.duration;
						console.log("video121 ready", Lesson121.video_duration);
						Course.videoModify("#lesson121 .vplayer");
						Lesson121.video_init = true;
						if(Course.oState.card121 < 1)
						{
							Course.oState.card121 = 1;
							OCookies.set("card121",Course.oState.card121);
						}
					}
				});
		}
	},

	videoPause: function()
	{
		if(Lesson121.video_duration > 1)
		{
			Lesson121.video_player.pause();
			Lesson121.video_player.seekTo(0);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson121.pre();
				Course.showLesson(121, function()
				{
					Course.showBotButtons(121,true);

					if(Lesson121.video_duration > 1)
					{
						Lesson121.video_player.play();
					}
				});
				break;

			case 1: //back to 120
				Lesson121.videoPause();
				Lesson120.next(2);
		}
	},
};

var Lesson122 = {
	pre: function()
	{
		Course.showBotButtons(122,false);

		$('#lesson122 img.pre').hide();
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson122.pre();
				Course.showLesson(122, function()
				{
					var t = 1000;
					setTimeout(function()
					{
						$('#lesson122 img.pc').fadeIn(300);
						setTimeout(function()
						{
							$('#lesson122 .stic1').fadeIn(300);
							setTimeout(function()
							{
								$('#lesson122 .stic2').fadeIn(300);
								setTimeout(function()
								{
									$('#lesson122 .sign1').fadeIn(300);
									setTimeout(function()
									{
										$('#lesson122 .sign2').fadeIn(300, function()
										{
											Course.showBotButtons(122,true);
										});
									}, t);
								}, t);
							}, t);
						}, t);
					}, 700);
				});
				break;

			case 1:
				Lesson1221.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson120.next(2);
	}
};

var Lesson1221 = {
	pre: function()
	{
		Course.showBotButtons(1221,false);

		$('#lesson1221 img.imgarr').hide();
		$('#lesson1221 img.bg').css({
			'width': '753px',
			'margin-top': '0',
			'margin-left': '0'
		});
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson1221.pre();
				Course.showLesson(1221, function()
				{
					setTimeout(function()
					{
						$('#lesson1221 img.bg').animate({
							'width': '1200px',
							'margin-top': '-76px',
							'margin-left': '-197px'
						}, 1500);

						setTimeout(function()
						{
							$('#lesson1221 img.imgarr').fadeIn(500);

							Course.oState.card122 = 100;
							OCookies.set("card122", Course.oState.card122);

							Course.showBotButtons(1221,true);
						}, 1700);
					}, 1200);
				});
				break;

			case 1:
				Lesson120.next(2);
				break;
		}
	}
};

var Lesson123 = {
	pre: function()
	{
		Course.showBotButtons(123,false);

		$('#lesson123 img.bin, #lesson123 img.printer').hide();
		$('#lesson123 img.secret1, #lesson123 img.secret2').hide();


		$('#lesson123 .ddocl').css({
			'top': '-219px',
			'left': '-292px'
		});
		$('#lesson123 .ddocl .docl').show();

		$('#lesson123 .ddocr').css({
			'top': '-197px',
			'left': '264px'
		});
		$('#lesson123 .ddocr .docr').hide();
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson123.pre();
				Course.showLesson(123, function()
				{
					var t = 600;
					//setTimeout(function()
					//{
						$('#lesson123 .bin').fadeIn(300);
						setTimeout(function()
						{
							$('#lesson123 .secret1').fadeIn(300);
							setTimeout(function()
							{
								$('#lesson123 .printer').fadeIn(300);
								setTimeout(function()
								{
									$('#lesson123 .secret2').fadeIn(300);

									$('#lesson123 .ddocl').animate({
										'top': '-8px',
										'left': '-50px'
									}, 2000, function()
									{
										$('#lesson123 .ddocl .docl').fadeOut(400);
										//setTimeout(function()
										//{
											$('#lesson123 .ddocl').animate({
												'top': '-219px',
												'left': '-292px'
											}, 2000);

											setTimeout(function()
											{
												$('#lesson123 .ddocr').animate({
													'top': '11px',
													'left': '128px'
												}, 1700, function()
												{
													$('#lesson123 .ddocr .docr').fadeIn(300);
													//setTimeout(function()
													//{
														$('#lesson123 .ddocr').animate({
															'top': '-244px',
															'left': '288px'
														}, 1700, function()
														{
															Course.oState.card123 = 100;
															OCookies.set("card123", Course.oState.card123);

															Course.showBotButtons(123,true);
														});
													//}, 100);
												});
											}, 1600);
										//}, 500);
									});
								}, t);
							}, t);
						}, t);
					//}, 500);
				});
				break;

			case 1:
				Lesson120.next(2);
				break;
		}
	},
};

var Lesson124 = {
	f_pre: false,
	answers: 0,

	pre: function()
	{
		Course.showBotButtons(124,false);
		Course.enaBotNextButton(124,false);

		$('#lesson124 img.hint').hide();
		$('#lesson124 .bubble2').show();
		Lesson124.popup(0);

		if(Course.oState.card124 < 1)
		{
			Course.oState.card124 = 1;
			OCookies.set("card124",Course.oState.card124);
		}

		if(!Lesson124.f_pre)
		{
			Lesson124.f_pre = true;

			$('#lesson124 div.spot').click(function()
			{
				$('#lesson124 .bubble2').hide();

				if($(this).hasClass('spot-124-4'))
				{
					Lesson124.popup(4);
					Lesson124.answers |= 1;
				}

				if($(this).hasClass('spot-124-5'))
				{
					Lesson124.popup(5);
					Lesson124.answers |= 2;
				}

				if($(this).hasClass('spot-124-6'))
				{
					Lesson124.popup(6);
					Lesson124.answers |= 4;
				}

				if($(this).hasClass('spot-124-7'))
				{
					Lesson124.popup(7);
					Lesson124.answers |= 8;
				}

				if(Lesson124.answers == 15)
				{
					Course.enaBotNextButton(124,true);
					Course.oState.card124 = 100;
					OCookies.set("card124", Course.oState.card124);
				}
			});

			$('#lesson124 .lesson-msg').click(function()
			{
				Lesson124.popup(0);
			});
		}
	},

	popup: function(id)
	{
		if(id < 1)
		{
			$('#lesson124 .lesson-msg').hide();
			return;
		}

		var i;
		for(i=4; i<=7; i++)
		{
			if(i == id)	$('#d-lesson124-m' + id).fadeIn(400);
			else $('#d-lesson124-m' + i).hide();
		}
	},

	hint: function()
	{
		if($('#lesson124 img.hint').is(':visible')) $('#lesson124 img.hint').hide();
		else $('#lesson124 img.hint').show();
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson124.pre();
				Course.showLesson(124, function()
				{
					Course.showBotButtons(124,true);
				});
				break;

			case 1:
				Lesson120.next(2);
				break;
		}
	},

	back: function()
	{
		Lesson120.next(2);
	}
};

var Lesson125 = {
	nCorrAnsw: 0,

	pre: function()
	{
		Course.showBotButtons(125,false);
		Course.enaBotNextButton(125,false);

		Lesson125.popup(0);

		$('#lesson125 .some-hint').show();
		$('#lesson125 .qmask').hide();
		$('#lesson125 .lesson-msg .body-q').show();
		Lesson125.nCorrAnsw = 0;

		if(Course.oState.card125 < 1)
		{
			Course.oState.card125 = 1;
			OCookies.set("card125",Course.oState.card125);
		}
	},

	setPercent: function()
	{
		var perc = Lesson125.nCorrAnsw / 5 * 100.0;
		Course.oState.card125 = parseInt(perc);
		OCookies.set("card125", Course.oState.card125);
	},

	popup: function(n, mode)
	{
		if(n < 1)
		{
			$('#lesson125 .lesson-msg').hide();
			return;
		}

		var i;

		if(mode == true)
		{
			for(i=1; i<=5; i++)
			{
				if(i == n) $('#lesson125 .lesson125-m' + n).fadeIn(400);
				else $('#d-lesson125-m' + i).hide();
			}
		}
		else $('#lesson125 .lesson125-m' + n).fadeOut(400);
	},

	clickMap: function(name)
	{
		var hint;
		var n;

		$('#lesson125 .lesson-msg, #lesson125 .body-yes, #lesson125 .body-no').hide();

		switch(name)
		{
			case 'phone': n = 1; hint = $('#lesson125 .phone-hint'); break;
			case 'doc':   n = 2; hint = $('#lesson125 .docs-hint'); break;
			case 'trash': n = 3; hint = $('#lesson125 .trash-hint'); break;
			case 'stic1': n = 4; hint = $('#lesson125 .stic1-hint'); break;
			case 'stic2': n = 4; hint = $('#lesson125 .stic2-hint'); break;
			case 'stic3': n = 5; hint = $('#lesson125 .stic3-hint'); break;
		}

		if(hint.is(':visible'))
		{
			if(n == 4) $('#lesson125 .stic1-hint,#lesson125 .stic2-hint').hide();
			else hint.hide();
			Lesson125.showQuestion(n);
		}

		//all question answered?
		hint = $('#lesson125 .some-hint:visible');
		if(hint.length == 0)
		{
			Course.enaBotNextButton(125,true);
		}
	},

	showQuestion: function(n)
	{
		Lesson125.popup(n,true);
		$('#lesson125 .qmask').show();
	},

	clickYes: function(n)
	{
		Lesson125.nCorrAnsw++;
		Lesson125.setPercent();

		Course.lucyAnswer(125,n-1,true);

		$('#lesson125 .lesson125-m'+n+' .body-q').fadeOut(200, function()
		{
			$('#lesson125 .lesson125-m'+n+' .body-yes').fadeIn(500);
			$('#lesson125 .qmask').hide();

			//all question answered?
			var hints = $('#lesson125 .some-hint:visible');
			if(hints.length == 0)
			{
				$('#lesson125 .qmask').show();
			}
		});
	},

	clickNo: function(n)
	{
		Course.lucyAnswer(125,n-1,false);
		Lesson125.setPercent();

		$('#lesson125 .lesson125-m'+n+' .body-q').fadeOut(200, function()
		{
			$('#lesson125 .lesson125-m'+n+' .body-no').fadeIn(500);
			$('#lesson125 .qmask').hide();

			//all question answered?
			var hints = $('#lesson125 .some-hint:visible');
			if(hints.length == 0)
			{
				$('#lesson125 .qmask').show();
			}
		});
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson125.pre();

				Course.showLesson(125, function()
				{
					//attempts
					Course.oState.card125n++;
					OCookies.set("card125n", Course.oState.card125n);
					console.log("125 attempt",Course.oState.card125n);

					if(Course.oState.card125n > 5)
					{
						//too many attempts!
						Course.oState.card125n = 0; //reset attempts
						OCookies.set("card125n", Course.oState.card125n);

						//message: You did not manage to complete the challenge in a reasonable number of attempts.
						Course.greyPopup(125, 2, true);
						return;
					}
					//

					Course.showBotButtons(125,true);
				});
				break;

			case 1:
				Lesson120.next(2);
				break;

			case 100:
				//hide message
				Course.greyPopup(125, 1, false);
				break;
		}
	},

	back: function(n)
	{
		switch(n)
		{
			case 0:
				//message: Warning: If you go back, you will abort the current challenge.
				Course.greyPopup(125, 1, true);
				break;
			case 1:
				Course.greyPopup(125, 1, false);
				Lesson120.next(2);
				break;
			case 2:
				Course.greyPopup(125, 2, false);
				Lesson120.next(0);
				break;
		}
	}
};
