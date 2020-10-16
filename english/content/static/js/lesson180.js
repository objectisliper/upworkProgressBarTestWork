/* Inet SECURITY
	180 - intro
	181 - TIPs
*/

//"book" before chapter5
var Lesson170 = {
	pre: function()
	{
		Course.showBotButtons(170,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Course.enaLessonMenu(170);
				Lesson170.pre();
				$('#lesson170 .page-book .chapter-book').removeClass('active');

				Course.showLesson(170, function()
				{
					$('#lesson170 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(170,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson180.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson160.next(0);
	}
};

var Lesson180 = {
	f_pre: false,

	pre: function()
	{
		Course.showBotButtons(180,false);

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson180 .is_sam').show();
			$('#lesson180 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson180 .is_sam').hide();
			$('#lesson180 .is_sue').show();
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson180.pre();
				$('#lesson180 .block1').show();
				$('#lesson180 .block2').hide();
				Course.showLesson(180, function()
				{
					Course.setLessonFragment(180,1);
					Course.showBotButtons(180,true);
				});
				break;

			case 1:
				Lesson181.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson170.next(0);
	}
};

/* TIPs */
var Lesson181 = {
	f_pre: false,
	n_slides: 11,
	viewed_slides: 0,

	pre: function()
	{
		Course.showBotButtons(181,false);
		$('#lesson181 .bg .lbub').css('left', '-164px');

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson181 .is_sam').show();
			$('#lesson181 .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson181 .is_sam').hide();
			$('#lesson181 .is_sue').show();
		}

		if(Course.oState.card181 < 1)
		{
			Course.oState.card181 = 1;
			OCookies.set("card181",Course.oState.card181);
		}

		if(!Lesson181.f_pre)
		{
			Lesson181.f_pre = true;

			$('#lesson181 .tips-slider').slick({
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
			Lesson181.viewed_slides = 1;

			$('#lesson181 button.slick-prev, #lesson181 button.slick-next').click(function()
			{
				var curr_slide = $('#lesson181 .slick-list .slick-active');
				var tip = curr_slide.find('.slidertip .num span');
				var ind;
				var spann = curr_slide.find('div.num span');
				ind = parseInt(spann.text());
				Lesson181.disSliderBut(true); //disable buttons until animation

				switch(ind)
				{
					case 1:
						Lesson181.viewed_slides |= 1;
						Lesson181.animSlide1();
						break;
					case 2:
						Lesson181.viewed_slides |= 2;
						Lesson181.animSlide2();
						break;
					case 3:
						Lesson181.viewed_slides |= 4;
						Lesson181.animSlide3();
						break;
					case 4:
						Lesson181.viewed_slides |= 8;
						Lesson181.animSlide4();
						break;
					case 5:
						Lesson181.viewed_slides |= 16;
						Lesson181.animSlide5();
						break;
					case 6:
						Lesson181.viewed_slides |= 32;
						Lesson181.animSlide6();
						break;
					case 7:
						Lesson181.viewed_slides |= 64;
						Lesson181.animSlide7();
						break;
					case 8:
						Lesson181.viewed_slides |= 128;
						Lesson181.animSlide8();
						break;
					case 9:
						Lesson181.viewed_slides |= 256;
						Lesson181.animSlide9();
						break;
					case 10:
						Lesson181.viewed_slides |= 512;
						Lesson181.animSlide10();
						break;
					case 11:
						Lesson181.viewed_slides |= 1024;
						Lesson181.animSlide11();
						break;
					case 12:
						Lesson181.viewed_slides |= 2048;
						Lesson181.animSlide12();
						break;
				}

				var n = 0, i;
				for(i=0; i<Lesson181.n_slides; i++)
				{
					if((Lesson181.viewed_slides >> i) & 1) n++;
				}

				Course.oState.card181 = n*100 / Lesson181.n_slides;
				OCookies.set("card181", Course.oState.card181);

				if(n >= Lesson181.n_slides)
				{
					//enable NEXT button
					Course.enaBotNextButton(181,true);
				}
			});
		}
	},

	disSliderBut: function(mode)
	{
		$('#lesson181 .tips-slider button').prop('disabled', mode);
	},

	initSlide: function(n)
	{
		switch(n)
		{
			case 1:
				$('#lesson181 .tip1 .vir, #lesson181 .tip1 .cur').hide();
				$('#lesson181 .tip1 .ban').hide();
				break;
			case 2:
				$('#lesson181 .tip2 .insect').hide();
				$('#lesson181 .tip2 .cur').css({ 'top': '368px', 'left': '609px' });
				break;
			case 3:
				$('#lesson181 .tip3 .adobe, #lesson181 .tip3 .cur').hide();
				$('#lesson181 .tip3 .cur').css({ 'top': '368px', 'left': '609px' });
				break;
			case 4:
				$('#lesson181 .tip4 .redring').hide();
				$('#lesson181 .tip4 .cur').css({ 'top': '368px', 'left': '609px' }).show();;
				break;
			case 5:
				$('#lesson181 .tip5 .bg').hide();
				$('#lesson181 .tip5 .cur').hide();
				$('#lesson181 .tip5 .cur').css({ 'top': '368px', 'left': '609px' }).show();
				$('#lesson181 .tip5 .redring').hide();
				break;
			case 6:
				$('#lesson181 .tip6 .cur').css({ 'top': '368px', 'left': '609px' }).show();
				$('#lesson181 .tip6 .bord').hide();
				break;
			case 7:
				$('#lesson181 .tip7 .cur').css({ 'top': '368px', 'left': '609px' }).show();
				$('#lesson181 .tip7 .frma').hide();
				$('#lesson181 .tip7 .redring').hide();
				break;
			case 8:
				break;
			case 9:
				$('#lesson181 .tip9 .grey').hide();
				$('#lesson181 .tip9 .cur').css({ 'top': '368px', 'left': '609px' }).show();
				break;
			case 10:
				$('#lesson181 .tip10 .v').hide();
				break;
			case 11:
				$('#lesson181 .tip11 .hint').hide();
				$('#lesson181 .tip11 .cur').css({ 'top': '368px', 'left': '609px' }).show();
				break;
			case 12:
				$('#lesson181 .tip12 .scr2').hide();
				$('#lesson181 .tip12 .v').hide();
				break;
		}
	},

	animSlide1: function()
	{
		var lesban = [
			//cx, cy,	x, y,			$
			[ 135,71,	248,191,	'.ban5' ],
			[ 186,82,	262,74,		'.ban2' ],
			[ 131,75,	444,278,	'.ban9' ],
			[ 206,94,	18,187,		'.ban4' ],
			[ 207,95,	394,186,	'.ban6' ],
			[ 221,107,	9,75,		'.ban1' ],
			[ 118,63,	39,289,		'.ban7' ],
			[ 113,67,	482,78,		'.ban3' ],
			[ 187,82,	213,276,	'.ban8' ],
		];
		//init
		Lesson181.initSlide(1);

		//start anim
		setTimeout(function()
		{
			$('#lesson181 .tip1 .ban').css({ 'width':'0', 'height':'0' }).show();
			showban(0);
		},500);

		function showban(n,fu)
		{
			var sel = lesban[n][4];
			var el = $('#lesson181 .tip1 ' + sel);
			var cx = lesban[n][0];
			var cy = lesban[n][1];
			var x = lesban[n][2];
			var y = lesban[n][3];

			el.css({
				'top': y+(cy/2)+'px',
				'left': x+(cx/2)+'px',
				'width': '0px',
				'height': '0px'
			});
			el.show();
			el.animate({
				'top': y+'px',
				'left': x+'px',
				'width': cx+'px',
				'height': cy+'px'
			},150,'swing');

			setTimeout(function()
			{
				if(n < 8)
				{
					n++;
					showban(n);
				}
				else
				{
					$('#lesson181 .tip1 .cur').css({ 'top': '371px', 'left': '603px' }).fadeIn(200).animate({
						'left': '321px',
						'top': '222px'
					}, 1500);
					
					setTimeout(function()
					{
						$('#lesson181 .tip1 .vir').fadeIn(800, function()
						{
							$('#lesson181 .tip1 .cur').hide();
							setTimeout(function()
							{
								Lesson181.disSliderBut(false);
							},800);
						});
					}, 1500);
				}
			}, 200);
		}
	},

	animSlide2: function()
	{
		var insect = [
			//x,y,		x1,y1
			[ 0,367,	44,101 ],
			[ -12,363,	251,177 ],
			[ 21,-80,	126,142 ],
			[ 318,-67,	273,97 ],
			[ 560,-65,	393,107 ],
			[ 619,240,	382,211 ],
			[ 300,369,	239,234 ]
		];

		Lesson181.initSlide(2);
		setTimeout(function()
		{
			$('#lesson181 .tip2 .cur').animate({
				'left': '356px',
				'top': '190px'
			}, 1500);

			setTimeout(function()
			{
				$('#lesson181 .tip2 .cur').css({ 'top': '368px', 'left': '609px' });

				var i;
				for(i=0; i<7; i++)
				{
					$('#lesson181 .tip2 .t' + i).css({
						'left': insect[i][0],
						'top': insect[i][1]
					}).show();
				}

				for(i=0; i<7; i++)
				{
					$('#lesson181 .tip2 .t' + i).animate({
						'left': insect[i][2],
						'top': insect[i][3]
					},2000, function()
					{
						setTimeout(function()
						{
							Lesson181.disSliderBut(false);
						},800);
					});
				}
			},1600);
		}, 1000);
	},

	animSlide3: function()
	{
		Lesson181.initSlide(3);

		var cur = $('#lesson181 .tip3 .cur');
		var adobe = $('#lesson181 .tip3 .adobe');
		var adobe_child = $('#lesson181 .tip3 .adobe img, #lesson181 .tip3 .adobe div');

		adobe_child.css('opacity','0');
		cur.show();
		
		setTimeout(function()
		{
			cur.animate({
				'left': '301px',
				'top': '187px'
			}, 1500);
			
			setTimeout(function()
			{
				cur.hide();
				adobe.css({ 'left':'625px', 'display':'block' });
				adobe_child.animate({ 'opacity':'1'	},1200);
				adobe.animate({ 'left':'162px' },1500, function()
				{
					Lesson181.disSliderBut(false);
				});
			}, 1600);
		},1000);
	},

	animSlide4: function()
	{
		Lesson181.initSlide(4);
		
		var cur = $('#lesson181 .tip4 .cur');
		var animwrap = $('#lesson181 .tip4 .animwrap');
		animwrap.css('overflow', 'hidden');
		
		$('#lesson181 .tip4 .paypol').fadeIn(100);
		setTimeout(function()
		{
			cur.animate({
				'left': '230px',
				'top': '26px'
			}, 1500);
			
			setTimeout(function()
			{
				cur.hide();
				$('#lesson181 .tip4 .redring').fadeIn(800, function()
				{
					Lesson181.disSliderBut(false);
				});
			}, 1600);
		},1000);
	},

	animSlide5: function()
	{
		Lesson181.initSlide(5);

		var cur = $('#lesson181 .tip5 .cur');
		var scr = $('#lesson181 .tip5 .scr');
		setTimeout(function()
		{
			scr.fadeIn(200, function()
			{
				setTimeout(function()
				{
					cur.animate({
						'left': '450px',
						'top': '294px'
					}, 1500, function()
					{
						$('#lesson181 .tip5 .redring').fadeIn(800, function()
						{
							cur.hide();
							Lesson181.disSliderBut(false);
						});
					});
				});
			});
		},1000);
	},

	animSlide6: function()
	{
		Lesson181.initSlide(6);

		var cur = $('#lesson181 .tip6 .cur');

		setTimeout(function()
		{
			cur.animate({
				'left': '315px',
				'top': '218px'
			}, 1500, function()
			{
				$('#lesson181 .tip6 .bord').fadeIn(800, function()
				{
					cur.hide();
					Lesson181.disSliderBut(false);
				});
			});
		}, 500);
	},

	animSlide7: function()
	{
		Lesson181.initSlide(7);

		var cur = $('#lesson181 .tip7 .cur');
		cur.animate({
			'left': '455px',
			'top': '234px'
		}, 2000);

		setTimeout(function()
		{
			cur.hide();
			$('#lesson181 .tip7 .frma').fadeIn(700, function()
			{
				setTimeout(function()
				{
					$('#lesson181 .tip7 .redring').fadeIn(800, function()
					{
						Lesson181.disSliderBut(false);
					});
				},800);
			});
		},2300);
	},

	animSlide8: function()
	{
		setTimeout(function()
		{
			Lesson181.disSliderBut(false);
		},500);
	},

	animSlide9: function()
	{
		Lesson181.initSlide(9);
		var cur = $('#lesson181 .tip9 .cur');

		setTimeout(function()
		{
			cur.animate({
				'left': '214px',
				'top': '53px'
			}, 2500);
			
			setTimeout(function()
			{
				$('#lesson181 .tip9 .grey').fadeIn(500);
				setTimeout(function()
				{
					Lesson181.disSliderBut(false);
				},1000);
			},2600);
		},500);
	},

	animSlide10: function()
	{
		Lesson181.initSlide(10);
		
		setTimeout(function()
		{
			$('#lesson181 .tip10 .v').show();
			Lesson181.disSliderBut(false);
		},2000);
	},

	animSlide11: function()
	{
		Lesson181.initSlide(11);

		var cur = $('#lesson181 .tip11 .cur');

		setTimeout(function()
		{
			cur.animate({
				'left': '277px',
				'top': '255px'
			}, 2000);

			setTimeout(function()
			{
				$('#lesson181 .tip11 .hint').fadeIn(700, function()
				{
					Lesson181.disSliderBut(false);
				});
			},2300);
		},500);
	},

	animSlide12: function()
	{
		Lesson181.initSlide(12);

		setTimeout(function()
		{
			$('#lesson181 .tip12 .scr2').fadeIn(500, function()
			{
				setTimeout(function()
				{		
					$('#lesson181 .tip12 .v').fadeIn(300, function()
					{
						Lesson181.disSliderBut(false);
					});
				},800);
			});
		},1700);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson181.pre();
				Course.enaBotNextButton(181,false);
				for(n=1; n<=Lesson181.n_slides; n++) Lesson181.initSlide(n);

				Course.showLesson(181, function()
				{
					$(window).resize(); //for slider

					setTimeout(function()
					{
						if(!Lesson181.f_1stanim)
						{
							//first animation (once)
							Lesson181.f_1stanim = true;
							Lesson181.disSliderBut(true); //disable buttons until animation
							Lesson181.animSlide1();
						}

						$('#lesson181 .bg .lbub').animate({
							'left': '79px'
						}, 1000);

						Course.showBotButtons(181,true);
					}, 800);
				}, 1500);
				break;
			case 1:
				Lesson190.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson180.next(0);
	}
};
