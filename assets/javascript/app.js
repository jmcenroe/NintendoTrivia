$('document').ready(function(){
	console.log("Check 1, 2; check 1, 2...");

	var correctQuestions = 0;
	var incorrectQuestions = 0;
	var unansweredQuestions = 0;
	var counter;
	var timeLeft;
	var questions = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"];

	/* click button to begin */
	$(".start").on("click",function(){
		/* hide start screen, show questions */
		$(".sectionWrap").removeClass("hide");
		$(".start, .startScreen").addClass("hide");

		/* one for timesUp counter, the other for regular counter for 45 seconds*/
		timeLeft = 45;
		counter = setTimeout(function(){timesUp()},45000);

		/* countDownDisplay function runs every second*/
	    secondsInterval = setInterval(countDownDisplay,1000);

	    /* if time remaining is greater than 0, decrease time remaining, push to html. */
	    function countDownDisplay (){
	    	if (timeLeft>0){
			  	timeLeft--;
			  	$(".timer").html(timeLeft + " Seconds Remaining");
			    }
	    	};

		function timesUp(){
			console.log(timesUp);
			$(".mainSection").removeClass("hide");
			triviaValues();
			logshowResults();
			$(".sectionWrap .done").addClass("hide");
		};

	}); /* end start button click */

	/* loop for questions */
	function triviaValues(){
		console.log(triviaValues);
		for(i=0; questions.length; i++){
			/* index of each a1, a2, a3, etc */
			$.each($('input[name="a + i +"]:checked'), function(){
				if ($(this).val() === questions[i].true) {
		        document.correctQuestions++;
		      }
		      else {
		        document.incorrectQuestions++;
		      };
			/* add to score counters */
			// if(userInput==="true"){
			// 	correctQuestions++;
			// } else if (userInput==="false"){
			// 	incorrectQuestions++;
			// } else if (userInput==="default"){
			// 	unansweredQuestions++;
			// }
			});
		};
	};

	function showResults(){
		console.log(showResults);
		/* clear time counters, stop timers from running */
		clearInterval(counter);
		timeLeft=0;
		/* insert values to html */
		$('.timer').html('<li> You got ' + correctQuestions + ' right ' + 
			'<li> You got ' + incorrectQuestions + ' wrong </li>' + 
			'<li>' + unansweredQuestions + 
			' remain unanswered</li>');
	};
	/* click 'Done', get values, return values, and hide trivia question and timer page */
	$(".done").on("click",function(){
		triviaValues();
		showResults();
		$(".sectionWrap").addClass("hide");
		console.log(done);
	});

	/* on click, restore defaults */
	$(".reset").on("click",function(){
		correctQuestions = 0;
		incorrectQuestions = 0;
		unansweredQuestions = 0;
		clearInterval(counter);
		clearInterval(secondsInterval);
		timeLeft = 0;
		$(".sectionWrap").addClass("hide");
		$(".timer").html("");
		$(".startScreen").removeClass("hide");
	});

});
