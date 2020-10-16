var SCORMDriver = window.parent;
var fSCORM = false;

$(function()
{
	loadState();
});

//load state
function loadState()
{
	var sChunk = "";

	if(typeof SCORMDriver.SetScore === 'undefined')
	{
		console.log("no SCORM", SCORMDriver);

		//read state from cookies
		Course.oState.lang = OCookies.getIntCookie("lang");
		Course.oState.avatar = OCookies.getIntCookie("avatar");

		Course.oState.card62 = OCookies.getIntCookie("card62");
		Course.oState.card63 = OCookies.getIntCookie("card63");
		Course.oState.card73 = OCookies.getIntCookie("card73");
		Course.oState.card64 = OCookies.getIntCookie("card64");

		Course.oState.card81 = OCookies.getIntCookie("card81");
		Course.oState.card82 = OCookies.getIntCookie("card82");
		Course.oState.card83 = OCookies.getIntCookie("card83");
		Course.oState.card84 = OCookies.getIntCookie("card84");

		Course.oState.card90 = OCookies.getIntCookie("card90");

		Course.oState.card101 = OCookies.getIntCookie("card101");
		Course.oState.card102 = OCookies.getIntCookie("card102");

		Course.oState.card121 = OCookies.getIntCookie("card121");
		Course.oState.card122 = OCookies.getIntCookie("card122");
		Course.oState.card123 = OCookies.getIntCookie("card123");
		Course.oState.card124 = OCookies.getIntCookie("card124");
		Course.oState.card125 = OCookies.getIntCookie("card125");

		Course.oState.card141 = OCookies.getIntCookie("card141");
		Course.oState.card142 = OCookies.getIntCookie("card142");
		Course.oState.card143 = OCookies.getIntCookie("card143");
		Course.oState.card144 = OCookies.getIntCookie("card144");
		Course.oState.card145 = OCookies.getIntCookie("card145");

		Course.oState.card161 = OCookies.getIntCookie("card161");
		Course.oState.card1621 = OCookies.getIntCookie("card1621");
		Course.oState.card1622 = OCookies.getIntCookie("card1622");
		Course.oState.card163 = OCookies.getIntCookie("card163");
		Course.oState.card164 = OCookies.getIntCookie("card164");

		Course.oState.card181 = OCookies.getIntCookie("card181");

		Course.oState.card201 = OCookies.getIntCookie("card201");
		Course.oState.card202 = OCookies.getIntCookie("card202");

		Course.oState.card221 = OCookies.getIntCookie("card221");
		Course.oState.card222 = OCookies.getIntCookie("card222");

		Course.oState.card241 = OCookies.getIntCookie("card241");
		Course.oState.card242 = OCookies.getIntCookie("card242");
		Course.oState.card243 = OCookies.getIntCookie("card243");
		Course.oState.card244 = OCookies.getIntCookie("card244");

		Course.oState.card261 = OCookies.getIntCookie("card261");

		Course.oState.fEnaLesson50 = OCookies.getIntCookie("ena50");
		Course.oState.fEnaLesson120 = OCookies.getIntCookie("ena120");
		Course.oState.fEnaLesson130 = OCookies.getIntCookie("ena130");
		Course.oState.fEnaLesson150 = OCookies.getIntCookie("ena150");
		Course.oState.fEnaLesson170 = OCookies.getIntCookie("ena170");
		Course.oState.fEnaLesson190 = OCookies.getIntCookie("ena190");
		Course.oState.fEnaLesson210 = OCookies.getIntCookie("ena210");
		Course.oState.fEnaLesson230 = OCookies.getIntCookie("ena230");
		Course.oState.fEnaLesson250 = OCookies.getIntCookie("ena250");
	}
	else
	{
		console.log("SCORM");
		fSCORM = true;

		sChunk = SCORMDriver.GetDataChunk();
		console.log("chunk:",sChunk);
	}

	if(sChunk)
		Course.oState = JSON.parse(sChunk);
	else
		sChunk = "empty";
	console.log("loadState",Course.oState);

	Course.oState.autoaudio = 0; //disable auto play

	//sChunk = sChunk.replace(/,/g,",<br>");
	//$('div.debug-scorm').html(sChunk);
}

//save state
function saveState()
{
	var s = JSON.stringify(Course.oState);
	var score = Course.oState.allPoints; //100 points max

	if(fSCORM)
	{
		SCORMDriver.SetDataChunk(s);

		SCORMDriver.SetScore(score, 100, 0);

		SCORMDriver.CommitData();
	}
	//console.log("saveState", s, score);
}

function endCourse()
{
	console.log("End of Course");
	lucyQuizEnd();

	if(fSCORM)
	{
		if(Course.oState.allPoints >= 60)
			SCORMDriver.SetPassed();
		else
			SCORMDriver.SetFailed();

		SCORMDriver.SetReachedEnd();
		SCORMDriver.SetCompleted();
		SCORMDriver.CommitData();
	}
}

function closeCourse()
{
	if(fSCORM)
	{
		var answer = confirm("Are You Sure You Wish To Exit This Course?");
		
		if(answer)
		{
			SCORMDriver.ConcedeControl();
		}
	}
	else
		Lesson10.next(0);
}
