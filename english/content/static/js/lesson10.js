var Lesson10 = {
	next: function(n)
	{
		switch(n)
		{
			case 100: //first start - show bg
				$('#lesson10 .bg').fadeIn(1000);
				break;
			case 101: //first start - bg already shown
				//enable menu
				if(Course.oState.fEnaLesson50) Course.enaLessonMenu(50, 'nosave');
				if(Course.oState.fEnaLesson120) Course.enaLessonMenu(120, 'nosave');
				if(Course.oState.fEnaLesson130) Course.enaLessonMenu(130, 'nosave');
				if(Course.oState.fEnaLesson150) Course.enaLessonMenu(150, 'nosave');
				if(Course.oState.fEnaLesson170) Course.enaLessonMenu(170, 'nosave');
				if(Course.oState.fEnaLesson190) Course.enaLessonMenu(190, 'nosave');
				if(Course.oState.fEnaLesson210) Course.enaLessonMenu(210, 'nosave');
				if(Course.oState.fEnaLesson230) Course.enaLessonMenu(230, 'nosave');
				if(Course.oState.fEnaLesson250) Course.enaLessonMenu(250, 'nosave');

				Course.elFadeIn($('#lesson10 .pop-msg'), 1000);
				break;

			case 0: //next start (return from other lessons)
				location.reload();
				/*
				//remove all content!
				$('.wrap-course section.holder div.lesson:not(#lesson10)').remove();
				//enable lang-buttons
				$('#lesson10 button.but-lang').prop("disabled", false);
				//reset progress
				$('#lesson10 .progress .line').css('width','0'); 

				$('#lesson10 .bg').show();

				$('#lesson10 .pop-msg').css('display', 'none');
				
				Course.showLesson(10, function()
				{
					Course.elFadeIn($('#lesson10 .pop-msg'), 500);
				});
				*/
				break;
		}
	},

	lang: function(n)
	{
		$('#lesson10 button.but-lang').prop("disabled", true);

		Course.oState.lang = parseInt(n);
		//0 - english
		//1 - german
		OCookies.set("lang",n);

		//load additional HTMLs
		var fnames_en = [
			"0000.html", //language dependent scripts
			"exam.html", //exams
			"0010.html",
			"0014.html", //glossary, links
			"0050.html", //SOCIAL ENGINEERING
			"0060.html", //SOCIAL ENGINEERING - 4 cards
			"0070.html", //les73 - quiz for les63
			"0080.html", //SOCIAL ENGINEERING / PHISHING - 4 cards
			"0090.html", //SOCIAL ENGINEERING / TIPS
			"0100.html", //SOCIAL ENGINEERING / PHISHING / CHALLENGES
			"0120.html", //PHYSICAL SECURITY - 4 cards
			"0140.html", //Password SECURITY - 5 cards
			"0160.html", //E-Mail SECURITY - 4 cards
			"0180.html", //Inet SECURITY
			"0200.html", //Soc Media
			"0220.html", //Using Wi-Fi
			"0240.html", //Malware
			"0260.html", //Security Incidents
			"0280.html", //end page and certificate
		];

		var fnames_de = [
			"de/0000.html", //language dependent scripts
			"de/exam.html", //exams
			"de/0010.html",
			"de/0014.html", //glossary, links
			"de/0050.html", //SOCIAL ENGINEERING
			"de/0060.html", //SOCIAL ENGINEERING - 4 cards
			"de/0070.html", //les73 - quiz for les63
			"de/0080.html", //SOCIAL ENGINEERING / PHISHING - 4 cards
			"de/0090.html", //SOCIAL ENGINEERING / TIPS
			"de/0100.html", //SOCIAL ENGINEERING / PHISHING / CHALLENGES
			"de/0120.html", //PHYSICAL SECURITY - 4 cards
			"de/0140.html", //Password SECURITY - 5 cards
			"de/0160.html", //E-Mail SECURITY - 4 cards
			"de/0180.html", //Inet SECURITY
			"de/0200.html", //Soc Media
			"de/0220.html", //Using Wi-Fi
			"de/0240.html", //Malware
			"de/0260.html", //Security Incidents
			"de/0280.html", //end page and certificate
		];

		var fnames;
		if(Course.oState.lang == 1) fnames = fnames_de; //German
		else fnames = fnames_en; //English

		loadFiles_obj.nAll = fnames.length;
		loadFiles_obj.progress_el = $('#lesson10 .progress'); 

		loadFiles_obj.loadFiles(fnames, function()
		{
			//all HTMLs loaded
			//...
			//console.log("all HTMLs loaded");
			setTimeout(function()
			{
				//console.log("Lesson20.next(0)");
				Lesson20.next(0);
			}, 100);
		});
	}
};

var Lesson20 = {
	pre: function()
	{
		Course.showBotButtons(20,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				//show menu
				//$('.course header nav.dws-menu').show();
				if(Course.oState.lang == 1)
				{
					$('.course header nav.menu-de').show();
					$('.course header .close-but-de').show();
				}
				else
				{
					$('.course header nav.menu-en').show();
					$('.course header .close-but-en').show();
				}

				Lesson20.pre();
				Course.showLesson(20, function()
				{
					Course.showBotButtons(20,true);
				});
		}
	},
};

