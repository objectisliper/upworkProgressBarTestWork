/* phishing TIPs
	90 - intro
	91 - tip1
	92 - tip2
	93 - tip3
	94 - tip4

	100 - 2 challenges
*/

//"book" before chapter1: soc eng / TIPS
var Lesson900 = {
	pre: function()
	{
		Course.showBotButtons(900,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson900.pre();
				$('#lesson900 .page-book .chapter-book').removeClass('active');

				Course.showLesson(900, function()
				{
					$('#lesson900 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(900,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson90.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson840.next(0);
	}
};

var Lesson90 = {
	bgimg: null,
	f_zoomed: false,
	pre: function()
	{
		Course.showBotButtons(90,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			Lesson90.bgimg = $('#lesson90 .bg img.is_sam');
			$('#lesson90 .is_sam').show();
			$('#lesson90 .is_sue').hide();
		}
		else //1 - Sue
		{
			Lesson90.bgimg = $('#lesson90 .bg img.is_sue');
			$('#lesson90 .is_sam').hide();
			$('#lesson90 .is_sue').show();
		}

		Lesson90.bgimg.css({
			'width': '1065px',
			'height': '567px',
			'margin-top': '0px'
		});

		$('#lesson90 .row-txt').show().css('opacity','1');
		$('#lesson90 .bg div.intro').hide();

		Lesson90.f_zoomed = false;

		if(Course.oState.card90 < 1)
		{
			Course.oState.card90 = 1;
			OCookies.set("card90", 1);
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson90.pre();
				Course.showLesson(90, function()
				{
					Course.showBotButtons(90,true);
				});
				break;

			case 1: //zoom
				if(Lesson90.f_zoomed)
				{
					Lesson91.next(0);
					break;
				}

				Course.showBotButtons(90,false);
				$('#lesson90 .row-txt').fadeOut(500);
				Lesson90.bgimg.animate({
					'width': '2148px',
					'height': '1143px',
					'margin-top': '-83px'
				}, 1500, function()
				{
					$('#lesson90 .bg div.intro').fadeIn(800);
					Course.showBotButtons(90,true);
					Lesson90.f_zoomed = true;
				});
				break;
		}
	},

	back: function()
	{
		Lesson900.next(0);
	}
};

var Lesson91 = {
	f_anim: false, //true - enable go to the next tip
	initTips: function(ntip)
	{
		var rtext_x = 651;
		var rtext_y = 78;
		var rtext_cx = 301;
		var rtext_font = 30;
		var rtext_line = 40;

		//show 1st tip or ntip
		if(!ntip) ntip=1;
		var tip = $('#lesson91 .tip1');
		tip.find('.ltext').css({ 'left': '577px' });
		tip.find('.tipn').css({
			'left': '88px',
			'top': '84px',
			'width': '302px',
			'height': '328px',
			'display': 'block'
		});
		$('#lesson91 .tipbg').css('left','0');

		$('#lesson91 .tip1 .rtext').css({
			'left': rtext_x + 'px',
			'top': rtext_y + 'px',
			'width': rtext_cx + 'px',
			'font-size': rtext_font + 'px',
			'line-height': rtext_line + 'px',
			'opacity': '1'
		});
	},

	animTip: function(ntip)
	{
		Course.showBotButtons(91,false);

		$('#lesson91 .tip'  + ntip + ' .tipn').animate(
		{
			'width': '91px',
			'height': '98px',
			'top': '0px',
			'left': '33px'
		}, 900);

		$('#lesson91 .tip' + ntip + ' .ltext').animate(
		{
			'left': '35px'
		}, 1000, function()
		{
			Lesson91.f_anim = true;
			Course.showBotButtons(91,true);
		});

		$('#lesson91 .tip1 .tipbg').animate(
		{
			'left': '552px'
		});

		$('#lesson91 .tip1 .rtext').animate(
		{
			'left': '819px',
			'top': '449px',
			'font-size': '22px',
			'line-height': '27px',
			'width': '194px',
			'opacity': '0'
		});

		Course.oState.card90 = 25;
		OCookies.set("card90", 25);
	},

	pre: function()
	{
		Course.showBotButtons(91,false);
		Lesson91.initTips();
		Lesson91.f_anim = false;
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson91.pre();
				Course.showLesson(91, function()
				{
					Course.showBotButtons(91,true);
				});
				break;
			case 1:
				if(Lesson91.f_anim)
				{
					Lesson92.next(0);
					break;
				}

				Lesson91.animTip(1);
				break;
		}
	},
};

var Lesson92 = {
	f_anim: false, //true - enable go to the next tip
	initTips: function(ntip)
	{
		var rtext_x = 651;
		var rtext_y = 105;
		var rtext_cx = 301;
		var rtext_font = 30;
		var rtext_line = 40;

		//show 1st tip or ntip
		if(!ntip) ntip=2;
		var tip = $('#lesson92 .tip2');
		tip.find('.ltext').css({ 'left': '577px' });
		tip.find('.tipn').css({
			'left': '88px',
			'top': '84px',
			'width': '302px',
			'height': '328px',
			'display': 'block'
		});
		$('#lesson92 .tipbg').css('left','0');

		$('#lesson92 .tip2 .rtext').css({
			'left': rtext_x + 'px',
			'top': rtext_y + 'px',
			'width': rtext_cx + 'px',
			'font-size': rtext_font + 'px',
			'line-height': rtext_line + 'px',
			'opacity': '1'
		});
	},

	animTip: function(ntip)
	{
		Course.showBotButtons(92,false);

		$('#lesson92 .tip'  + ntip + ' .tipn').animate(
		{
			'width': '91px',
			'height': '98px',
			'top': '0px',
			'left': '33px'
		}, 900);

		$('#lesson92 .tip' + ntip + ' .ltext').animate(
		{
			'left': '35px'
		}, 1000, function()
		{
		});

		$('#lesson92 .tip2 .tipbg').animate(
		{
			'left': '575px'
		});

		$('#lesson92 .tip2 .img2cur').css({ 'left':'501px', 'top':'372px' });
		$('#lesson92 .tip2 .img2link').hide();

		$('#lesson92 .tip2 .rtext').animate(
		{
			'left': '819px',
			'top': '475px',
			'font-size': '22px',
			'line-height': '27px',
			'width': '194px',
			'opacity': '0'
		}, function()
		{
			$('#lesson92 .tip2 .img2cur').animate(
			{
				'left': '402px',
				'top': '189px'
			},1600, function()
			{
				$('#lesson92 .tip2 .img2link').fadeIn(100);

				Lesson92.f_anim = true;
				Course.showBotButtons(92,true);
			});
		});

		Course.oState.card90 = 50;
		OCookies.set("card90", 50);
	},

	pre: function()
	{
		Course.showBotButtons(92,false);
		Lesson92.initTips();
		Lesson92.f_anim = false;
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson92.pre();
				Course.showLesson(92, function()
				{
					Course.showBotButtons(92,true);
				});
				break;
			case 1:
				if(Lesson92.f_anim)
				{
					Lesson93.next(0);
					break;
				}

				Lesson92.animTip(2);
				break;
		}
	},
};

var Lesson93 = {
	f_anim: false, //true - enable go to the next tip
	initTips: function(ntip)
	{
		var rtext_x = 651;
		var rtext_y = 152;
		var rtext_cx = 301;
		var rtext_font = 30;
		var rtext_line = 40;

		//show 1st tip or ntip
		if(!ntip) ntip=3;
		var tip = $('#lesson93 .tip3');
		tip.find('.ltext').css({ 'left': '577px' });
		tip.find('.tipn').css({
			'left': '88px',
			'top': '84px',
			'width': '302px',
			'height': '328px',
			'display': 'block'
		});
		$('#lesson93 .tipbg').css('left','0');

		$('#lesson93 .tip3 .rtext').css({
			'left': rtext_x + 'px',
			'top': rtext_y + 'px',
			'width': rtext_cx + 'px',
			'font-size': rtext_font + 'px',
			'line-height': rtext_line + 'px',
			'opacity': '1'
		});

		$('#lesson93 div.pop-msg').hide();
	},

	animTip: function(ntip)
	{
		Course.showBotButtons(93,false);

		$('#lesson93 .tip3 .img3x').hide();
		$('#lesson93 .tip3 .img3cur').css({ 'left':'510px', 'top':'414px' });
		$('#lesson93 .tip3 .img3virus').css({ 'width':'0', 'height':'0' });
		$('#lesson93 .tip3 .img3varr').hide();

		$('#lesson93 .tip3 .tipbg').animate(
		{
			'left': '575px'
		});

		$('#lesson93 .tip'  + ntip + ' .tipn').animate(
		{
			'width': '91px',
			'height': '98px',
			'top': '0px',
			'left': '33px'
		}, 900);

		$('#lesson93 .tip' + ntip + ' .ltext').animate(
		{
			'left': '35px'
		}, 1000, function()
		{
		});


		$('#lesson93 .tip3 .rtext').animate(
		{
			'left': '819px',
			'top': '475px',
			'font-size': '22px',
			'line-height': '27px',
			'width': '194px',
			'opacity': '0'
		}, function()
		{
			$('#lesson93 .tip3 .img3cur').animate(
			{
				'left': '489px',
				'top': '191px'
			},1600, function()
			{
				$('#lesson93 .tip3 .img3virus').animate(
				{
					'width': '157px',
					'height': '50px'
				},800, function()
				{
					$('#lesson93 .tip3 .img3varr').fadeIn(100);
					setTimeout(function()
					{
						$('#lesson93 .tip3 .img3x').fadeIn(200);
						$('#lesson93 div.pop-msg').fadeIn(500, function()
						{
							Lesson93.f_anim = true;
							Course.showBotButtons(93,true);
						});
					},1500);
				});
			});
		});

		Course.oState.card90 = 75;
		OCookies.set("card90", 75);
	},

	pre: function()
	{
		Course.showBotButtons(94,false);
		Lesson93.initTips();
		Lesson93.f_anim = false;
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson93.pre();
				Course.showLesson(93, function()
				{
					Course.showBotButtons(93,true);
				});
				break;
			case 1:
				if(Lesson93.f_anim)
				{
					Lesson94.next(0);
					break;
				}

				Lesson93.animTip(3);
				break;
		}
	},
};

var Lesson94 = {
	f_anim: false, //true - enable go to the next tip
	rtext: {
		rtext_line: 40,
		rtext_font: 30
	},

	initTips: function(ntip)
	{
		var rtext_x = 651;
		var rtext_y = 40;
		var rtext_cx = 301;
		var rtext_font = Lesson94.rtext.rtext_font;
		var rtext_line = Lesson94.rtext.rtext_line;

		if(!ntip) ntip=4;
		var tip = $('#lesson94 .tip4');
		tip.find('.ltext').css({ 'left': '577px' });
		tip.find('.tipn').css({
			'left': '88px',
			'top': '84px',
			'width': '302px',
			'height': '328px',
			'display': 'block'
		});

		$('#lesson94 .tip4 .rtext').css({
			'left': rtext_x + 'px',
			'top': rtext_y + 'px',
			'width': rtext_cx + 'px',
			'font-size': rtext_font + 'px',
			'line-height': rtext_line + 'px',
			'opacity': '1'
		});

		$('#lesson94 .tip4 .img94lbub, #lesson94 .tip4 .lbubtxt1, #lesson94 .tip4 .lbubtxt2').hide();
		$('#lesson94 .tip4 .img94rbub, #lesson94 .tip4 .rbubtxt1, #lesson94 .tip4 .rbubtxt2').hide();
		$('#lesson94 .tip4 .img94r2').hide();
		$('#lesson94 .tip4 .img94r1, #lesson94 .tip4 .rtitle1, #lesson94 .tip4 .rtitle2').hide();
		$('#lesson94 .tip4 .img94l1, #lesson94 .tip4 .ltitle').hide();
		$('#lesson94 .tip4 .tipbg').css('left', '0');
		$('#lesson94 .tip4 .tipbg1').hide();
	},

	animTip: function(ntip)
	{
		Course.showBotButtons(94,false);

		$('#lesson94 .tip4 .tipbg').animate(
		{
			'left': '575px'
		});

		$('#lesson94 .tip'  + ntip + ' .tipn').animate(
		{
			'width': '91px',
			'height': '98px',
			'top': '0px',
			'left': '33px'
		}, 900);

		$('#lesson94 .tip' + ntip + ' .ltext').animate(
		{
			'left': '35px'
		}, 1000, function()
		{
		});


		$('#lesson94 .tip4 .rtext').animate(
		{
			'left': '819px',
			'top': '475px',
			'font-size': '22px',
			'line-height': '27px',
			'width': '194px',
			'opacity': '0'
		}, function()
		{
		});

		$('#lesson94 .tip4 .tipbg1').fadeIn(800, function()
		{
			//show woman
			var lel1 = $('#lesson94 .tip4 .img94l1, #lesson94 .tip4 .ltitle');
			lel1.fadeIn(800);
			//show man1 & title1
			var rel1 = $('#lesson94 .tip4 .img94r1, #lesson94 .tip4 .rtitle1');
			rel1.fadeIn(1500, function()
			{
				//show left bubble & text1
				var lbub1 = $('#lesson94 .tip4 .img94lbub, #lesson94 .tip4 .lbubtxt1');
				lbub1.fadeIn(800, function()
				{
					//show right bubble & text1
					var rbub1 = $('#lesson94 .tip4 .img94rbub, #lesson94 .tip4 .rbubtxt1');
					rbub1.fadeIn(1500, function()
					{
						//pause
						setTimeout(function()
						{
							//hide lbub, rbub & text
							var hidelrbub1 = $('#lesson94 .tip4 .lbubtxt1,#lesson94 .tip4 .img94lbub,#lesson94 .tip4 .rbubtxt1,#lesson94 .tip4 .img94rbub');
							hidelrbub1.fadeOut(800, function()
							{
								//hide man1 & title1
								rel1.fadeOut(800,function()
								{
									//show man2 & title2
									var rel2 = $('#lesson94 .tip4 .img94r2, #lesson94 .tip4 .rtitle2');
									rel2.fadeIn(1500,function()
									{
										//show left bubble & text2
										var lbub2 = $('#lesson94 .tip4 .img94lbub, #lesson94 .tip4 .lbubtxt2');
										lbub2.fadeIn(800,function()
										{
											//show right bubble & text2
											var rbub2 = $('#lesson94 .tip4 .img94rbub, #lesson94 .tip4 .rbubtxt2');
											rbub2.fadeIn(1500, function()
											{
												Lesson94.f_anim = true;

												Course.showBotButtons(94,true);
											});
                        				});
									});
								});
							});
						}, 1000);
					});
				});
			});
		});

		Course.oState.card90 = 100;
		OCookies.set("card90", 100);
	},

	pre: function()
	{
		Course.showBotButtons(94,false);
		Lesson94.initTips();
		Lesson94.f_anim = false;
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson94.pre();
				Course.showLesson(94, function()
				{
					Course.showBotButtons(94,true);
				});
				break;
			case 1:
				if(Lesson94.f_anim)
				{
					Lesson1000.next(0); //to challenges
					break;
				}

				Lesson94.animTip(4);
				break;
		}
	},
};
