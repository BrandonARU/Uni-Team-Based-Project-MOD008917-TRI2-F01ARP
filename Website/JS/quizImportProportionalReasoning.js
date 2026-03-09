function fetchJson(){
    fetch('./JSON/Quiz/ProportionalReasoning.json')
        .then(response => response.json())
        .then((json) => processJson(json))
}

function processJson(json){
    let html = "";
    let questionNo = 1;

    json.Questions.forEach(object => {
        let htmlChunk = 
            `
                        <div class="quizQuestion">
                            <p class="quizQText">${questionNo}. ${object.Question}</p>
                            <div class="quizOptions">
                                <button class="quizOption" onclick="checkAnswer(${questionNo-1},0)">${object.Options[0]}</button>
                                <button class="quizOption" onclick="checkAnswer(${questionNo-1},1)">${object.Options[1]}</button>
                                <button class="quizOption" onclick="checkAnswer(${questionNo-1},2)">${object.Options[2]}</button>
                                <button class="quizOption" onclick="checkAnswer(${questionNo-1},3)">${object.Options[3]}</button>
                            </div>
                        </div>
            `;
        questionNo = questionNo + 1;
        html = html + htmlChunk;
    })

    document.getElementById("quizContainer").innerHTML = html;
}

var score = 0;
var answered = [];

function checkAnswer(qIndex, chosen) {
    if (answered[qIndex]) {
        return;
    }
    answered[qIndex] = true;

    var buttons = document.querySelectorAll('#q' + qIndex + ' .quizOption');
    var correct = questions[qIndex].correct;

    if (chosen === correct) {
        score++;
        buttons[chosen].classList.add('correct');
    } else {
        buttons[chosen].classList.add('wrong');
        buttons[correct].classList.add('correct');
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    document.getElementById('quizScore').textContent = 'Score: ' + score;
}

fetchJson();