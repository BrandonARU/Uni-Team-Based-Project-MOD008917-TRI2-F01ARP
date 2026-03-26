var storedJSON;
var score = 0;
var totalQuestionNo = 20;

function loadLocalJSON(){
    storedJSON = {
    "Questions":[
        {
            "Question": "If 3 apples cost £6, how much do 5 apples cost?",
            "Options": ["£8", "£10", "£12", "£15"],
            "Answer": 1
        },
        {
            "Question": "A car travels 120 km in 2 hours. How far will it travel in 5 hours at the same speed?",
            "Options": ["200 km", "240 km", "300 km", "360 km"],
            "Answer": 2
        },
        {
            "Question": "If 4 pencils cost £2, what is the cost of 10 pencils?",
            "Options": ["£4", "£5", "£6", "£8"],
            "Answer": 1
        },
        {
            "Question": "A recipe uses 2 cups of flour for 8 cookies. How many cups are needed for 20 cookies?",
            "Options": ["4", "5", "6", "8"],
            "Answer": 1
        },
        {
            "Question": "If 6 workers complete a job in 12 days, how many days will 3 workers take (same rate)?",
            "Options": ["6", "12", "18", "24"],
            "Answer": 3
        },
        {
            "Question": "A map scale is 1 cm : 10 km. What distance does 5 cm represent?",
            "Options": ["25 km", "40 km", "50 km", "60 km"],
            "Answer": 2
        },
        {
            "Question": "If 8 books cost £64, what is the cost of 5 books?",
            "Options": ["£30", "£35", "£40", "£45"],
            "Answer": 2
        },
        {
            "Question": "A train travels 90 km in 1.5 hours. What is its speed per hour?",
            "Options": ["45 km/h", "50 km/h", "60 km/h", "75 km/h"],
            "Answer": 2
        },
        {
            "Question": "If 2 kg of rice costs £6, how much does 7 kg cost?",
            "Options": ["£18", "£20", "£21", "£24"],
            "Answer": 2
        },
        {
            "Question": "A printer prints 15 pages in 3 minutes. How many pages in 10 minutes?",
            "Options": ["30", "40", "45", "50"],
            "Answer": 3
        },
        {
            "Question": "If 5 identical shirts cost £75, what is the cost of 2 shirts?",
            "Options": ["£25", "£30", "£35", "£40"],
            "Answer": 1
        },
        {
            "Question": "A tank fills in 8 hours at a constant rate. How much of the tank is filled in 2 hours?",
            "Options": ["1/2", "1/3", "1/4", "1/5"],
            "Answer": 2
        },
        {
            "Question": "If 12 oranges cost £9, what is the cost of 16 oranges?",
            "Options": ["£10", "£11", "£12", "£13"],
            "Answer": 2
        },
        {
            "Question": "A cyclist travels 45 km in 3 hours. How far in 7 hours?",
            "Options": ["90 km", "95 km", "100 km", "105 km"],
            "Answer": 3
        },
        {
            "Question": "If 7 liters of paint cover 56 m², how much area will 3 liters cover?",
            "Options": ["18 m²", "21 m²", "24 m²", "28 m²"],
            "Answer": 2
        },
        {
            "Question": "A machine produces 200 units in 4 hours. How many units in 9 hours?",
            "Options": ["350", "400", "450", "500"],
            "Answer": 2
        },
        {
            "Question": "If 9 notebooks cost £27, what is the cost of 4 notebooks?",
            "Options": ["£10", "£11", "£12", "£13"],
            "Answer": 2
        },
        {
            "Question": "A car uses 8 liters of fuel to travel 100 km. How much fuel for 250 km?",
            "Options": ["16 L", "18 L", "20 L", "24 L"],
            "Answer": 2
        },
        {
            "Question": "If 5 kg of sugar costs £15, what is the cost of 12 kg?",
            "Options": ["£30", "£32", "£36", "£40"],
            "Answer": 2
        },
        {
            "Question": "A worker earns £80 in 8 hours. How much will they earn in 5 hours?",
            "Options": ["£40", "£45", "£50", "£60"],
            "Answer": 2
        }
    ]
}
}
function fetchJson(){
    fetch('./JSON/Quiz/ProportionalReasoning.json')
        .then(response => {
            if (response.ok){
                return response.json();
            }
            else {
                throw new Error("Failed to fetch JSON")
            }
        })
}

function writeHTMLfromJSON(json){

    let html = "";
    let questionNo = 1;

    json.Questions.forEach(object => {
        let htmlChunk = 
            `
                        <div class="quizQuestion" id="quizQuestion${questionNo}">
                            <p class="quizQText">${questionNo}. ${object.Question}</p>
                            <div class="quizOptions">
                                <button class="quizOption" id="question-${questionNo-1}-0" onclick="CheckAnswer(${questionNo-1},0)">${object.Options[0]}</button>
                                <button class="quizOption" id="question-${questionNo-1}-1" onclick="CheckAnswer(${questionNo-1},1)">${object.Options[1]}</button>
                                <button class="quizOption" id="question-${questionNo-1}-2" onclick="CheckAnswer(${questionNo-1},2)">${object.Options[2]}</button>
                                <button class="quizOption" id="question-${questionNo-1}-3" onclick="CheckAnswer(${questionNo-1},3)">${object.Options[3]}</button>
                            </div>
                        </div>
            `;
        questionNo = questionNo + 1;
        html = html + htmlChunk;
    })
    
    html += `<div id="quizScore">Score: ${score} / ${totalQuestionNo} </div>`;

    document.getElementById("quizEmbedContainer").innerHTML = html;
    
    return questionNo;
}


function CheckAnswer(question, chosenAnswer) {
    if(storedJSON.Questions[question].Answer == chosenAnswer){
        CorrectAnswer(question, chosenAnswer);
    }
    else{
        WrongAnswer(question, chosenAnswer);
    }
}

function CorrectAnswer(question, chosenAnswer){
    document.getElementById(`question-${question}-${chosenAnswer}`).className = "quizOption quizOptionCorrect"
    score = score + 1;
    UpdateScore();
    DisableOptions(question);
}

function WrongAnswer(question, chosenAnswer){
    document.getElementById(`question-${question}-${storedJSON.Questions[question].Answer}`).className = "quizOption quizOptionCorrect"
    document.getElementById(`question-${question}-${chosenAnswer}`).className = "quizOption quizOptionIncorrect"
    DisableOptions(question);
}

function UpdateScore(){
    document.getElementById("quizScore").textContent = `Score: ${score} / ${totalQuestionNo}`;
}

function DisableOptions(questionClicked){
    document.getElementById(`question-${questionClicked}-0`).disabled = true;
    document.getElementById(`question-${questionClicked}-1`).disabled = true;
    document.getElementById(`question-${questionClicked}-2`).disabled = true;
    document.getElementById(`question-${questionClicked}-3`).disabled = true;
}

loadLocalJSON();
totalQuestionNo = writeHTMLfromJSON(storedJSON) - 1;