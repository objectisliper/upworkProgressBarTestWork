/**
 * Quiz32
 */
var startQuiz32 = function($) {
	'use strict';
	var nLesson = 101;
	var quizId = '#page_quiz32';
	var quizEl = $('#page_quiz32 .MailQuiz');
	var quizTools = $('#page_quiz32 .quiz-tools');
	var total_cnt = quizEl.children("section").length;
	var rigth_ans = [];
	var bad_ans = 0;
	var right_ans = 0;
	var curr_quiz = 0;
	var self = {};
	var next_title = Quiz32Config.nextTitle;
	var is_started = 0; //1 - user clecked on "Ph Mail" or "Reg Mail" at least one time
	var questOffset = 0;

	self.setPercent = function(perc, right_ans_total, total_cnt) {
		if(self.is_started) Lesson101.setPercent(perc, right_ans_total, total_cnt);
console.log("start",Quiz32Config.nextTitle);
	};

	/**
	 * Loads prev mail quiz
	 *
	 * @return {undefined}
	 */
	self.prevMail = function()
	{
		var active = quizEl.find('.active');

		active.addClass('move_up').removeClass('active');

		setTimeout(function(){
			active.removeClass("move_up");
		}, 1000);

		setTimeout(function(){
			active.prev().addClass('active');
		},700);
	};

	/**
	 * Loads next mail quiz
	 *
	 * @return {undefined}
	 */
	self.nextMail = function()
	{
		var active = quizEl.find('.active');

		active.addClass('move_up').removeClass('active');

		setTimeout(function(){
			active.removeClass("move_up");
		}, 1000);

		setTimeout(function(){
			//active.next().addClass('active');

			active = active.next();
			active.addClass('active');
			//show hint
			//active.find('.mail-hint').show();
		},700);
	};

	/**
	 * Sets next-prev buttons inactive or active
	 *
	 * @return {undefined}
	 */
	self.checkQuizCnt = function()
	{
		quizTools.find(".next-quiz").removeClass("inactive");
		quizTools.find(".prev-quiz").removeClass("inactive");

		if(curr_quiz <= 0){
			quizTools.find(".prev-quiz").addClass("inactive");
		}

		//if(curr_quiz >= total_cnt - 1){
		if(curr_quiz >= total_cnt)
		{
			quizTools.find(".next-quiz").addClass("inactive");
		}
	};

	/**
	 * Restores default states of answer btns and icon
	 * @return {undefined}
	 */
	self.refreshOptions = function()
	{
		self.allowAnswer = true;
		$(quizId + " .result .icon").removeClass("ok").removeClass("fail");

		$(quizId + " .quiz-tools .mid-text p").animate({ opacity: 1 }, 200);
		$(quizId + " .quiz-tools .mid-text .result").fadeOut(200);
	}

	/**
	 * Renders curr page num in right corner
	 */
	self.showCurrPage = function()
	{
		$(quizId + ' .quiz-tools .result-and-page .curr-page').html((curr_quiz + 1) + "/" + total_cnt);
		//var perc = parseInt((curr_quiz * 100 + 100) / total_cnt);
		//self.setPercent(perc);
	}

	/**
	 * Handles event, when user choosed an answer
	 *
	 * @params {object} this - jQuery button object
	 * @return {undefined}
	 */
	self.chooseAnswer = function()
	{
		if(self.allowAnswer === false) return false;

		self.is_started = 1;

		var answer = $(this).hasClass("not_spam");
		var result = quizEl.find(".mail-section.active").data("not-spam") == answer;
		var currQuizObj = quizEl.find('.active');

		//hide hint and show solution
		//currQuizObj.find(".mail-hint").hide();
		//currQuizObj.find(".mail-solution").show();

		$(quizId + " .quiz-tools .mid-text p").animate({ opacity: 0 }, 200);
		$(quizId + " .quiz-tools .mid-text .result").fadeIn(200);

		if(result){
			$(quizId + " .result .icon").addClass('ok');

			rigth_ans[curr_quiz] = 1;
			right_ans++;

			Course.lucyAnswer(nLesson, parseInt(curr_quiz), true);
		}else{
			$(quizId + " .result .icon").addClass('fail');
			rigth_ans[curr_quiz] = 0;
			bad_ans++;

			Course.lucyAnswer(nLesson, parseInt(curr_quiz), false);
		}

		//enable next button
		quizTools.find(".next-quiz").prop('disabled',false).prop('title',"");

		if(typeof window.setQuizResult !== 'undefined')
		{
			setQuizResult(right_ans, total_cnt);
		}

/*
		if(typeof window.funcEndQuiz !== 'undefined' && (curr_quiz == total_cnt - 1) && (bad_ans < 4))
		{
			//end of QUIZ call user function
			var rightans = total_cnt - bad_ans;
			funcEndQuiz(rightans, total_cnt);
		}

		//call user function: percent
		if(window.funcQuizCnt) funcQuizCnt(curr_quiz/total_cnt);
*/
		self.allowAnswer = false;

		if(Quiz32Config.autoStepAllow && Quiz32Config.autoStepAllow == true){

			if(curr_quiz == total_cnt - 1){
				setTimeout(function(){
					$(quizId + " .result").html("Quiz ended");
					$(quizId + " .mail-section.active").removeClass('active');
				}, parseInt(Quiz32Config.autoStepTimeout) > 0 ? Quiz32Config.autoStepTimeout : 1500);
			}else{

				setTimeout(function(){
					$(quizId + " .next-quiz").click();
				}, parseInt(Quiz32Config.autoStepTimeout) > 0 ? Quiz32Config.autoStepTimeout : 1500);
			}
		}

		$(quizId + " .solution").removeClass('inactive');
		var right_ans_total = 0;

		rigth_ans.forEach(function(item)
		{
			right_ans_total += item;
		});

		//quizTools.find(".result-right-answers-total").html("Right answers: " + right_ans_total + "/" + total_cnt);
		quizTools.find('.right-answers').html(right_ans_total + '/' + total_cnt);

		var perc = parseInt(right_ans_total / total_cnt * 100);
		self.setPercent(perc, right_ans_total, total_cnt);
		Lesson101.quizAnswer(curr_quiz, total_cnt);

		//more then 3 bad answers
		if(bad_ans > 3)
		{
			quizInit();
			self.allowAnswer = true;

			//reload page - comment this if you want do not reload
			window.location.reload();
		}
	};

	/* Listeners */
	;(function(){

		$(quizId + " .mail-body").on('mouseover', 'a', function(){
			var hoverdata = $(this).data("hover");

			hoverdata = hoverdata ? hoverdata : '';

			var hoveritem = $("<div>").addClass('hover-popup-link')
				.html("<p class='link-in-hover'>" + this.href + "</p><p class='hover-info'>" + hoverdata + "</p>");

			$(this).append(hoveritem);

			$(this).data("popup", hoveritem);
		});

		$(quizId + " .mail-body").on('mouseout', 'a', function(){
			$(this).data("popup").remove();
		});

		$(quizId + " .mail-body").on('click', 'a', function(){
			return false;
		});

		var clickHelper = {
			btnsAllow: true
		};

		quizTools.find(".quiz_btn").click(self.chooseAnswer);

		/**
		 * Prev btn handler
		 * @return {undefined}
		 */
		clickHelper.prevQuizClick = function()
		{
			if(curr_quiz > 0 && clickHelper.btnsAllow){
				self.prevMail();
				self.refreshOptions();
				quizTools.find(".mail-hint, .mail-solution").fadeOut();
				$(quizId + " .solution").addClass('inactive');

				clickHelper.btnsAllow = false;

				curr_quiz--;
				self.checkQuizCnt();

				//disable next button
				quizTools.find(".next-quiz").prop('disabled',true).prop('title', next_title);

				setTimeout(function(){
					clickHelper.btnsAllow = true;
				}, 2000);
			}

			self.showCurrPage();
		};

		/**
		 * Next btn handler
		 * @return {undefined}
		 */
		clickHelper.nextQuizClick = function()
		{
			if(curr_quiz < total_cnt - 1 && clickHelper.btnsAllow)
			{
				self.nextMail();
				self.refreshOptions();
				quizTools.find(".mail-hint, .mail-solution").fadeOut();
				$(quizId + " .solution").addClass('inactive');

				clickHelper.btnsAllow = false;

				curr_quiz++;
				self.checkQuizCnt();

				//new: always enabled
				//quizTools.find(".next-quiz").prop('disabled',true).prop('title', next_title);
				//old: disable next button
				quizTools.find(".next-quiz").prop('disabled',true).prop('title', next_title);

				setTimeout(function(){
					clickHelper.btnsAllow = true;
				}, 2000);
			}
			else
			{
				if(curr_quiz >= (total_cnt-1)) //end
				{
					quizTools.find(".next-quiz").prop('disabled',true);
					quizTools.find(".prev-quiz").prop('disabled',true);
					quizEl.find('div.end-page').fadeIn();
				}
			}

			self.showCurrPage();
		};

		$(quizId + " .prev-quiz").click(clickHelper.prevQuizClick);
		$(quizId + " .next-quiz").click(clickHelper.nextQuizClick);

		Quiz32Config.unsafeAttachTypes.forEach(function(item){
			quizEl.on('dblclick','.attachment-content.type-' + item, function(){
				alert('This is an unsafe attachment type. You should make sure you trust the sender before opening this.');
			});
		});
	}());

	/* Solution and hint*/
	;(function(){

		$(quizId + " .hint").click(function(){

			if(!this.classList.contains('inactive')){

				quizEl.find(".active .mail-hint").fadeToggle();
			}
		});

		$(quizId + " .solution").click(function(){

			if(!this.classList.contains('inactive')){

				quizEl.find(".active .mail-solution").fadeToggle();
			}
		});
	}());

	/* Init module */
	quizInit();

	function quizInit()
	{
		total_cnt = quizEl.children("section").length;
		rigth_ans = [];
		bad_ans = 0;
		curr_quiz = 0;

		if(!Quiz32Config.autoStepAllow){
			$(quizId + " .quiz-step-controls").show();
		}

		quizEl.children("section").removeClass("active");
		quizEl.children(".mail-hint, .mail-solution").css('display','none');

		$(quizId + " .result .icon").removeClass("ok").removeClass("fail");
		$(quizId + " .quiz-tools .mid-text p").css('opacity','1');
		$(quizId + " .quiz-tools .mid-text .result").hide();

		quizEl.children("section").first().addClass("active");
		self.checkQuizCnt();

		window.next = self.nextMail;
		self.showCurrPage();


		//show 1st hint
		//quizEl.find('.active .mail-hint').show();
		$(quizId + ' .quiz-tools .result-and-page .right-answers').html("0/" + total_cnt);
	}
};
