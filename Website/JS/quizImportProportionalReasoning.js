var storedJSON;
var score = 0;
var totalQuestionNo = 0;

function fetchJson(loadingJSON){
    fetch('./JSON/Quiz/ProportionalReasoning.json')
        .then(response => response.json())
        .then((json) => loadingJSON)
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
                                <button class="quizOption" id="question-${questionNo-1}-0" onclick="checkAnswer(${questionNo-1},0)">${object.Options[0]}</button>
                                <button class="quizOption" id="question-${questionNo-1}-1" onclick="checkAnswer(${questionNo-1},2)">${object.Options[2]}</button>
                                <button class="quizOption" id="question-${questionNo-1}-2" onclick="checkAnswer(${questionNo-1},3)">${object.Options[3]}</button>
                                <button class="quizOption" id="question-${questionNo-1}-3" onclick="checkAnswer(${questionNo-1},1)">${object.Options[1]}</button>
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

function WrongAnswer(){
    document.getElementById(`question-${question}-${storedJSON.Questions[question].Answer}`).className = "quizOption quizOptionCorrect"
    document.getElementById(`question-${question}-${chosenAnswer}`).className = "quizOption quizOptionIncorrect"
}

function UpdateScore(){

}

fetchJson(storedJSON);
totalQuestionNo = writeHTMLfromJSON(storedJSON);