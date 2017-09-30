$('document').ready(function(){
	console.log("Check 1, 2; check 1, 2...");

	var correctQuestions = 0;
	var incorrectQuestions = 0;
	var unansweredQuestions = 0;
	var counter;
	var timeRemaining;

	/* click button to begin */
	$(".start").on("click",function(){
		/* hide start button, show questions */
		$(".sectionWrap").removeClass("hide");
		$(".start").addClass("hide");

		/* one for timesUp counter, the other for regular counter */
		timeRemaining = 45;
		counter = setTimeout(function(){timeUp()},45000);
		/* above code runs timeUp function at 45 seconds */

		/* every second, run countDownDisplay function */
	    secondsInterval = setInterval(countDownDisplay,1000);

	    /* if time remaining is greater than 0, decrement time remaining, push to html. */
	    function countDownDisplay (){
	    	if (timeRemaining>0){
			  	timeRemaining--;
			  	$(".timeDisplay").html(timeRemaining + " Seconds Remaining.");
			    }
	    	};

		function timesUp(){
			alert("Time's up!");
			triviaValues();
			logResults();
			$(".testAnswerButton").addClass("hide");
		};

	}); /* end startbutton click */

	/* run loop for total questions. */
	function triviaValues(){
		for(i=0; i<8 ;i++){
			/* index of each a1, a2, a3, etc. */
			var userInput = $('input[name="a'+i+'"]:checked').value;
			console.log(userInput);
			/* add to score counters */
			if(userInput==="true"){
				correctQuestions+=1;
			} else if (userInput==="false"){
				incorrectQuestions+=1;
			} else if (userInput==="default"){
				unansweredQuestions+=1;
			}
		}
	};

	function logResults(){
		/* clear time counters, stop timed functions from running. */
		clearInterval(counter);
		timeRemaining=0;
		/* push values to html */
		$(".timeDisplay").html("<p> You got " + correctQuestions + " right and " + incorrectQuestions + " wrong. " + unansweredQuestions + " question(s) remained unanswered.</p>");
	};
	/* on click, get values, return values, and hide own button */
	$(".done").on("click",function(){
		testValues();
		logResults();
		$(".done").addClass("hide");
	});

	/* on click, restore defaults. */
	$(".reset").on("click",function(){
		correctQuestions = 0;
		incorrectQuestions = 0;
		unansweredQuestions = 0;
		clearInterval(counter);
		clearInterval(secondsInterval);
		timeRemaining = 0;
		$(".sectionWrap").addClass("hide");
		$(".start").removeClass("hide");
		$(".timeDisplay").html("");
		$(".done").removeClass("hide");
	});

});
