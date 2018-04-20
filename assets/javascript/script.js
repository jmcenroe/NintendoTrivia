$('document').ready(function () {
    var startScreen;
    var startButton;
    var timer;
    var counter;
    var answer;
    let correctQuestions = 0;
    let incorrectQuestions = 0;
    let unansweredQuestions = 0;
    let timeLeft;
    var questionArray = [{
            question: "What year was Nintendo founded?",
            answers: [{
                    text: "1969",
                    isCorrect: false
                },
                {
                    text: "1989",
                    isCorrect: false
                },
                {
                    text: "1889",
                    isCorrect: true
                }
            ]
        },
        {
            question: "Nintendo started as a video game company.",
            answers: [{
                    text: "True",
                    isCorrect: false
                },
                {
                    text: "False",
                    isCorrect: true
                }
            ]
        },
        {
            question: "Nintendo got its start making:",
            answers: [{
                    text: "Video games",
                    isCorrect: false
                },
                {
                    text: "playing cards",
                    isCorrect: true
                },
                {
                    text: "toys",
                    isCorrect: false
                },
            ]
        },
        {
            question: "The company once owned a baseball team",
            answers: [{
                    text: "True",
                    isCorrect: true
                },
                {
                    text: "False",
                    isCorrect: false
                }
            ]
        },
        {
            question: "Nintendo had the same president for more than:",
            answers: [{
                    text: "10 years",
                    isCorrect: false
                },
                {
                    text: "25 years",
                    isCorrect: false
                },
                {
                    text: "50 years",
                    isCorrect: true
                },
            ]
        },
        {
            question: "The GameCube video game console is a perfect cube",
            answers: [{
                    text: "True",
                    isCorrect: false
                },
                {
                    text: "False",
                    isCorrect: true
                }
            ]
        },
        {
            question: "What was the first console game that allowed players to save their game?",
            answers: [{
                    text: "The Legend of Zelda",
                    isCorrect: true
                },
                {
                    text: "Super Mario Bros.",
                    isCorrect: false
                },
                {
                    text: "Punch Out!!",
                    isCorrect: false
                },
            ]
        },
        {
            question: "Iconic game character Mario first appeared in which game?",
            answers: [{
                    text: "Final Fantasy",
                    isCorrect: false
                },
                {
                    text: "Donkey Kong",
                    isCorrect: true
                },
                {
                    text: "Super Mario Bros.",
                    isCorrect: false
                },
            ]
        }
    ];

    // Adds timer and questions to the page
    (insertHTML) => {
        const timeLeft = "<p class='timer'>Seconds remaining: <span id='timer'>15</span></p>";
        let question = "<p class='question'>" + questionArray[questionNumber].question + "</p>";
        gameText = timeLeft + question;
        $(".display").html(gameText);
        for (let i = 0; i < questionArray[questionNumber].answers.length; i++) {
            const answerButton = $("<button>");
            answerButton.addClass("answer");
            answerButton.attr("isCorrect", questionArray[questionNumber].answers[i].isCorrect);
            answerButton.html(questionArray[questionNumber].answers[i].text);
            $(".display").append(answerButton);
        }
    }

    (right) => {
        correctQuestions++;
        const correctAnswer = "<p>You're right!</p>";
        gameText = correctAnswer;
        $(".display").html(gameText);
        setTimeout(displayNext, 3000);
    }

    (wrong) => {
        incorrectQuestions++;
        const wrongAnswer = "<p>Sorry, that's not correct</p>";
        gameText = wrongAnswer;
        $(".display").html(gameText);
        setTimeout(displayNext, 3000);
    }

    (timesUp) => {
        unansweredQuestions++;
        const noAnswer = "<p>Time's up!</p>";
        gameText = noAnswer;
        $(".display").html(gameText);
        setTimeout(displayNext, 3000);
    }

    (gameTimer) => {
        timer = setInterval(countDown, 1000);
        (countDown) => {
            if (timeLeft === 0) {
                clearInterval(timer);
                timesUp();
            } else if (timer > 0) {
                counter--;
            }
            $("#timer").html(timer);
        }
    }

    // Changes screen to the next question, incrememnts right/wrong/unanswered and resets timer
    (displayNext) => {
        if (questionNumber < questionArray.length -1) {
            questionNumber++;
            insertHTML();
            gameTimer();
        } else {
            results();
        }
    }

    (results) => {
        const finalScore = "<p>Score:</p>";
        const finalCorrect = "<p>You got " + correctQuestions + " right</p>";
        const finalIncorrect = "<p>You got " + correctQuestions + " wrong</p>";
        const finalUnanswered = "<p>You did not answer " + correctQuestions + "</p>";
        const resetButton = "<button class='reset' type='button'>PLAY AGAIN</button>";
        gameText = finalScore + finalCorrect + finalIncorrect + finalUnanswered + resetButton;
        $(".display").html(gameText);
    }

    (reset) => {
        questionNumber = 0;
        correctQuestions = 0;
        incorrectQuestions = 0;
        unansweredQuestions = 0;
        counter = 20;
        insertHTML();
        timer();
    }

    // Creates start screen w/ start button
    (startScreen) => {
        const firstScreen = "<div class='startScreen'>background-image:url('../images/controller.jpg');";
        const startButton = "<div class='startButton blink'>Start Game</div>";
        startScreen = firstScreen + startButton;
        $(".display").html(startScreen)
    }

    // Click Start Game to begin
    $("body").on("click", ".startButton", (event) => {
        insertHTML();
        timer();
    });

    // When answer is selected
    $("body").on("click", ".answer", (event) => {
        selectedAnswer = $(this).attr("isCorrect");
        console.log(selectedAnswer);
        
        if (selectedAnswer === "true") {
            clearInterval(counter);
            right();
        } else {
            clearInterval(counter);
            wrong();
        }
    });

    // Click Play Again to reset
    $("body").on("click", ".reset", (event) => {
        reset();
    });

    startScreen();
});