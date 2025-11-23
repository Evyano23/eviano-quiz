 console.log("game.js started loading...");
document.addEventListener("DOMContentLoaded",() => {
    console.log("DOM fully loaded and parsed");
  const timerEL = document.getElementById("timer");
 const questionEl = document.getElementById("question");
const optionEls= [
    document.getElementById("option0"),
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
];
const progressEl = document.querySelector(".progress-pie-chart");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const optionsContainer = document.getElementById("options-container");
console.log("optionsContainer:", optionsContainer);
console.log("progressEl:", progressEl);

// Initialize pie chart once DOM is ready and element exists
if (progressEl) {
    console.log("progressEl found inside DOMContentLoaded:", progressEl);
    $(".progress-pie-chart").attr("data-percent", 0);
    $(".ppc-progress-fill").css("transform", "rotate(0deg)");
    $(".ppc-percents span").html("0%");
  } else {
    console.warn("progressEl not found at startup");
  }
  

const quizdata= [
    {
        question:"What is the capital of France?",
        option0:"Berlin",
        option1:"Madrid",
        option2:"Rome",
        option3:"Paris",
        Answers:3,
    },
    {
        question:"which planet is known as the Red planet?",
        option0:"Venus",
        option1:"Mars",
        option2:"jupiter",
        option3:"saturn",
        Answers:1
    },
    {
        question:"which programming language is known as the language of the web",
        option0:"python",
        option1:"java",
        option2:"HTML",
        option3:"c++",
        Answers:2
    },
    {
        question:"which country hosted the 2016 summer olympics?",
        option0:"china",
        option1:"uk",
        option2:"brazil",
        option3:"Nigeria",
        Answers:2
    },
    {
        question:"which country is both the world's largest and most populous",
        option0:"china",
        option1:"russia",
        option2:"india",
        option3:"slovenia",
        Answers:0
    },
    {
        question:"who holds the record for most olympic gold medal?",
        option0:"usain bolt",
        option1:"carl lewis",
        option2:"michael phelps",
        option3:"mark spitz",
        Answers:2
    },
    {
        question:"who won the 2022 FIFA world cup?",
        option0:"Argentina",
        option1:"France",
        option2:"Spain",
        option3:"Germany",
        Answers:0
    },
    {
        question:"which sports is known as the gentlemen's  game?",
        option0:"rugby",
        option1:"cricket",
        option2:"tennis",
        option3:"golf",
        Answers:1
    },
    {
        question:"Longest river in the world is ?",
        option0:"Amazon",
        option1:"Yangtze",
        option2:"Nile",
        option3:"Mississippi",
        Answers:2
    },
    {
        question:"The ancient pyramid of giza were built in which country ?",
        option0:"Greece",
        option1:"Mexico",
        option2:"India",
        option3:"Egypt",
        Answers:3
    },
    {
        question:"who is all time leading scorer in the NBA ?",
        option0:"Lebron James",
        option1:"Michael Jordan",
        option2:"Kobe Bryant",
        option3:"Kareem abdul",
        Answers:0
    },
    {
        question:"what was the first capital of Nigeria ?",
        option0:"Abuja",
        option1:"Lagos",
        option2:"Kano",
        option3:"Calabar",
        Answers:1
    },
    {
        question:"which of these is not a programming language ?",
        option0:"java",
        option1:"python",
        option2:"HTML",
        option3:"C++",
        Answers:2
    },
    {
        question:"What does NaN means in javascript ?",
        option0:"Not a Null",
        option1:"New Array Number",
        option2:"No Assignment Needed",
        option3:"Not a Number",
        Answers:3
    },
    {
        question:"What is the index of the first element in a programming language array ?",
        option0:"0",
        option1:"1",
        option2:"2",
        option3:"3",
        Answers:0
    },
    {
        question:"in css, which property is use to change the size of text ?",
        option0:"font-weight",
        option1:"font-size",
        option2:"text-size",
        option3:"size",
        Answers:1
    },
    {
        question:"which sport will you hear the term CHECKMATE",
        option0:"Boxing",
        option1:"fencing",
        option2:"chess",
        option3:"football",
        Answers:2
    },
    {
        question:"who was the first Afican Nobel peace prize winner ?",
        option0:"Desmond Tutu",
        option1:"Wole Soyinka",
        option2:"kofi Annan",
        option3:"Nelson Mandela",
        Answers:3
    },
    {
        question:"which country has won the most FIFA world cups ?",
        option0:"Brazil",
        option1:"Italy",
        option2:"Argentina",
        option3:"spain",
        Answers:0
    }
]; 
console.log("quizdata loaded;", quizdata);

let userName = localStorage.getItem("quizUserName") || "Anonymous";
let currentQuestion = 0; //which question index we are on
console.log("currentQuestion created:", currentQuestion);
let score = 0; //number of correct answers
let selectedOption = null;  //users selected option for the current question
let quizQuestions=[];  //stores the 10 randomly picked questions
let timer;  //stores set interval for countdown
let timeleft =180; //3minutes is equal to 180seconds
let timerInterval;
let userAnswers={};




//utility : shuffle & pick 10 random questions
function getRandomQuestions(Arr, num) {
    return Arr
    .sort() 
    .sort(()=> Math.random() - 0.5)
    .slice(0, num);
}
function formatTime(seconds) {
    const m = Math.floor(seconds/60);
    const s = seconds % 60;
    return `${m}:${s<10 ? "0":""}${s}`;
}

function updatePieChart(percent) {
    const $ppc = $(".progress-pie-chart");
    const $fill = $(".ppc-progress-fill");
    const $percents = $(".ppc-percents span");

    // Fix: always rotate based on full circle (not half)
    const deg = (percent / 100) * 360;
    $fill.css("transform", "rotate(" + deg + "deg)");

    // Update numeric percent
    $percents.html(Math.round(percent) + "%");

    // Remove the gt-50 logic that breaks the circle
    $ppc.removeClass("gt-50");

    // Color logic:
    if (percent < 70) {
        // Light orange before 70%
        $fill.css("background-color", "#ffb347"); // light orange
    } else {
        // Green when 70% or higher
        $fill.css("background-color", "#4CAF50");
    }
}
//start timer
function startTimer() {
    timeleft = 180;
    timerEL.textContent =`${formatTime(timeleft)}`;

    clearInterval(timer);//clear old timers
    timerInterval = setInterval(() => {
        timeleft--;
        timerEL.textContent = `${formatTime(timeleft)}`;

        if (timeleft <= 0) {
            clearInterval(timerInterval);
            timerEL.textContent = "Time's up!";
            questionEl.textContent = `Quiz Completed! Your score: ${score}/${quizQuestions.length}`;
            nextBtn.style.display="none";
            prevBtn.style.display="none";
            tryAgainBtn.style.display="block";
            submitBtn.style.display="none";
            endQuiz(); //auto submit when time runs out
        }
    }, 1000);
}


//start quiz
function startQuiz() {
    clearInterval(timerInterval);
    quizQuestions = getRandomQuestions(quizdata, 10);
    currentQuestion=0;
    score= 0;

    //reset progress
   
    optionsContainer.style.display ="block";
    nextBtn.style.display ="inline-block";
    prevBtn.style.display = "inline-block";
    if(progressEl) progressEl.style.display ="block";
    if(timerEL) timerEL.style.display="block";//show timer
    if(submitBtn) submitBtn.style.display="inline-block";

    //reset timer
    startTimer(); //begin countdown
    loadQuestions();
}
//load a question into UI
function loadQuestions() {
    const q = quizQuestions[currentQuestion];
    if (!q) {
      console.log("No question found at index:", currentQuestion);
      return;
    }
  
    questionEl.textContent = q.question;
  
    optionEls.forEach((el, i) => {
      el.textContent = q[`option${i}`];
      el.parentElement.classList.remove("selected");
    });
  
    if (quizQuestions && quizQuestions.length > 0) {
      const percent = ((currentQuestion + 1) / quizQuestions.length) * 100;
      updatePieChart(percent);
    }
  
    selectedOption = null;
  }
      

//handle option clicks
 optionEls.forEach((el, i)=> {
     el.addEventListener("click", ()=> {
       document.querySelectorAll (".option-container").forEach(c=>c.classList.remove("selected"));
       userAnswers[currentQuestion] = selectedOption; 
         el.parentElement.classList.add("selected");
         selectedOption = el.dataset.number;
         console.log("selected option:",selectedOption);
     });
});      
if (nextBtn) {
    nextBtn.addEventListener("click", (e)=> {
        e.preventDefault();
        console.log("Next clicked.Current index before:",currentQuestion);

        if (selectedOption=== null) {
            alert("please select an option before moving on!");
            return;
        }
        let correctAnswer;
        if (quizQuestions[currentQuestion].Answers !== undefined) {
            correctAnswer = quizQuestions[currentQuestion].Answers;
        } else {
            correctAnswer = quizQuestions[currentQuestion].answer;
        }

        console.log("---DEBUG NEXT BTN--");
        console.log("Selected option (type):", selectedOption, typeof selectedOption);
        console.log("correct answer (type):", correctAnswer, typeof correctAnswer);

        //force both to numbers before comparing
        if (Number(selectedOption)=== Number(correctAnswer)) {
            score++;
            console.log("Correct! score is now", score);
        } else {
            console.log("Wrong.Selected:",selectedOption, "Expected:", correctAnswer);
        }
        //go to next question or finish quiz
       if (currentQuestion < quizQuestions.length - 1) {
  currentQuestion++;
  loadQuestions();
} else {
    console.log("final question reached. showing submit");
  // Reached the last question
  nextBtn.style.display = "none"; // remove Next since we're at the end
   // ⭐ AUTO-SCROLL UP TO SHOW SUBMIT BUTTON CLEARLY
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }, 200);
}
    });
}