var Lesson30 = {
	f_pre: false,
	
	selAvatar: function(n) //0 - Sam, 1 - Sue
	{
		if(n == 0)
		{
			Course.oState.avatar = 0;
			
			$('#lesson30 .man-sam').addClass('selected');
			$('#lesson30 .man-sam').removeClass('unselected');
			$('#lesson30 .woman-sue').removeClass('selected');
			$('#lesson30 .woman-sue').addClass('unselected');
		}
		else
		{
			Course.oState.avatar = 1;
			$('#lesson30 .woman-sue').addClass('selected');
			$('#lesson30 .woman-sue').removeClass('unselected');
			$('#lesson30 .man-sam').removeClass('selected');
			$('#lesson30 .man-sam').addClass('unselected');
		}
		OCookies.set("avatar",Course.oState.avatar);

		Course.showBotButtons(30,true);
	},
	
	pre: function()
	{
		Course.showBotButtons(30,false);
		$('#lesson30 .avatar').removeClass('selected unselected');

		$('#lesson30 .woman-sue, #lesson30 .man-sam, #lesson30 .infobox').hide();
		$('#lesson30.lesson .lesson-body .infobox1').css({ 'top': '108px', 'left': '396px', 'width': '213px' });
		$('#lesson30.lesson .lesson-body .infobox1 .info1').show();
		$('#lesson30.lesson .lesson-body .infobox1 .info2, #lesson30.lesson .lesson-body .infobox1 .info-man, #lesson30.lesson .lesson-body .infobox1 .info-woman').hide();
		
		if(!Lesson30.f_pre)
		{
			Lesson30.f_pre = true;

			$('#lesson30 .avatar').click(function()
			{
				if($(this).hasClass('man-sam'))	Lesson30.selAvatar(0);
				else Lesson30.selAvatar(1);
				
				var infoman = $('#lesson30.lesson .lesson-body .infobox1 .info-man');
				var infowoman = $('#lesson30.lesson .lesson-body .infobox1 .info-woman');
				var infox, infoy='118px', infocx='498px';

				if(Course.oState.avatar) //woman
					infox = '463px';
				else //man
					infox = '55px';

				$('#lesson30.lesson .lesson-body .infobox1 .info1').hide();

				if(Course.oState.avatar == 0)
				{
					infoman.show();
					infowoman.hide();
				}
				else
				{
					infowoman.show();
					infoman.hide();
				}

				$('#lesson30.lesson .lesson-body .infobox1').animate({
					top: infoy, left: infox, width: infocx
				}, 500, function() {
					$('#lesson30.lesson .lesson-body .infobox1 .info2').show(500);
				});
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson30.pre();
				Course.showLesson(30, function()
				{
					$('#lesson30 .man-sam').fadeIn(800, function()
					{
						$('#lesson30 .woman-sue').fadeIn(800, function()
						{
							$('#lesson30 .infobox1').fadeIn(800, function()
							{
							});
						});
					});
				});
		}
	},
};

var Lesson40 = {
	pre: function()
	{
		Course.showBotButtons(40,false);
		if(Course.oState.avatar == 0) //man
		{
			$('#lesson40 .woman-sue').hide();
			$('#lesson40 .man-sam').show();
		}
		else //woman
		{
			$('#lesson40 .woman-sue').show();
			$('#lesson40 .man-sam').hide();
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson40.pre();
				Course.showLesson(40, function()
				{
					Course.showBotButtons(40,true);
				});
		}
	},
};

var Lesson45 = {
	pre: function()
	{
		Course.showBotButtons(45,false);

		if(Course.oState.avatar == 0) //man
		{
			$('#lesson45 .is_sue').hide();
			$('#lesson45 .is_sam').show();
		}
		else //woman
		{
			$('#lesson45 .is_sue').show();
			$('#lesson45 .is_sam').hide();
		}

		$('#lesson45 .board .chart').hide();

		$('#lesson45 .board .chart .sector93').css({
			'top': '31px',
			'left': '20px',
			'width': '185px',
			'opacity': '0.3'
		});
		$('#lesson45 .board .chart .sector7').css({
			'top': '30px',
			'left': '22px',
			'width': '180px'
		});
		$('#lesson45 .board .percent7').css('top', '39px');

		$('#lesson45 .board .txt').hide();
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson45.pre();
				Course.showLesson(45, function()
				{
					$('#lesson45 .board .chart').fadeIn(1000);
					setTimeout(function()
					{
						$('#lesson45 .board .txt').fadeIn(1500);
						$('#lesson45 .board .chart .sector7').animate({
							top: '13px'
						},1500);
						$('#lesson45 .board .percent7').animate({ top: '26px' }, 1500);
						$('#lesson45 .board .chart .sector93').animate({
							opacity: '1',
							top: '5px',
							left: '-9px',
							width: '248px'
						}, 1500, function()
						{
							Course.showBotButtons(45,true);
						});
					}, 600);
				});
		}
	},
};
