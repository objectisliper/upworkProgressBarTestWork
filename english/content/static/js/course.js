(typeof window.lucyQuizAnswer === 'undefined') && (window.lucyQuizAnswer = function (a, b)
{
	console.log("lucyQuizAnswer", a,b);
});

(typeof window.lucyQuizEnd === 'undefined') && (window.lucyQuizEnd = function ()
{
	console.log("lucyQuizEnd");
});

(typeof window.lucyDispatchEvent === 'undefined') && (window.lucyDispatchEvent = function (a)
{
	console.log("lucyDispatchEvent",a);
});

$(function()
{
	Lesson10.next(100);
});

quizAnswers = [
	{
		les: 73, //1 question
		n: 1
	},

	{
		les: 101, //5 questions
		n: 2
	},

	{
		les: 102, //6 questions
		n: 7
	},

	{
		les: 125, //5 questions
		n: 13
	},

	{
		les: 145, //2 questions
		n: 18
	},

	{
		les: 164, //8 questions
		n: 20
	},

	{
		les: 244, //quiz - 5 questions
		n: 27
	}
];

$(window).on("load", function() 
{
	//hide loader window
	$('div.fixed-loader').fadeOut(800);
	setTimeout(function()
	{
		Lesson10.next(101);
	}, 700);
});

jQuery.fn.swap = function(b) {
	b = jQuery(b)[0];
	var a = this[0],
		a2 = a.cloneNode(true),
		b2 = b.cloneNode(true),
		stack = this;

	a.parentNode.replaceChild(b2, a);
	b.parentNode.replaceChild(a2, b);

	stack[0] = a2;
	return this.pushStack( stack );
};

