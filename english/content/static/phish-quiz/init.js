function showQuiz32(){
    $("#page_quiz32 .row.bm-remove").addClass('moved');

    setTimeout(function() {
        $("#page_quiz32 .MailQuiz").addClass('visible');
    }, 1250);
}

function Quiz32reInit()
{
	$('#page_quiz32 .end-page').hide();
	$('#page_quiz32 .cover').show();
	$('#page_quiz32 .quiz-tools button').prop('disabled',true);

	startQuiz32.rigth_ans = [];
	startQuiz32.bad_ans = 0;
	startQuiz32.right_ans = 0;
	startQuiz32.curr_quiz = 0;

	//remove all sections because they will be load from html-files
	$('#page_quiz32 .MailQuiz section .mail-hint').remove();
	$('#page_quiz32 .MailQuiz section .mail-solution').remove();
	$('#page_quiz32 .MailQuiz section').remove();

	//unbind all handlers
	$('#page_quiz32').children().off();
	$('#page_quiz32').children().unbind();
	$('#page_quiz32 *').off();
	$('#page_quiz32 *').unbind();
}

function Quiz32Init()
{
	var getParams = {};
	window.location.search.replace("?","").split("&").map(function(item)
	{
		var splitParts = item.split("=");
		getParams[splitParts[0]] = splitParts[1];
	});
	getParams.lang = getParams.lang ? getParams.lang : 'en';

    var calls = [];
/*
    var pathname_parts = location.pathname.split('/');
    var quiz_path =  location.pathname;

    if(pathname_parts.pop().indexOf('.') > -1){

        quiz_path = pathname_parts.join('/');
    }
*/

    Quiz32Config.files.map(function(item){
/*
		var urlfile = quiz_path + '/' + item + '.html';
        urlfile = urlfile.replace("//","/");
*/
//				$(loadFiles_obj.scontent).append(res.replace(/static/g, pathStatic));

		var urlfile = pathStatic + '/htm/' + item + '.html';
        urlfile = urlfile.replace("//","/");

		console.log("load quiz file",urlfile);

		calls.push($.ajax({
            url: urlfile,
   	        dataType: 'html'
        }));
   	});

   	$.when.apply(this, calls).then(function()
    {
    	    var loadedData = arguments;

	        for (var zt = 0, max = loadedData.length; zt < max; zt++) {

				///////////
				var txtpage = loadedData[zt][0];
				txtpage = txtpage.replace(/static/g, pathStatic);
				///////////

				//var temp = $("<div>").append($(loadedData[zt][0])).find(".mail-section");
				var temp = $("<div>").append($(txtpage)).find(".mail-section");

        	    if(temp.attr('enabled') == 'true'){

					var mail = jQuery(temp[0].outerHTML);

                	mail.find("[translate]").not("[translate='" + getParams.lang + "']").remove();

					$('#page_quiz32 .quiz-body .cover').before(mail);
	            }
    	    }

        	jQuery("[translate='" + getParams.lang + "']").not(".mail-hint, .mail-solution").show();
	        $("#page_quiz32 [translate]").not("[translate='" + getParams.lang + "']").remove();

    	    $("#page_quiz32 .web_content .btn.btn-red").fadeIn().click(showQuiz32);
        	$("#page_quiz32 .startQuiz").show();
	        startQuiz32($);
   	});

    /**
     * Quiz start & track
     */
     $("#page_quiz32 .startQuiz").click(function(){

		//blink 'spam' buttons
		var but1 = $('#page_quiz32 .quiz-tools button.quiz_btn.not_spam');
		var but2 = $('#page_quiz32 .quiz-tools button.quiz_btn.spam');
		var i=0, tm;

		tm = setInterval(function()
		{
			if(i>=12)
			{
				clearInterval(tm);
			}

			if(i<6) //for but1
			{
				if((i & 1) == 0) but1.addClass('blinking');
				else but1.removeClass('blinking');
			}
			else if(i<12) //for but2
			{
				if((i & 1) == 0) but2.addClass('blinking');
				else but2.removeClass('blinking');
			}

			i++;
		},150);
		

		$('#page_quiz32 .cover').fadeOut();

		$('#page_quiz32 .quiz-tools button').prop('disabled',false);
		$('#page_quiz32 .quiz-tools button.next-quiz').prop('disabled',true).prop('title', Quiz32Config.nextTitle);
console.log("init",Quiz32Config.nextTitle,Quiz32Config);

        if(window.lucyQuizStart) { window.lucyQuizStart(); }
     });

    /**
     * Global settings
     */
    $("#page_quiz32 .layout-block").css('margin-bottom', Quiz32Config.marginBottomWithinBlocks ? Quiz32Config.marginBottomWithinBlocks : 'auto');

    for(var zt in Quiz32Config.blocksEnabled){

        var item = Quiz32Config.blocksEnabled[zt];

        if(item !== true){
            $("." + zt + ".layout-block").hide();
        }
    }

	jQuery("#page_quiz32 [translate]").not("[translate='" + getParams.lang + "']").remove();
	jQuery("#page_quiz32 [translate]").show();
}
