$('document').ready(function () {
	console.log("Check 1, 2; check 1, 2...");

	let correctQuestions = 0;
	let incorrectQuestions = 0;
	let unansweredQuestions = 0;
	let counter;
	let timeLeft;

	/* click button to begin */

	$(".start").on("click", function () {
		/* hide start screen, show questions */
		$(".start, .startScreen").fadeOut(200);
		$(".questions, .sectionWrap").fadeIn(1000);

		timeLeft = 5;
		counter = setTimeout(function () {
			timesUp()
		}, 6000);

		/* countDownDisplay function runs every second */
		secondsInterval = setInterval(countDownDisplay, 1000);

		/* if time remaining is greater than 0, decrease time remaining */
		function countDownDisplay() {
			if (timeLeft > 0) {
				timeLeft--;
				$(".timer").html(timeLeft + " Seconds Remaining");
			}
		}

		function timesUp(event) {
			// event.preventDefault();
			$(".sectionWrap, .done").fadeOut(200);
			$(".results").fadeIn(1000);
			triviaValues();
			showResults();
		}

	}); /* end start button click */

	/* loop for questions */
	function triviaValues() {
		for (i = 0; i < 8; i++) {
			/* index of each a1, a2, a3, etc */
			const userInput = $('input[name="a+ i +"]:checked').value;
			/* add to score counters */
			if (userInput === "true") {
				correctQuestions++;
			} else if (userInput === "false") {
				incorrectQuestions++;
			} else if (userInput === "default") {
				unansweredQuestions++;
			}
		};
	};

	function showResults() {
		/* clear time counters, stop timers from running */
		clearInterval(counter);
		timeLeft = 0;
		// /* insert values to html */
		$(".results").html("<li> You got " + correctQuestions + " right </li>" + 
			"<li> You got " + incorrectQuestions + " wrong </li>" +
			"<li>" + unansweredQuestions +
			" remain unanswered</li>");
	};
	/* click 'Done', get values, return values, and hide trivia questions */
	$(".done").on("click", function (event) {
		event.preventDefault();
		triviaValues();
		showResults();
		$(".sectionWrap").fadeOut(200);
		$(".results").fadeIn(1000);
	});

	/* click 'Reset' to restore defaults */
	$(".reset").on("click", function () {
		correctQuestions = 0;
		incorrectQuestions = 0;
		unansweredQuestions = 0;
		clearInterval(counter);
		clearInterval(secondsInterval);
		timeLeft = 0;
		$(".sectionWrap, .results").fadeOut(1000);
		$(".timer").html("");
		$(".startScreen, .start").fadeIn(2000);
	});

});