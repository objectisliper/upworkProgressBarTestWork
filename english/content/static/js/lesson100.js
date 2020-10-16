//SOCIAL ENGINEERING / PHISHING / CHALLENGES

//"book" before chapter1: soc eng / CHALLENGES
var Lesson1000 = {
	pre: function()
	{
		Course.showBotButtons(1000,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson1000.pre();
				$('#lesson1000 .page-book .chapter-book').removeClass('active');

				Course.showLesson(1000, function()
				{
					$('#lesson1000 .page-book .chapter-book').addClass('active');
					setTimeout(function()
					{
						Course.showBotButtons(1000,true);
					}, 1000);
				});
				break;

			case 1:
				Lesson100.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson900.next(0);
	}
};


var Lesson100 = {
	f_pre: false,
	f_zoomed: false,

	pre: function()
	{
		Course.showBotButtons(100,false);
		Lesson100.f_zoomed = false;

		$('#lesson100 .lesson-body .bg > img').css({
			'width': '1059px',
			'margin-top': '-158px',
			'margin-left': '-43px'
		});

		$('#lesson100 .lesson-body .bg .intro').hide();
		$('#lesson100 .lesson-body .bg .cards').hide();

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson100 .lesson-body .cards .is_sam').show();
			$('#lesson100 .lesson-body .cards .is_sue').hide();
		}
		else //1 - Sue
		{
			$('#lesson100 .lesson-body .cards .is_sam').hide();
			$('#lesson100 .lesson-body .cards .is_sue').show();
		}

		$('#lesson100 div.card').removeClass('active');

		Lesson100.setCardIco();

		if(!Lesson100.f_pre)
		{
			Lesson100.f_pre = true;
			
			$('#lesson100 div.card').click(function()
			{
				if($(this).hasClass('card101')) Lesson101.next(0);
				if($(this).hasClass('card102')) Lesson102.next(0);
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

		if(Course.oState.card101  >= 100) //ph quiz
			setIco($('#lesson100 div.card101'), 'a');
		else if(Course.oState.card101 >= 1)
			setIco($('#lesson100 div.card101'), 'p');

		if(Course.oState.card102  >= 100) //domains
			setIco($('#lesson100 div.card102'), 'a');
		else if(Course.oState.card102 >= 1)
			setIco($('#lesson100 div.card102'), 'p');
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson100.pre();
				Course.showLesson(100, function()
				{
					$('#lesson100 .lesson-body .bg .intro').fadeIn(500);
					Course.showBotButtons(100,true);
				});
				break;
			case 1: //zoom & cards
				if(Lesson100.f_zoomed)
				{
					Lesson60.next(0);
					break;
				}

				Course.showBotButtons(100,false);

				$('#lesson100 .lesson-body .bg .intro').hide();
				$('#lesson100 div.card').hide();

				$('#lesson100 .lesson-body .bg > img').animate({
					'width': '1800px',
					'margin-top': '-399px',
					'margin-left': '-523px'
				}, 1500, function()
				{
					$('#lesson100 .lesson-body .bg .cards').show();
					$('#lesson100 div.card101').fadeIn(400, function()
					{
						$('#lesson100 div.card102').fadeIn(400, function()
						{
							Lesson100.f_zoomed = true;
							Course.showBotButtons(100,true);
						});
					});
				});
				break;

			case 2: //go to zoomed page
				Lesson100.pre();

				//zoom
				$('#lesson100 .lesson-body .bg > img').css({
					'width': '1800px',
					'margin-top': '-399px',
					'margin-left': '-523px'
				});

				$('#lesson100 .lesson-body .bg .cards').show();

				Course.showLesson(100, function()
				{
					$('#lesson100 div.card101').fadeIn(400, function()
					{
						$('#lesson100 div.card102').fadeIn(400, function()
						{
							Lesson100.f_zoomed = true;
							Course.showBotButtons(100,true);
						});
					});
				});
				break;
		}
	},

	back: function(n)
	{
		switch(n)
		{
			case 0:
				if(Lesson100.f_zoomed)
				{
					Course.showBotButtons(100,false);
					$('#lesson100 .lesson-body .bg .cards').hide();
					$('#lesson100 .lesson-body .bg > img').animate({
						'width': '1059px',
						'margin-top': '-158px',
						'margin-left': '-43px'
					}, 1500, function()
					{
						Lesson100.pre();
						$('#lesson100 .lesson-body .bg .intro').fadeIn(500);
						Course.showBotButtons(100,true);
					});
					break;
				}

				Lesson1000.next(0);
				break;
		}
	}
};

//GAME: PHISH OR REAL?
//see: startQuiz32 -> questOffset - offset for lucy questions
var Lesson101 = {
	percent: 0,

	pre: function()
	{
		$('#lesson101 .lesson-msg').hide(); 

		if(Course.oState.card101 < 1)
		{
			Course.oState.card101 = 1;
			OCookies.set("card101", Course.oState.card101);
		}

		Course.showBotButtons(101,false);
		Course.enaBotNextButton(101,false);
		Quiz32reInit();
		Quiz32Init();
	},

	setPercent: function(perc, right_ans_total, total_cnt)
	{
		Course.oState.card101 = parseInt(perc);
		OCookies.set("card101", Course.oState.card101);

		Lesson101.right_ans_total = right_ans_total;
		Lesson101.total_cnt = right_ans_total;
	},

	quizAnswer: function(nans, ncnt) //calls from quiz.js
	{
		nans++;
		console.log("quizAnswer", nans, ncnt, Course.oState.f_card101, Lesson101.right_ans_total, Lesson101.total_cnt);

		if(nans == ncnt) Course.enaBotNextButton(101,true);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson101.pre();

				Course.showLesson(101, function()
				{
					Course.showBotButtons(101,true);

					//attempts
					Course.oState.card101n++;
					OCookies.set("card101n", Course.oState.card101n);
					console.log("101 attempt",Course.oState.card101n);

					if(Course.oState.card101n > 5)
					{
						//too many attempts!
						Course.oState.card101n = 0; //reset attempts
						OCookies.set("card101n", Course.oState.card101n);

						//message: You did not manage to complete the challenge in a reasonable number of attempts.
						Course.greyPopup(101, 2, true);
						return;
					}
					//
				});
				break;

			case 1:
				Lesson100.next(0);
				break;

			case 10:
				//hide message
				Course.greyPopup(101, 1, false);
				break;
		}
	},

	back: function(n)
	{
		switch(n)
		{
			case 0:
				//message: Warning: If you go back, you will abort the current challenge.
				Course.greyPopup(101, 1, true);
				break;
			case 1:
				Course.greyPopup(101, 1, false);
				Lesson100.next(2);
				break;
			case 2:
				Course.greyPopup(101, 2, false);
				Lesson60.next(0);
				break;
		}
	}
};

//EXAM
var Lesson102 = {
	f_pre: false,
	nCorrAnsw: 0, //count of correct answers
	exam_copy: null, //Lesson102.exam_copy.length - count of questions
	f_showresults: 1, //1 - enable 'Show Results' (see fin_exam102[])
	threshold: 80, //must be >=80% correct answers

	nCurrQuestion: 0, //# of curr question
	countAnsw: 0, //count of answers (1...5) for the curr question
	currAnsw: 0, //right answer (bits)
	currType: 0, //type of the curr question

	initQ: function()
	{
		Lesson102.nCurrQuestion = 0;

		if(Lesson102.exam_copy[0].randQ)
		{
			var i,n;
			for(i=0; i<Lesson102.exam_copy.length; i++)
			{
				Lesson102.exam_copy[i].usedQ = 0;
				Lesson102.exam_copy[i].nQ = i;
			}

			fin_exam102 = [];
			for(i=0; i<Lesson102.exam_copy[0].countQ; i++)
			{
				n = Lesson102.randQ();
				fin_exam102.push(Lesson102.exam_copy[n]);
			}
			fin_exam102[0].showResults = Lesson102.exam_copy[0].showResults;
			Lesson102.f_showresults = fin_exam102[0].showResults;
			fin_exam102[0].skipExam = Lesson102.exam_copy[0].skipExam;
			fin_exam102[0].randQ = Lesson102.exam_copy[0].randQ;
			fin_exam102[0].countQ = Lesson102.exam_copy[0].countQ;
		}
		else //all questions
		{
			var i,n;
			for(i=0; i<Lesson102.exam_copy.length; i++)
			{
				Lesson102.exam_copy[i].usedQ = 0;
				Lesson102.exam_copy[i].nQ = i;
			}

			fin_exam102 = Lesson102.exam_copy;
		}

		for(i=0; i<fin_exam102.length; i++)
		{
			fin_exam102[i].user_result = undefined;
		}
	},

	randQ: function()
	{
		var i;
		for(i=0; i<1000; i++)
		{
			var n = Math.floor(Math.random() * Lesson102.exam_copy.length);
			if(n >= Lesson102.exam_copy.length) continue;

			if(Lesson102.exam_copy[n].usedQ == 0)
			{
				Lesson102.exam_copy[n].usedQ = 1;
				return n;
			}
		}

		return 0;
	},

	//Load questions. n = 0..9
	loadQuestion: function(n)
	{
		/*
		question: "1 Phishing: What is phishing?",
		answer: 1, //1-first, 2-second, 4-third, 8-fourth, 5-first and third...
		answers:
		[
			"...answer1...",
			"...answer2...",
			"...answer3...",
			"...answer4..."
		]
		*/
		if(fin_exam102.length <= n) return false;

		var q = fin_exam102[n];

		Course.enaBotNextButton(102,false);
		Course.enaBotResultButton(102,false);

		Lesson102.nCurrQuestion = n; //# of question
		Lesson102.countAnsw = q.answers.length; //count of answers (1..5)
		Lesson102.currAnsw = q.answer;
		Lesson102.currType = q.type;

		if(q.question == "") $('#lesson102 .title2 h1').hide();
		else $('#lesson102 .title2 h1').html(q.question);

		$('#lesson102 .title2 h2').html(q.question2);

		var ians;
		for(ians=0; ians<5; ians++) //5 answers max
		{
			if(q.answers.length > ians)
			{
				$('#lesson102 .d-exam .fin-exam-a' + ians).show();
				$('#lesson102 .d-exam .fin-exam-a' + ians + ' td.text').html(q.answers[ians]);

				if(q.answers.length > (ians+1))
				{
					$('#lesson102 .d-exam .fin-exam-a' + ians).addClass('dotted');
				}
				else
				{
					$('#lesson102 .d-exam .fin-exam-a' + ians).removeClass('dotted');
				}
			}
			else
			{
				$('#lesson102 .d-exam .fin-exam-a' + ians).hide();
			}
		}

		//uncheck all
		$('#lesson102 .d-exam input[type=checkbox]').prop("checked",false);
		$('#lesson102 .d-exam input[type=checkbox] + label').removeClass("ch-label-green ch-label-red");

		return true;
	},

	chboxChange: function(el)
	{
		el = $(el);

		//only one answer is possible (no multicheck)
		//uncheck all except el
		if(Lesson102.currType == 'radio')
		{
			var el_id = el.attr('id');
			$('#lesson102 .tbl-check input:checked').each(function()
			{
				if($(this).attr('id') != el_id)
					$(this).prop('checked',false);
			});
		}
		//else assume currType = 'check'

		var id = el.attr('id');
		//id = "ch-exam3-1a"..."ch-exam3-5a"
		var nch = parseInt(id.substr(9,1)); //number of checkbox: 1..5

		//is answered?
		for(i=0; i<=5; i++)
		{
			if($('#ch-exam3-'+i+'a').is(':checked'))
			{
				//answered
				Course.enaBotNextButton(102,true);
				if(Lesson102.f_showresults == 1)	Course.enaBotResultButton(102,true);
				break;
			}
		}
	},

	//show results
	showResults: function()
	{
		Lesson102.chBg();
		return false;
	},

	//next
	nextQuestion: function()
	{
		var nquest = Lesson102.nCurrQuestion; //# of question
		nquest++;

		Lesson102.chBg();
		Lesson102.next(nquest);
	},

	getCheckedCode: function()
	{
		var code = 0;
		if($('#ch-exam3-1a').is(':checked')) code += 1;
		if($('#ch-exam3-2a').is(':checked')) code += 2;
		if($('#ch-exam3-3a').is(':checked')) code += 4;
		if($('#ch-exam3-4a').is(':checked')) code += 8;
		if($('#ch-exam3-5a').is(':checked')) code += 16;
		return code;
	},

	chBg: function()
	{
		var correct_answer; //1 or 2 or 4 or 8 or 16 or '1,2,3,4,5'
		var nquest = Lesson102.nCurrQuestion; //# of question
		var nq = nquest;

		correct_answer = Lesson102.currAnsw; //1 or 2 or 4 or 8 or 16

		$('#lesson102 .d-exam input[type=checkbox]').removeClass('ch-label-green ch-label-red');

		if(correct_answer & 1)
			$('#ch-exam3-1a + label').addClass('ch-label-green');

		if(correct_answer & 2)
			$('#ch-exam3-2a + label').addClass('ch-label-green');

		if(correct_answer & 4)
			$('#ch-exam3-3a + label').addClass('ch-label-green');

		if(correct_answer & 8)
			$('#ch-exam3-4a + label').addClass('ch-label-green');

		if(correct_answer & 16)
			$('#ch-exam3-5a + label').addClass('ch-label-green');

		var userAnswer = Lesson102.getCheckedCode();
		var userAnswerN = fin_exam102[nq].nQ;

		if(fin_exam102[nq].user_result == undefined)
		{
			if(userAnswer == correct_answer)
			{
				Course.lucyAnswer(102, userAnswerN,true);
				fin_exam102[nq].user_result = 1;
				Lesson102.nCorrAnsw++;
			}
			else
			{
				Course.lucyAnswer(102, userAnswerN,false);
				fin_exam102[nq].user_result = 0;
			}

			Course.oState.card102 = Lesson102.nCorrAnsw / fin_exam102.length * 100;
			OCookies.set("card102", Course.oState.card102);
		}
	},

	pre: function()
	{
		$('#lesson102 .lesson-msg').hide(); 

		Course.showBotButtons(102,false);
		Course.enaBotNextButton(102,false);
		Course.enaBotResultButton(102,false);

		if(Course.oState.card102 < 1)
		{
			Course.oState.card102 = 1;
			OCookies.set("card102", Course.oState.card102);
		}

		//only once
		if(!Lesson102.f_pre)
		{
			Lesson102.f_pre = true;

			Lesson102.exam_copy = fin_exam102;

			$('#lesson102 input[type=checkbox]').change(function()
			{
				Lesson102.chboxChange(this);
			});

			//show results
			$('#lesson102 .b-show-res').click(function()
			{
				Lesson102.showResults();
			});

			//next
			$('#lesson102 .b-102-next').click(function()
			{
				Lesson102.nextQuestion();
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson102.pre();
				Lesson102.initQ();
				Lesson102.nCorrAnsw = 0;
				Lesson102.loadQuestion(0);
				$('#lesson102 div.exam-bg div.exam-container').hide();
				$('#lesson102 div.exam-bg img.exam-bg-img').css({
					'width': '1800px',
					'margin-top': '-395px',
					'margin-left': '-524px'
				});
				$('#lesson102 .title2, #lesson102 .d-exam').show();
				$('#lesson102 .title h3 span.q').html(1);
				$('#lesson102 .title h3 span.n').html(fin_exam102.length);

				Course.showLesson(102, function()
				{
					//attempts
					Course.oState.card102n++;
					OCookies.set("card102n", Course.oState.card102n);
					console.log("102 attempt",Course.oState.card102n);

					if(Course.oState.card102n > 5)
					{
						//too many attempts!
						Course.oState.card102n = 0; //reset attempts
						OCookies.set("card102n", Course.oState.card102n);

						//message: You did not manage to complete the challenge in a reasonable number of attempts.
						Course.greyPopup(102, 2, true);
						return;
					}
					//


					$('#lesson102 div.exam-bg img.exam-bg-img').animate({
						'width': '2323px',
						'margin-top': '-563px',
						'margin-left': '-685px'
					}, 1500);

					setTimeout(function()
					{
						$('#lesson102 div.exam-bg div.exam-container').fadeIn(400);

						Course.showBotButtons(102,true);
					}, 1500);
				});
				break;

			default: //1..9 - go to the next question
				Lesson102.pre();
				$('#lesson102 .title2').fadeOut(500);
				$('#lesson102 .d-exam').fadeOut(500, function()
				{
					if(!Lesson102.loadQuestion(n))
					{
						//end of exam
						Lesson103.next(0);
						return;
					}

					$('#lesson102 .title h3 span.q').html(n+1);

					$('#lesson102 .title2, #lesson102 .d-exam').fadeIn(500, function()
					{
						Course.showBotButtons(102,true);
					});
				});
				break;

			case 100:
				//hide message
				Course.greyPopup(102, 1, false);
				break;
		}
	},

	back: function(n)
	{
		switch(n)
		{
			case 0:
				//message: Warning: If you go back, you will abort the current challenge.
				Course.greyPopup(102, 1, true);
				break;
			case 1:
				Course.greyPopup(102, 1, false);
				Lesson100.next(2);
				break;
			case 2:
				Course.greyPopup(102, 2, false);
				Lesson60.next(0);
				break;
		}
	}
};

var Lesson103 = {
	pre: function()
	{
		Course.showBotButtons(103,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson103.pre();
				Lesson103.loadAnswers();

				//100 points = all correct answers
				Course.oState.card102 = Lesson102.nCorrAnsw / fin_exam102.length * 100;
				OCookies.set("card102", Course.oState.card102);

				Course.showLesson(103, function()
				{
					Course.showBotButtons(103,true);
				});
				break;
			case 1:
				Lesson100.next(2); //zoomed
				break;
		}
	},

	back: function(n)
	{
		Lesson100.next(2); //zoomed
	},

	loadAnswers: function()
	{
		if(fin_exam102.length < 1) return false;

		var n;
		var tbl = $('#lesson103 .d-exam table tbody');
		tbl.html("");
		var nresults = 0;

		for(n=0; n<fin_exam102.length; n++)
		{
			var q = fin_exam102[n];
			var tr;
			var nq = parseInt(n)+1;
			var q_class = "q bad";
			if(q.user_result > 0) { q_class = "q good"; nresults++; }

			//question
			if(q.question == "")
			{
				tr = '<tr><td class="' + q_class +
						'">Q:&nbsp;</td><td class="question"><strong>' + nq + '</strong> ' +
						q.question2 + '</td></tr>';
			}
			else
			{
				tr = '<tr><td class="' + q_class +
						'">Q:&nbsp;</td><td class="question"><strong>' + nq +
						' '+ q.question + '</strong> ' + q.question2 + '</td></tr>';
			}
			tbl.append(tr);

			//answers
			if(q.answer & 1)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[0] + '</td></tr>';
				tbl.append(tr);
			}
			if(q.answer & 2)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[1] + '</td></tr>';
				tbl.append(tr);
			}
			if(q.answer & 4)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[2] + '</td></tr>';
				tbl.append(tr);
			}
			if(q.answer & 8)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[3] + '</td></tr>';
				tbl.append(tr);
			}
			if(q.answer & 16)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[4] + '</td></tr>';
				tbl.append(tr);
			}

			//comments
			tr = '<tr class="rem"><td></td><td class="rem">' + q.remark + '</td></tr>';
			tbl.append(tr);
		}

		console.log("results", nresults, fin_exam102.length, nresults / fin_exam102.length);
		lucyDispatchEvent('"EXAM: DOMAINS" results: ' + nresults + ' out of ' + fin_exam102.length);

		$('#lesson103 .d-exam h3 span.l').html(nresults);

		$('#lesson103 .d-exam h3 span.r').html(fin_exam102.length);
	}
};