var Course = {
	oState: {
		currLesson: 0,
		currFragment: 0,
		lang: 0,
		avatar: -1, //0 - Sam, 1 - Sue

		card62: 0,
		card63: 0,
		card73: 0, //quiz
		card64: 0,

		card81: 0,
		card82: 0,
		card83: 0,
		card84: 0,

		card90: 0,

		card101: 0, //quiz
		//chal101: [ -1,-1,-1,-1,-1 ], //5 questions - not answered
		card101n: 0, //count of attempts (0..5)

		card102: 0, //quiz
		card102n: 0, //count of attempts (0..5)

		card121: 0,
		card122: 0,
		card123: 0,
		card124: 0, //quiz
		card124n: 0, //count of attempts (0..5) ---
		card125: 0, //quiz
		card125n: 0, //count of attempts (0..5)

		card141: 0,
		card142: 0,
		card143: 0,
		card144: 0,
		card145: 0, //exam

		card161: 0,
		card1621: 0,
		card1622: 0,
		card163: 0,
		card164: 0, //exam
		card164n: 0, //count of attempts (0..5)

		card181: 0,

		card201: 0,
		card202: 0,

		card221: 0,
		card222: 0,

		card241: 0,
		card242: 0,
		card243: 0,
		card244: 0, //exam

		card261: 0,

		nCards: 0, //collected cards
		allPoints: 0.0, //all points (cards and exams)

		fEnaLesson50: 0, //enable menu...
		fEnaLesson120: 0,
		fEnaLesson130: 0,
		fEnaLesson150: 0,
		fEnaLesson170: 0,
		fEnaLesson190: 0,
		fEnaLesson210: 0,
		fEnaLesson230: 0,
		fEnaLesson250: 0
	},
	minPoints: 60, //minimal points
	expertPoints: 90, //expert

	videoModify: function(s)
	{
		$(s + ' > a').css({ 'pointer-events': 'none' });
		$(s + ' .fp-controls a.fp-brand').css({ 'pointer-events': 'none' });
	},

	videoPause: function()
	{
		Lesson50.videoPause();
		Lesson80.videoPause();
		Lesson121.videoPause();
		Lesson141.videoPause();
		Lesson161.videoPause();
		Lesson243.videoPause();
	},

	lucyAnswer: function(les, quest, result)
	{
		/*
		console.log("lucyAnswer", les,quest,result);
		if(les == 101)
		{
			Course.setQAnswered(101, quest, result);
			console.log("101ans",Course.oState.chal101);
		}
		*/

		var i;
		for(i=0; i<quizAnswers.length; i++)
		{
			if(les == quizAnswers[i].les)
			{
				lucyQuizAnswer(quizAnswers[i].n+quest, result);
				return;
			}
		}
	},

	enaLessonMenu: function(les, mode)
	{
		switch(les)
		{
			case 50: Course.oState.fEnaLesson50 = 1; break;
			case 120: Course.oState.fEnaLesson120 = 1; break;
			case 130: Course.oState.fEnaLesson130 = 1; break;
			case 150: Course.oState.fEnaLesson150 = 1; break;
			case 170: Course.oState.fEnaLesson170 = 1; break;
			case 190: Course.oState.fEnaLesson190 = 1; break;
			case 210: Course.oState.fEnaLesson210 = 1; break;
			case 230: Course.oState.fEnaLesson230 = 1; break;
			case 250: Course.oState.fEnaLesson250 = 1; break;
			default: return;
		}

		$('.dws-menu ul li.les' + les).removeClass('disabled');

		if(mode == 'nosave') return;
		OCookies.set("ena" + les, 1);
	},

	setMenuIcons: function(les)
	{
		function setitemclass(nitem, cl)
		{
			var el = $('.dws-menu ul li.les' + nitem);
			switch(cl)
			{
				case 'full':
					el.addClass('full');
					el.removeClass('part');
					break;
				case 'part':
					el.addClass('part');
					el.removeClass('full');
					break;
				default:
					el.removeClass('full');
					el.removeClass('part');
					break;
			}
		}

		function setif(val, n)
		{
			if(val >= 99)
				setitemclass(n, 'full');
			else if(val > 0)
				setitemclass(n, 'part');
			else
				setitemclass(n, '');
		}

		function setifa(arr, n)
		{
			var i;
			var v=0;
			for(i=0; i<arr.length; i++)
			{
				v += parseInt(arr[i]);
			}
			v = v/arr.length;
			if(v >= 99)
				setitemclass(n, 'full');
			else if(v > 0)
				setitemclass(n, 'part');
			else
				setitemclass(n, '');
		}

		var v, ln;

		//SOCIAL ENGINEERING
		setif(Course.oState.card62, 620);
		setif(Course.oState.card73, 730);
		v = [ Course.oState.card63, Course.oState.card73 ];
		setifa(v, 630);
		setif(Course.oState.card64, 640);

		setif(Course.oState.card101, 101);
		setif(Course.oState.card102, 102);

		v = [ Course.oState.card101, Course.oState.card102 ];
		setifa(v, 1000);

		setif(Course.oState.card81, 801);
		setif(Course.oState.card82, 820);
		setif(Course.oState.card83, 830);
		setif(Course.oState.card84, 840);
		setif(Course.oState.card90, 900);

		v = [
			Course.oState.card81, Course.oState.card82, Course.oState.card83,
			Course.oState.card84, Course.oState.card90,
			Course.oState.card101, Course.oState.card102
		];
		setifa(v, 800); 

		v = [
			Course.oState.card81, Course.oState.card82, Course.oState.card83,
			Course.oState.card84, Course.oState.card90,
			Course.oState.card101, Course.oState.card102,
			Course.oState.card62, Course.oState.card63, Course.oState.card73,
			Course.oState.card64
		];
		setifa(v, 50); 
		//

		//PHYSICAL SECURITY
		setif(Course.oState.card121, 121);
		setif(Course.oState.card122, 122);
		setif(Course.oState.card123, 123);
		setif(Course.oState.card124, 124);
		setif(Course.oState.card125, 125);

		v = [
			Course.oState.card121, Course.oState.card122,
			Course.oState.card123, Course.oState.card124, Course.oState.card125
		];
		setifa(v, 120); 
		//

		//PASSWORD SECURITY
		setif(Course.oState.card141, 141);
		setif(Course.oState.card142, 142);
		setif(Course.oState.card143, 143);
		setif(Course.oState.card144, 144);
		setif(Course.oState.card145, 145);

		v = [
			Course.oState.card141, Course.oState.card142,
			Course.oState.card143, Course.oState.card144, Course.oState.card145
		];
		setifa(v, 130); 
		//

		//EMAIL SECURITY
		setif(Course.oState.card161, 161);
		setif(Course.oState.card1621, 1621);
		setif(Course.oState.card1622, 1622);

		v = [ Course.oState.card1621, Course.oState.card1622 ];
		setifa(v, 1620); 

		setif(Course.oState.card163, 163);
		setif(Course.oState.card164, 164);

		v = [
			Course.oState.card161, Course.oState.card1621,
			Course.oState.card1622, Course.oState.card163, Course.oState.card164
		];
		setifa(v, 150); 
		//

		//SECURE BROWSING
		setif(Course.oState.card181, 170);
		setif(Course.oState.card181, 181);
		//

		//SECURE SOCIAL NETWORKING
		setif(Course.oState.card201, 201);
		setif(Course.oState.card202, 202);
		v = [ Course.oState.card201, Course.oState.card202 ];
		setifa(v, 190);
		//

		//USING PUBLIC WI-FI’s
		setif(Course.oState.card221, 221);
		setif(Course.oState.card222, 222);
		v = [ Course.oState.card221, Course.oState.card222 ];
		setifa(v, 210);
		//

		//MALWARE
		setif(Course.oState.card241, 241);
		setif(Course.oState.card242, 242);
		setif(Course.oState.card243, 243);
		setif(Course.oState.card244, 244);

		v = [
			Course.oState.card241, Course.oState.card242,
			Course.oState.card243, Course.oState.card244
		];
		setifa(v, 230);
		//

		//SECURITY INCIDENTS
		setif(Course.oState.card261, 261);
		setif(Course.oState.card261, 250);
		//
	},

	//debug: go to lesson
	b_lesson_go: function()
	{
		var n = $('.debug-wnd input[name=lesson_n]').val();
		window['Lesson'+n].next(0);
	},

	setLessonFragment: function(les, fragm)
	{
		Course.oState.currLesson = parseInt(les);
		Course.oState.currFragment = parseInt(fragm);
		$('body div.debug-wnd input[name=lesson_n]').val(les);
		$('body div.debug-wnd span.lesson_fr').html(fragm);
	},

	swapLessons: function(nLesHide, nLesShow, fu)
	{
		var LesHide = $('#lesson' + nLesHide);
		var LesShow = $('#lesson' + nLesShow);

		LesHide.fadeOut(1500);
		LesShow.fadeIn(1500, function()
		{
			if(typeof(fu) === "function") fu();
		});
	},

	/* Hide current lesson and show lesson #id */
	showLesson: function(id, fu)
	{
		Course.videoPause();
		Course.setMenuIcons(id);


		$('#progressBar').css('display', 'flex');
		Course.calculateProgressBar();

		if (Course.calculateLessonProgress(id) !== null) {
			const progressText = `OVERALL PROGRESS: ${Course.calculateOverallProgress()}% | ` +
				`LESSON ${Course.getLessonNumberBySubChapterId(id)}: ${Course.calculateLessonProgress(id)}%`
			$('#lessonProgressPercent p')[0].innerText = progressText;
		} else  {
			$('#lessonProgressPercent p')[0].innerText = '';
		}

		var elLes = $('#lesson' + id);
		var lesPrev = $('section.holder .lesson:visible');

		//show curr-card-name
		var i, name="";
		for(i=0; i<lessonName.length; i++)
		{
			if(lessonName[i].les == id)
			{
				name = lessonName[i].name;
				break;
			}
		}

		if(name == "")
		{
			$('.course header .curr-card-name').hide();
		}
		else
		{
			$('.course header .curr-card-name span').html(name);
			$('.course header .curr-card-name').show();
		}
		//

		if(lesPrev.length < 1)
		{
			if(elLes.length < 1) return;
			if(elLes.is(':visible'))
			{
				Course.setLessonFragment(id,0);
				elLes.css({ 'opacity':'1', 'display':'block' });
				return;
			}

			elLes.fadeIn(1500, function()
			{
				Course.setLessonFragment(id,0);
				if(fu)
				{
					fu();
				}
			});
			Course.showCardPoints();
			return;
		}

		elLes.hide(function()
		{
			lesPrev.fadeOut(1500);
			elLes.fadeIn(1500, function()
			{
				Course.setLessonFragment(id,'0');
				if(typeof(fu) === "function")
				{
					fu();
				}
			});
		});
		
		Course.showCardPoints();
	},

	/* Do not hide current lesson and show lesson #id */
	showLessonOver: function(id, fu)
	{
		var elLes = $('#lesson' + id);
		var lesPrev = $('section.holder .lesson:visible');

		elLes.hide(function()
		{
			elLes.fadeIn(1500, function()
			{
				Course.setLessonFragment(id,'0');
				if(typeof(fu) === "function")
				{
					fu();
				}
			});
		});
		
		Course.showCardPoints();
	},

	/*
	//Hide w1 and show w2
	swapBlocks: function(w1, w2, t, fu)
	{
		if(t == undefined) t = 1500;

		if(w1 == w2) //the same block
		{
			if(w2.is(':hidden'))
			{
				w2.css({ 'opacity': 0, 'display': 'block' });
				w2.animate({ 'opacity': 1 }, t, function()
				{
					$('div.lesson .block-scroll').scrollTop(0);
					if(fu) fu();
				});
			}
			return;
		}

		w2.css({ 'opacity': 0, 'display': 'block' });
		w1.animate({ 'opacity': 0 }, t, function()
		{
			w1.css('display','none');
			if(fu) fu();
		});
		w2.animate({ 'opacity': 1 }, t, function()
		{
			$('div.lesson .block-scroll').scrollTop(0);
		});
	},
	*/

	//Show/hide bottom buttons of lesson
	showBotButtons: function(les, mode)
	{
		var butt = $('#lesson' + les + ' .bot-buttons button');

		if(mode === false)
		{
			butt.hide();
		}
		else
		{
			if($(butt[0]).is(':visible')) return;
			butt.fadeIn(500);
		}
	},

	showBotNextButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-xx-next');
		if(mode === false)
		{
			but.hide();
		}
		else
		{
			if(but.is(':visible')) return;
			but.fadeIn(500);
		}
	},

	showBotPrevButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-xx-prev');
		if(mode === false)
		{
			but.hide();
		}
		else
		{
			if(but.is(':visible')) return;
			but.fadeIn(500);
		}
	},

	showBotResultButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-show-res');
		if(mode === false)
		{
			but.hide();
		}
		else
		{
			if(but.is(':visible')) return;
			but.fadeIn(500);
		}
	},

	enaBotNextButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-xx-next');
		if(mode === false)
		{
			but.prop('disabled',true);
		}
		else
		{
			but.prop('disabled',false);
		}
	},

	enaBotPrevButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-xx-prev');
		if(mode === false)
		{
			but.prop('disabled',true);
		}
		else
		{
			but.prop('disabled',false);
		}
	},

	enaBotResultButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-show-res');
		if(mode === false)
		{
			but.prop('disabled',true);
		}
		else
		{
			but.prop('disabled',false);
		}
	},

	enaBotButtons: function(les, mode)
	{
		var butt = $('#lesson' + les + ' .bot-buttons button');

		if(mode === false)
		{
			butt.prop('disabled',true);
		}
		else
		{
			butt.prop('disabled',false);
		}
	},
	enaBotButtons2: function(les)
	{
		$('#lesson' + les + ' .bot-buttons button').prop('disabled',false);
	},

	calcCardPoints: function()
	{
		var nCards = 0;
		var allPoints = 0.0;
		var i,n;

		if(Course.oState.card81 >= 100) { nCards++; }
		if(Course.oState.card82 >= 100) { nCards++; }
		if(Course.oState.card83 >= 100) { nCards++; }
		if(Course.oState.card84 >= 100) { nCards++; }
		if(nCards == 4) { nCards++ } //card61 = 100%

		if(Course.oState.card62 >= 100) { nCards++; }
		if(Course.oState.card63 >= 100) { nCards++; }
		if(Course.oState.card64 >= 100) { nCards++; }

		if(Course.oState.card121 >= 100) { nCards++; }
		if(Course.oState.card122 >= 100) { nCards++; }
		if(Course.oState.card123 >= 100) { nCards++; }

		if(Course.oState.card141 >= 100) { nCards++; }
		if(Course.oState.card142 >= 100) { nCards++; }
		if(Course.oState.card143 >= 100) { nCards++; }
		if(Course.oState.card144 >= 100) { nCards++; }

		if(Course.oState.card161 >= 100) { nCards++; }
		n = 0;
		if(Course.oState.card1621 >= 100) { nCards++; n++; }
		if(Course.oState.card1622 >= 100) { nCards++; n++; }
		if(n == 2) { nCards++; } //card162 = 100%
		if(Course.oState.card163 >= 100) { nCards++; }

		if(Course.oState.card201 >= 100) { nCards++; }
		if(Course.oState.card202 >= 100) { nCards++; }

		if(Course.oState.card221 >= 100) { nCards++; }
		if(Course.oState.card222 >= 100) { nCards++; }

		if(Course.oState.card241 >= 100) { nCards++; }
		if(Course.oState.card242 >= 100) { nCards++; }
		if(Course.oState.card243 >= 100) { nCards++; }
		Course.oState.nCards = nCards;

		allPoints = (parseFloat(Course.oState.card73) +
					 parseFloat(Course.oState.card101) +
					 parseFloat(Course.oState.card102) +
					 parseFloat(Course.oState.card124) +
					 parseFloat(Course.oState.card125) +
					 parseFloat(Course.oState.card145) +
					 parseFloat(Course.oState.card164) +
					 parseFloat(Course.oState.card244)) / 8;

		Course.oState.allPoints = allPoints;

		//for SCORM: set state
		saveState();
		Course.debugState();
		return allPoints;
	},

	/*
	getQAnswered: function(card, q)
	{
		if(card == 101)
		{
			return Course.oState.chal101[q];
		}
	},
	setQAnswered: function(card, q, ans)
	{
		if(card == 101)
		{
			if(ans) ans = 1;
			else ans = 0;
			Course.oState.chal101[q] = ans;
			return;
		}
	},
	*/

	debugState: function()
	{
		//debug
		var s = "";
		s += "les: " + Course.oState.currLesson + "<br>";
		s += "avatar: " + Course.oState.avatar + "<br>";
		s += "lang: " + Course.oState.lang + "<br>";
		$('div.debug-wnd div.state').html(s);
	},


	showCardPoints: function()
	{
		var allPoints = Course.calcCardPoints();

		$('.lesson .lesson-body .cards-points .c span').html(Course.oState.nCards);
		$('.lesson .lesson-body .cards-points .p span').html(parseInt(allPoints));
	},

	elFadeIn: function(el, t)
	{
		el.css({ 'opacity': '0', 'display': 'block' });
		el.animate({
			'opacity': '1'
		}, t);
	},

	elFadeOut: function(el, t)
	{
		el.css({ 'opacity': '1', 'display': 'block' });
		el.animate({
			'opacity': '0'
		}, t, function()
		{
			el.css('display', 'none');
		});
	},

	greyPopup: function(les, n, mode)
	{
		if(mode == true)
		{
			Course.elFadeIn($('.wrap-course .grey-bg'));
			Course.elFadeIn($('#lesson' + les + ' .lesson-msg' + n).fadeIn(400));
		}
		else
		{
			Course.elFadeOut($('.wrap-course .grey-bg'));
			Course.elFadeOut($('#lesson' + les + ' .lesson-msg' + n).fadeOut(400));
		}
	},

	calculateProgressBar: function()
	{

		function clearProgressBar() {
			const progressBar = $('#progressBar')[0];
			progressBar.innerHTML = '<div class="progress-bar-point active" id="progress-bar-start-point"></div>';
		}

		function appendToProgressBar (node) {
			$('#progressBar')[0].appendChild(node);
		}

		function placeProgressBarElement(name, active, options = {}, styles = {}) {
			const progressBarElement = document.createElement('div');
			progressBarElement.classList.add(name)

			if (active) {
				progressBarElement.classList.add('active')
			}

			Object.keys(options).forEach(property => progressBarElement[property] = options[property])
			Object.keys(styles).forEach(property => progressBarElement.style[property] = styles[property])

			appendToProgressBar(progressBarElement);
		}

		function placeProgressBarPoint(active, lessonNumber) {
			placeProgressBarElement('progress-bar-point', active, {innerHTML: `<p class="progress-bar-point-text">${lessonNumber}</p>`})
		}

		function placeProgressBarConnector(active, width) {
			placeProgressBarElement('progress-bar-point-connector-line', active, {}, {width: `${width}px`})
		}

		function activateProgressParStartPoint() {
			$('#progress-bar-start-point')[0].classList.add('active');
		}

		function chaptersWidth(chaptersList) {
			const progressBarWidth = $('#progressBar')[0].offsetWidth;
			// block width - occupied by points width
			const availableWidth = progressBarWidth - (chaptersList.length + 1) * 8

			const lessonsSubchapters = chaptersList.map(chapter => chapter.querySelectorAll('li').length);
			const totalSubchaptersCount = lessonsSubchapters.reduce((a, b) => a + b);

			return lessonsSubchapters.map(subchaptersCount =>
				Math.floor(availableWidth * subchaptersCount / totalSubchaptersCount)
			);
		}

		function isNextChaptersActive(chapterList, chapterIndex) {
			return [...chapterList].some((anotherChapter, anotherChapterIndex) =>
				anotherChapterIndex > chapterIndex && anotherChapter.classList.contains('full')
			);
		}

		clearProgressBar();

		const mainLessonsChapter = $('.menu-en .lesx').toArray();
		const chapterConnectorsWidthList = chaptersWidth(mainLessonsChapter);

		mainLessonsChapter.forEach((mainChapter, chapterIndex, chapterList) => {
			if (chapterIndex === 0 && mainChapter.classList.contains('full')) {
				activateProgressParStartPoint()
			}
			let isActiveChapter = false;

			if (mainChapter.classList.contains('full') || isNextChaptersActive(chapterList, chapterIndex)) {
				isActiveChapter = true;
			}

			placeProgressBarConnector(isActiveChapter, chapterConnectorsWidthList[chapterIndex]);
			placeProgressBarPoint(isActiveChapter, chapterIndex + 1);
		});
	},

	calculateOverallProgress: function () {
		const mainLessonsChapter = $('.menu-en .lesx').toArray();

		const totalSubchaptersCount = mainLessonsChapter.map(chapter => chapter.querySelectorAll('li').length)
			.reduce((a, b) => a + b);
		const totalFinishedSubchaptersCount = mainLessonsChapter
			.map(chapter =>	chapter.querySelectorAll('li.full').length).reduce((a, b) => a + b);

		return Math.ceil(totalFinishedSubchaptersCount * 100 / totalSubchaptersCount);
	},

	calculateLessonProgress: function (id) {
		const currentMainChapter = Course.getMainChapterBySubChapterId(id);
		if (!currentMainChapter) {
			return null;
		}

		const mainChapter = $(`.lesx.les${currentMainChapter}`)[0];
		const totalSubchaptersCount = mainChapter.querySelectorAll('li').length;
		const totalFinishedSubchaptersCount = mainChapter.querySelectorAll('li.full').length;
		return Math.ceil(totalFinishedSubchaptersCount * 100 / totalSubchaptersCount);
	},

	getMainChapterBySubChapterId: function (id) {
		const mainChapters = $('.menu-en .lesx').toArray()
			.map(chapter => Number(chapter.classList.item(1).replace( /^\D+/g, '')));

		if (mainChapters.includes(id)) {
			return id;
		}

		const displayChapter = $(`#lesson${id}`);
		return mainChapters.reverse().find(chapter => displayChapter.prevAll(`#lesson${chapter}`).length > 0);
	},

	getLessonNumberBySubChapterId: function (id) {
		const mainChapters = $('.menu-en .lesx').toArray()
			.map(chapter => Number(chapter.classList.item(1).replace( /^\D+/g, '')));

		return mainChapters.findIndex(chapter => chapter === this.getMainChapterBySubChapterId(id)) + 1;
	}
};