window.onload = function() {
    const lastScore = localStorage.getItem("lastScore");
    const lastName = localStorage.getItem("lastName");

    if (lastScore !== null && lastName !== null) {
        document.getElementById("lastResult").innerText =`${lastName}, your last score was ${lastScore}`;
    }
};

function launchConfetti() {
  if (typeof confetti !== "function") {
    console.warn("Confetti library not loaded yet");
    return;
  }

  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      spread: 70,
      startVelocity: 40,
      origin: { y: 0.6 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function generateCertificate(score, total) {
    const { jsPDF } = window.jspdf; //make sure jspdf is loaded
    //ask user for their Name
    let userName = prompt("Enter your name for the certificate:");

    if (!userName || userName.trim()=== "") {
        userName = "Anonymous";
    }
    //create PDF
    const doc = new jsPDF("landscape");
    if (!window.jspdf) {
        alert("jsPDF library not loaded");
        return;
    }
    const pagewidth = doc.internal.pageSize.width || doc.internal.pageSize.getwidth();
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    //add broder frame
    doc.setDrawColor(0, 102, 204);//blue border
    doc.setLineWidth(3);
    doc.rect(10,10, pagewidth -20, pageHeight - 20);
    doc.rect(10, 10, pagewidth -20, pageHeight -20);
    //add background
    doc.setFillColor(240, 248,255);
    doc.rect(11, 11, pagewidth -20, pageHeight -22, "F");
    //add title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(25);
    doc.setTextColor(0, 50, 102);
    doc.text("Certificate of Archievement", pagewidth/ 2, 50,{align:"center"});
    //subtitle
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.text("Certificate is Proudly Presented to", pagewidth/ 2, 70, {align:"center"});
    //user"s Name
    doc.setFont("courier", "bold");
    doc.setFontSize(22)
    doc.setTextColor(0, 102, 153);
    doc.text(userName ,pagewidth/2, pageHeight/ 2-20,{align:"center"});
    //score Info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    doc.setTextColor(50, 50, 50);
    doc.text(`For successfully completting the quiz with a score of`,pagewidth/2,120,{align:"center"});

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 150, 0);
    doc.text(`${score}/${total}`, pagewidth/2, 135,{align:"center"});
    //footer
    doc.setDrawColor(0);
    doc.line(pagewidth/ 2-40, pageHeight - 40, pagewidth/2 + 40, pageHeight - 40);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Authorized Signature", pagewidth/2, pageHeight -30, {align:"center"});
    //save file
    doc.save(`${userName}_Certificate.pdf`);
}
function endQuiz() {
    clearInterval(timer); //stop timer

    //calculate percentage
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = percentage >= 70;    
    const emoji = passed ? "🎉" : "😞";
    const titleClass = passed ? "pass-title" : "fail-title";
    const emojiClass = passed ? "pass-emoji" : "fail-emoji";

    let motivationText = "";

if (percentage <= 30) {
    motivationText = "💪 Don't worry — every attempt makes you better!";
} 
else if (percentage <= 60) {
    motivationText = "✨ Good effort! You're improving — keep pushing!";
} 
else {
    motivationText = "🎉 Excellent! You're doing great — keep it up!";
}

    
// Show results with percentage and certificate button
questionEl.innerHTML = `
  <div class="quiz-end-screen">
    <div class="${emojiClass}" style="font-size: 50px; text-align: center;">${emoji}</div>
    <h2 class="quiz-complete">Quiz Completed!</h2>
    
    <!-- PASS / FAIL TEXT -->
    <h3 class="${titleClass}" style="font-size: 26px; margin-top: 15px;">
      ${passed ? "You Passed! 🏆" : "You Failed"}
    </h3>
    
    <!-- Score display -->
    <p class="score-text">
      <strong>Your Score:</strong> ${score} / ${quizQuestions.length} 
      <span class="${passed ? 'pass' : 'fail'}">(${percentage}%)</span>
    </p>
    
    <!-- Buttons -->
    <div class="results-buttons">
      <button id="tryAgainBtn" class="try-again-btn">Try Again</button>
      <button id="downloadCertBtn" class="cert-btn" style="display:none;">Download Certificate</button>
      <button id="shareBtn" class="share-btn">Share Result 📤</button>
    </div>
    
    <!-- Motivation text -->
    <p class="motivation-text">${motivationText}</p>
  </div>
`;

       const endScreen = document.querySelector(".quiz-end-screen");
// REMOVE ALL POSITION FIXING — LET CSS HANDLE IT
endScreen.style.position = "";
endScreen.style.top = "";
endScreen.style.left = "";
endScreen.style.transform = "";
endScreen.style.zIndex = "";
endScreen.style.overflowY = "";

endScreen.classList.add(passed ? "pass" : "fail");
// When clicking Try Again → unlock background scroll
document.querySelector("#tryAgainBtn").addEventListener("click", () => {
  document.body.style.overflow = "auto";
});

// lock background scrolling
document.body.classList.add("no-scroll");
 const shareBtn = document.querySelector("#shareBtn");
shareBtn.addEventListener("click", () => {
    const siteLink = "https://Evyano23.github.io/eviano-quiz/"; // your landing page
    const text = `I scored ${percentage}% on the Quiz! 🔥 Try it yourself!\n\nPlay here: ${siteLink}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
});


    console.log("Final score:",score);
    if (percentage >= 70) {
        setTimeout(() => launchConfetti(), 500);
  // 🎉 Confetti effect for pass
  setTimeout(() => {
    let duration = 2 * 1000;
    let end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 5,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb347', '#4CAF50', '#2196F3']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, 500);
}

    // Get name from input on index.html (make sure you have <input id="playerName"> there)
const playerName = localStorage.getItem("playerName") || "Anonymous";

// Create a result object
const result = {  
  name: playerName,
  score: score,
  total: quizQuestions.length,
  date: new Date().toLocaleString()
};

// Get previous results from localStorage or empty array
let results = JSON.parse(localStorage.getItem("quizResults")) || [];

// Add new result
results.push(result);
//call certificate generator

// Save back to localStorage
localStorage.setItem("quizResults", JSON.stringify(results));

    //hide buttons and options
    optionsContainer.style.display ="none";
    nextBtn.style.display ="none";
    prevBtn.style.display = "none";
    if(progressEl) progressEl.style.display="none";
    if(timerEL) timerEL.style.display="none";
      //show tryAgain button
    const tryAgainBtn = document.getElementById("tryAgainBtn");
tryAgainBtn.addEventListener("click", ()=>{
startQuiz();
});

//show certBtn button only i f users passes(example:70%)
const certBtn = document.getElementById("downloadCertBtn");
if (percentage >=70) {
    certBtn.style.display ="block";
    certBtn.addEventListener("click", ()=> {
        generateCertificate(score, quizQuestions.length); //calls a function to generate certificate
    });
}
}
   


//previous button
if (prevBtn) {
    prevBtn.addEventListener("click",(e)=> {
        e.preventDefault();
        console.log("prev clicked.Current index before:", currentQuestion);
        if (currentQuestion > 0) {
            currentQuestion--;
            ;loadQuestions();
        } else {
            console.log("Already at first question, staying on index", currentQuestion);
        }
    });
}
// Handle the Submit button
const submitBtn = document.getElementById("submitBtn");

if (submitBtn) {
  submitBtn.addEventListener("click", function () {
    //count how many questions have been answered
    const answeredCount = Object.keys(userAnswers).length;

    //check if all questions are answered
    if (answeredCount < quizQuestions.length) {
        //not all answered- show confirmation 
        const confirmSubmit = confirm(
            `You have answered ${answeredCount}/${quizQuestions.length}questions. \nAre you sure you want to submit?`
        );
        if (confirmSubmit) {
            //user choose yes-proceeds to submit
            endQuiz();
        } else {
            //user choose no- just return
            return;
        }
    }
    // Stop the quiz timer if it's still running
    if (typeof timerInterval !== "undefined") {
      clearInterval(timerInterval);
    }

    // Hide the submit button after clicking
    submitBtn.style.display = "none";

    // Call your existing endQuiz() to show score & results
    endQuiz();
  });
}


//start everything
startQuiz();


loadQuestions();
});






