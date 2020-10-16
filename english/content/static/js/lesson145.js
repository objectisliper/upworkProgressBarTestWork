/* Password SECURITY challenge */
var Lesson145 = {
	f_pre: false,
	nCorrAnsw: 0, //count of correct answers
	exam_copy: null, //Lesson145.exam_copy.length - count of questions
	f_showresults: 1, //1 - enable 'Show Results' (see fin_exam145[])
	//threshold: 0, //must be >= XX% correct answers

	nCurrQuestion: 0, //# of curr question
	countAnsw: 0, //count of answers (1...5) for the curr question
	currAnsw: 0, //right answer (bits)
	currType: 0, //type of the curr question

	pre: function()
	{
		Course.showBotButtons(145,false);
		Course.enaBotNextButton(145,false);
		$('#lesson145 .bg .bubble3').show();
		$('#lesson145 .bg .d-exam').hide();
		$('#lesson145 .bg img').css({
			'width': '1016px',
			'margin-top': '-42px',
			'margin-left': '0'
		});

		if(Course.oState.card145 < 1)
		{
			Course.oState.card145 = 1;
			OCookies.set("card145",Course.oState.card145);
		}

		if(!Lesson145.f_pre)
		{
			Lesson145.f_pre = true;

			Lesson145.exam_copy = fin_exam145;

			$('#lesson145 input[type=checkbox]').change(function()
			{
				Lesson145.chboxChange(this);
			});
		}
	},

	zoom: function()
	{
		$('#lesson145 .bg .bubble3').hide();
		$('#lesson145 .bg .title').fadeIn(800);

		$('#lesson145 .bg img').animate({
			'width': '2040px',
			'margin-top': '-340px',
			'margin-left': '-891px'
		}, 1500, function()
		{
			$('#lesson145 .bg .d-exam').fadeIn(800);
		});
	},

	initQ: function()
	{
		Lesson145.nCurrQuestion = 0;

		if(Lesson145.exam_copy[0].randQ)
		{
			var i,n;
			for(i=0; i<Lesson145.exam_copy.length; i++)
			{
				Lesson145.exam_copy[i].usedQ = 0;
				Lesson145.exam_copy[i].nQ = i;
			}

			fin_exam145 = [];
			for(i=0; i<Lesson145.exam_copy[0].countQ; i++)
			{
				n = Lesson145.randQ();
				fin_exam145.push(Lesson145.exam_copy[n]);
			}

			fin_exam145[0].showResults = Lesson145.exam_copy[0].showResults;
			Lesson145.f_showresults = fin_exam145[0].showResults;
			fin_exam145[0].skipExam = Lesson145.exam_copy[0].skipExam;
			fin_exam145[0].randQ = Lesson145.exam_copy[0].randQ;
			fin_exam145[0].countQ = Lesson145.exam_copy[0].countQ;
		}
		else //all questions
		{
			var i,n;
			for(i=0; i<Lesson145.exam_copy.length; i++)
			{
				Lesson145.exam_copy[i].usedQ = 0;
				Lesson145.exam_copy[i].nQ = i;
			}

			fin_exam145 = Lesson145.exam_copy;
		}

		for(i=0; i<fin_exam145.length; i++)
		{
			fin_exam145[i].user_result = undefined;
		}
	},

	randQ: function()
	{
		var i;
		for(i=0; i<1000; i++)
		{
			var n = Math.floor(Math.random() * Lesson145.exam_copy.length);
			if(n >= Lesson145.exam_copy.length) continue;

			if(Lesson145.exam_copy[n].usedQ == 0)
			{
				Lesson145.exam_copy[n].usedQ = 1;
				return n;
			}
		}

		return 0;
	},

	//Load questions. n = 0..9
	loadQuestion: function(n)
	{
		if(fin_exam145.length <= n) return false;

		var q = fin_exam145[n];

		Course.enaBotNextButton(145,false);
		Course.enaBotResultButton(145,false);

		Lesson145.nCurrQuestion = n; //# of question
		Lesson145.countAnsw = q.answers.length; //count of answers (1..5)
		Lesson145.currAnsw = q.answer;
		Lesson145.currType = q.type;

		if(q.question == "") $('#lesson145 .title2 h1').hide();
		else $('#lesson145 .title2 h1').html(q.question);

		$('#lesson145 .title2 h2').html(q.question2);

		var ians;
		for(ians=0; ians<5; ians++) //5 answers max
		{
			if(q.answers.length > ians)
			{
				$('#lesson145 .d-exam .fin-exam-a' + ians).show();
				$('#lesson145 .d-exam .fin-exam-a' + ians + ' td.text').html(q.answers[ians]);

				if(q.answers.length > (ians+1))
				{
					$('#lesson145 .d-exam .fin-exam-a' + ians).addClass('dotted');
				}
				else
				{
					$('#lesson145 .d-exam .fin-exam-a' + ians).removeClass('dotted');
				}
			}
			else
			{
				$('#lesson145 .d-exam .fin-exam-a' + ians).hide();
			}
		}

		//uncheck all
		$('#lesson145 .d-exam input[type=checkbox]').prop("checked",false);
		$('#lesson145 .d-exam input[type=checkbox] + label').removeClass("ch-label-green ch-label-red");

		return true;
	},

	chboxChange: function(el)
	{
		el = $(el);

		//only one answer is possible (no multicheck)
		//uncheck all except el
		if(Lesson145.currType == 'radio')
		{
			var el_id = el.attr('id');
			$('#lesson145 .tbl-check input:checked').each(function()
			{
				if($(this).attr('id') != el_id)
					$(this).prop('checked',false);
			});
		}
		//else assume currType = 'check'

		var id = el.attr('id');
		//id = "ch-exam5-1a"..."ch-exam5-5a"
		var nch = parseInt(id.substr(9,1)); //number of checkbox: 1..5

		//is answered?
		for(i=0; i<=5; i++)
		{
			if($('#ch-exam5-'+i+'a').is(':checked'))
			{
				//answered
				Course.enaBotNextButton(145,true);
				if(Lesson145.f_showresults == 1) Course.enaBotResultButton(145,true);
				break;
			}
		}
	},

	//show results
	showResults: function()
	{
		Lesson145.chBg();
		return false;
	},

	getCheckedCode: function()
	{
		var code = 0;
		if($('#ch-exam5-1a').is(':checked')) code += 1;
		if($('#ch-exam5-2a').is(':checked')) code += 2;
		if($('#ch-exam5-3a').is(':checked')) code += 4;
		if($('#ch-exam5-4a').is(':checked')) code += 8;
		if($('#ch-exam5-5a').is(':checked')) code += 16;
		return code;
	},

	chBg: function()
	{
		var correct_answer; //1 or 2 or 4 or 8 or 16 or '1,2,3,4,5'
		var nquest = Lesson145.nCurrQuestion; //# of question
		var nq = nquest;

		correct_answer = Lesson145.currAnsw; //1 or 2 or 4 or 8 or 16

		$('#lesson145 .d-exam input[type=checkbox]').removeClass('ch-label-green ch-label-red');

		if(correct_answer & 1)
			$('#ch-exam5-1a + label').addClass('ch-label-green');

		if(correct_answer & 2)
			$('#ch-exam5-2a + label').addClass('ch-label-green');

		if(correct_answer & 4)
			$('#ch-exam5-3a + label').addClass('ch-label-green');

		if(correct_answer & 8)
			$('#ch-exam5-4a + label').addClass('ch-label-green');

		if(correct_answer & 16)
			$('#ch-exam5-5a + label').addClass('ch-label-green');

		var userAnswer = Lesson145.getCheckedCode();
		var userAnswerN = fin_exam145[nq].nQ;

		if(fin_exam145[nq].user_result == undefined)
		{
			if(userAnswer == correct_answer)
			{
				Course.lucyAnswer(145, userAnswerN,true);
				fin_exam145[nq].user_result = 1;
				Lesson145.nCorrAnsw++;

				Course.oState.card145 = Lesson145.nCorrAnsw / fin_exam145.length * 100;
				OCookies.set("card145", Course.oState.card145);
			}
			else
			{
				Course.lucyAnswer(145, userAnswerN,false);
				fin_exam145[nq].user_result = 0;
			}
		}
	},

	//next
	nextQuestion: function()
	{
		Lesson145.chBg();

		//Lesson145.nCurrQuestion: 1..9 - go to the next question
		Lesson145.nCurrQuestion++;
		$('#lesson145 .d-exam').fadeOut(500, function()
		{
			if(!Lesson145.loadQuestion(Lesson145.nCurrQuestion))
			{
				//end of exam
				Lesson146.next(0);
				return;
			}

			$('#lesson145 div.d-exam .title2 .info h3 span.q').html(Lesson145.nCurrQuestion);
			$('#lesson145 .d-exam').fadeIn(500);
		});
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson145.pre();

				Lesson145.initQ();
				Lesson145.nCorrAnsw = 0;

				Lesson145.loadQuestion(0);
				$('#lesson145 div.d-exam .title2 .info h3 span.q').html(1);
				$('#lesson145 div.d-exam .title2 .info h3 span.n').html(fin_exam145.length);

				Course.showLesson(145, function()
				{
					Course.showBotButtons(145,true);
				});
				break;
		}
	},

	back: function()
	{
		Lesson140.next(2);
	}
};

var Lesson146 = {
	pre: function()
	{
		Course.showBotButtons(146,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson146.pre();
				Lesson146.loadAnswers();

				//100 points = all correct answers
				Course.oState.card145 = Lesson145.nCorrAnsw / fin_exam145.length * 100;
				OCookies.set("card145", Course.oState.card145);

				Course.showLesson(146, function()
				{
					Course.showBotButtons(146,true);
				});
				break;
			case 1:
				Lesson140.next(2);
				break;
		}
	},

	back: function(n)
	{
		Lesson140.next(2);
	},

	loadAnswers: function()
	{
		if(fin_exam145.length < 1) return false;

		var n;
		var tbl = $('#lesson146 .d-exam table tbody');
		tbl.html("");
		var nresults = 0;

		for(n=0; n<fin_exam145.length; n++)
		{
			var q = fin_exam145[n];
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

		console.log("results", nresults, fin_exam145.length, nresults / fin_exam145.length);
		lucyDispatchEvent('"EXAM: DOMAINS" results: ' + nresults + ' out of ' + fin_exam145.length);

		$('#lesson146 .d-exam h3 span.l').html(nresults);

		$('#lesson146 .d-exam h3 span.r').html(fin_exam145.length);
	}
};
