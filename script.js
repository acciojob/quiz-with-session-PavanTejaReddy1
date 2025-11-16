const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const displayScore = document.getElementById("score");
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
	questionElement.addEventListener("click", (e) => {
		if(e.target.tagName === "INPUT") {
			const questionIndex = e.target.name.split("-")[1];
			userAnswers[questionIndex] = e.target.value;
			sessionStorage.setItem("progress", JSON.stringify(userAnswers));
		}
	})
  }
}
renderQuestions();

submitBtn.addEventListener("click", getScore)

function getScore() {
	let score = 0;
	for(i=0; i<questions.length; i++) {
		if(questions[i].answer === userAnswers[i]) {
			score++;
		}
	}
	displayScore.innerText = `Your score is ${score} out of 5.`
	localStorage.setItem("score", score);
}
