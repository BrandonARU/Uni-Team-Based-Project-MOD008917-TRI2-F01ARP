var storedJSON;
var score = 0;
var totalQuestionNo = 0;

function loadLocalJSON(){
    storedJSON = {
    "Questions":[
        {
            "Question" : "Write 3/8 as a percentage.",
            "Options" : ["12.5", "33.3", "37.5", "42.12"],
            "Answer" : 2
        },
        {
            "Question" : "Work out 15/32 as a decimal.",
            "Options" : ["0.15", "0.24", "0.30", "0.47"],
            "Answer" : 3
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Work out 16/32 as a decimal.",
            "Options" : ["0.30", "0.47", "0.50", "0.58"],
            "Answer" : 2
        },
        {
            "Question" : "Simplify 16/128",
            "Options" : ["1/8", "2/8", "1/12", "2/12"],
            "Answer" : 0
        },
        {
            "Question" : "Simplify 22/132",
            "Options" : ["1/6", "2/6", "1/12", "2/12"],
            "Answer" : 0
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
        },
        {
            "Question" : "Write 12/28 as a percentage",
            "Options" : ["12.28", "28.12", "42.8", "58.2"],
            "Answer" : 2
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
                        <div class="quizQuestion">
                            <p class="quizQText">${questionNo}. ${object.Question}</p>
                            <div class="quizOptions">
                                <button class="quizOption" id="question-${questionNo-1}-0" onclick="CheckAnswer(${questionNo-1},0)">${object.Options[0]}</button>
                                <button class="quizOption" id="question-${questionNo-1}-1" onclick="CheckAnswer(${questionNo-1},2)">${object.Options[2]}</button>
                                <button class="quizOption" id="question-${questionNo-1}-2" onclick="CheckAnswer(${questionNo-1},3)">${object.Options[3]}</button>
                                <button class="quizOption" id="question-${questionNo-1}-3" onclick="CheckAnswer(${questionNo-1},1)">${object.Options[1]}</button>
                            </div>
                        </div>
            `;
        questionNo = questionNo + 1;
        html = html + htmlChunk;
    })

    document.getElementById("quizContainer").innerHTML = html;
    
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
}

function WrongAnswer(question, chosenAnswer){
    document.getElementById(`question-${question}-${storedJSON.Questions[question].Answer}`).className = "quizOption quizOptionCorrect"
    document.getElementById(`question-${question}-${chosenAnswer}`).className = "quizOption quizOptionIncorrect"
}

function UpdateScore(){

}

loadLocalJSON();
totalQuestionNo = writeHTMLfromJSON(storedJSON);