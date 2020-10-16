/*
	244 - Challenge
*/
var Lesson244 = {
	f_pre: false,
	list_cnt: 0,
	nCorrAnsw: 0,

	loadDrag: function()
	{
		$('#lesson244 .list .list-wrap .item').remove();

		for(let i = 0; i < fin_exam244.length; i++)
		{
			let question = fin_exam244[i].question,
				answer = fin_exam244[i].answer,
				img = fin_exam244[i].img,
				iEl = i;
			iEl++;

			$('#lesson244 .list .list-wrap').append(
				'<div class="ui-widget-content item item-' + iEl + ' ans' + answer + '" data-ok="0">' +
					'<img src="' + pathStatic + '/exam/qimg/' + img + '" class="magnify-img">' +
					'<div class="tit">' + question + '</div>' +
				'</div>'
			);
		}
	},

	setPercent: function()
	{
		Course.oState.card244 = parseInt(100 * Lesson244.nCorrAnsw / fin_exam244.length);
		if(Course.oState.card244 < 1) Course.oState.card244 = 1;
		OCookies.set("card244", Course.oState.card244);
	},

	initCSS: function()
	{
		$('#lesson244 .list .list-wrap div.ui-widget-content').css({
			'display': 'inline-block',
			'left': 'auto',
			'top': 'auto'
		});
		$('#lesson244 .list .list-wrap div.ui-widget-content img').css({
			'display': 'inline-block',
			'height': 'auto'
		});
		$('#lesson244 .list .list-wrap div.ui-widget-content .tit').css({
			'display': 'block',
			'height': 'auto'
		});
	},

	pre: function()
	{
		Course.showBotButtons(244,false);
		if(Course.oState.card244 < 1) Course.oState.card244 = 1;

		if(!Lesson244.f_pre)
		{
			Lesson244.f_pre = true;

			Lesson244.loadDrag();

			$("#lesson244 .list-wrap div.ui-widget-content").draggable({
				revert: "invalid", // when not dropped, the item will revert back to its initial position
				containment: "#lesson244 .wrap-drag",
				cursor: "move",
				start: function()
				{
					$('#lesson244 .list .magnify-lens').addClass('active');
					$(this).css('z-index', 1);
				},
				stop: function()
				{
					$('#lesson244 .list .magnify-lens').removeClass('active');
					$(this).css('z-index', 0);
				}
			});

			$('#lesson244 .wrap-drag .folders .fld').droppable({
				drop: function(event, ui) {
					var nans = 0;
					var nitem = 0;
					var nfld = 0;

					var j;
					for(j=1; j<=fin_exam244.length; j++)
						if(ui.draggable.hasClass('item-'+j)) nitem = j;
					
					if(ui.draggable.hasClass('ans1')) nans = 1;
					if(ui.draggable.hasClass('ans2')) nans = 2;
					
					if($(this).hasClass('fld-1')) nfld = 1;
					if($(this).hasClass('fld-2')) nfld = 2;
					
					if(nfld == nans)
					{
						Course.lucyAnswer(244, nitem, true);
						ui.draggable.attr('data-ok','1');
						Lesson244.nCorrAnsw++;
					}
					else
					{
						Course.lucyAnswer(244, nitem, false);
					}
					Lesson244.setPercent();
					
					ui.draggable.find('div.tit').fadeOut(200);
					ui.draggable.find('img').animate({
						height: '30px'
					}, 500, function()
					{
					});
					
					ui.draggable.fadeOut(600, function()
					{
					});
						
					Lesson244.list_cnt++;
					if(Lesson244.list_cnt == fin_exam244.length)
					{
						//console.log("end",Lesson244.list_cnt);
						Lesson245.next(0);
					}
				}
			});
		} //once

		Lesson244.initCSS();
		$('#lesson244 .list .list-wrap div.ui-widget-content').attr('data-ok','0');

		Lesson244.list_cnt = 0;
		Lesson244.nCorrAnsw = 0;
		Lesson244.setPercent();

		//randomize
		var i;
		for(i=0; i<fin_exam244.length; i++) { fin_exam244[i].usedQ = 0; }
		
		function randQ()
		{
			var i;
			for(i=0; i<10000; i++)
			{
				var n = Math.floor(Math.random() * fin_exam244.length);
				if(n >= fin_exam244.length) continue;

				if(fin_exam244[n].usedQ == 0)
				{
					fin_exam244[n].usedQ = 1;
					return n;
				}
			}
			return 0;
		}

		$('#lesson244 .list .list-wrap div.ui-widget-content').each(function(i)
		{
			var n = randQ();
			var j;
			//console.log("rand n", n);
			
			for(j=1; j<=fin_exam244.length; j++) $(this).removeClass('item-' + j);
			$(this).removeClass('ans1 ans2');

			var q = fin_exam244[n].question;
			var ans = fin_exam244[n].answer;
			var img = fin_exam244[n].img;
			n++;
				
			$(this).find('div.tit').html(q);
			$(this).addClass('item-' + n);
			$(this).addClass('ans' + ans);

			$(this).find('img').attr('src', pathStatic + '/exam/qimg/' + img)
				.attr('data-magnify-src', pathStatic + '/exam/qimg/' + img);
		});

		$('#lesson244 .list .magnify-img').magnify();
	}, //pre

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson244.pre();
				Course.showLesson(244, function()
				{
					Course.showBotButtons(244,true);
				});
				break;
			case 1:
				Lesson240.next(0);
				break;
		}
	},

	back: function()
	{
		Lesson240.next(0);
	}
};

//Results
var Lesson245 = {
	pre: function()
	{
		$('#lesson245 .d-exam .correct-ans-num').text(Lesson244.nCorrAnsw);
		$('#lesson245 .d-exam .all-ans-num').text(fin_exam244.length);

		$('#lesson245 .d-exam .answers-cloud').html('');
		$('#lesson245 .d-exam .answers-webapp').html('');

		Lesson244.initCSS();

		$('#lesson244 .list .list-wrap .ans1').each(function()
		{
			let img = $(this).html();
			let ico = '';

			if($(this).attr('data-ok') == '1')
			{
				ico = '<img class="ico" src="' + pathStatic + '/exam/i-good.svg">';
				$('#lesson245 .d-exam .answers-cloud').append(
					'<div class="item">' + ico + img + '</div>');
			}
			else
			{
				ico = '<img class="ico" src="' + pathStatic + '/exam/i-bad.png">';
				$('#lesson245 .d-exam .answers-webapp').append(
					'<div class="item">' + ico + img + '</div>');
			}

		});

		$('#lesson244 .list .list-wrap .ans2').each(function()
		{
			let img = $(this).html();
			let ico = '';

			if($(this).attr('data-ok') == '1')
			{
				ico = '<img class="ico" src="' + pathStatic + '/exam/i-good.svg">';
				$('#lesson245 .d-exam .answers-webapp').append(
					'<div class="item">' + ico + img + '</div>');
			}
			else
			{
				ico = '<img class="ico" src="' + pathStatic + '/exam/i-bad.png">';
				$('#lesson245 .d-exam .answers-cloud').append(
					'<div class="item">' + ico + img + '</div>');
			}
		});

		$('#lesson245 .d-exam .magnify-lens').remove();
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson245.pre();
				Course.showLesson(245, function()
				{
				});
				break;
			case 1:
				Lesson240.next(0);
				break;
		}
	},
};