var OCookies =
{
	nTimeCookie: 31536000, //1 year

	getCookieVal: function(offset)
	{
		var endstr = document.cookie.indexOf(";", offset);
		if(endstr == -1)
		{
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	},

	getCookie: function(name)
	{
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while(i < clen)
		{
			var j = i + alen;
			if(document.cookie.substring(i, j) == arg)
			{
				return OCookies.getCookieVal(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if(i == 0)
			{
				break;
			}
		}
		return null;
	},

	getIntCookie: function(name)
	{
		var co;
		var cc;
		co = parseInt(OCookies.getCookie(name));
		if(co !== co) co = 0;
		return co;
	},

	//name - cookie name
	//value - cookie val (string)
	//options - obj with additional properties:
	//		expires - time of exp.
	//			number - seconds.
	//			Date obj - date.
	//		if expires in past - cookie will be deleted.
	//		if expires = 0 (or miss), cookie will be set as session.
	setCookie: function(name, value, options)
	{
		options = options || { expires: OCookies.nTimeCookie };
		var expires = options.expires;
		if(typeof expires == "number" && expires)
		{
			var d = new Date();
			d.setTime(d.getTime() + expires*1000);
			expires = options.expires = d;
		}

		if(expires && expires.toUTCString)
		{
			options.expires = expires.toUTCString();
		}

		value = encodeURIComponent(value);
		var updatedCookie = name + "=" + value;

		for(var propName in options)
		{
			updatedCookie += "; " + propName;
			var propValue = options[propName];   
			if(propValue !== true)
			{
				updatedCookie += "=" + propValue;
			}
		}
		document.cookie = updatedCookie;
	},

	set: function(name, val)
	{
		if(fSCORM)
		{
			//if SCORM: save state oState
			saveState();
		}
		else
		{
			//save cookie
			if(val == undefined) val = "0";
			OCookies.setCookie(name, val);
		}
	},
	/*
	//attr: "passed", "time", ...etc
	setLessonAttr: function(nLesson, attr, val)
	{
		if(val == undefined) val = "0";
		OCookies.setCookie("lesson"+nLesson +"_"+attr, val);

		//if SCORM: save state
		ScormObj.saveState();
	},

	//remove cookie
	resLessonAttr: function(nLesson, attr)
	{
		OCookies.setCookie("lesson"+nLesson +"_"+attr, "0", -3600);
	}
	*/
};

var AudioPlayer = {
	init2: function(elm, src)
	{
		var vaudio = elm.find('audio');

		elm.append(
			'<div class="audiobar left">' +
				'<div class="progress"><span></span></div>' +
				'<div class="audiowrap">' + 
					'<audio>' + vaudio.html() + '</audio>' +
				'</div>' +
			'</div>');

		vaudio.remove();

		au = elm.find('audio');
		if(au.length > 0)
			au[0].addEventListener("timeupdate", function() {
				var a,b;
				var el;
				el = $(this);
				a = el[0].currentTime;
				b = el[0].duration;
				//console.log("play",$(this), $(this)[0].currentTime, $(this)[0].duration);

				var span;
				span = el.parent().parent().find('.progress span');
				//progress
				span.css('width', a/b*100+'%');
				if(a == b) span.css('width', '0');
		});
	},
/*
	init: function(id, fu)
	{
		var au;
		au = document.getElementById(id);
		au.addEventListener("timeupdate", function() {
			//console.log("play",au.currentTime,"/",au.duration);
			if(fu) fu(au.currentTime,au.duration);
		});
		return au;
	},
*/
	load: function(el)
	{
		var au = null;
		if(el.length > 0) au = el.find('audio');
		if(au.length > 0)
		{
			au[0].load();
			el.find('.progress span').css('width','0');
		}
	},

	play: function(el)
	{
		var au = null;
		if(el.length > 0) au = el.find('audio');
		if(au.length > 0) au[0].play();
	},

	pause: function(el)
	{
		var au = null;
		if(el.length > 0) au = el.find('audio');
		if(au.length > 0) au[0].pause();
	}
};
