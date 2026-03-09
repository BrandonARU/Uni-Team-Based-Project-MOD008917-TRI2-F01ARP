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
                            <p class="quizQText">Question ${questionNo}: ${object.Question}</p>
                            <div class="quizOptions">
                                <button class="quizOption" onclick="checkAnswer(0,0)">${object.Options[0]}</button>
                                <button class="quizOption" onclick="checkAnswer(0,1)">${object.Options[1]}</button>
                                <button class="quizOption" onclick="checkAnswer(0,2)">${object.Options[2]}</button>
                                <button class="quizOption" onclick="checkAnswer(0,3)">${object.Options[3]}</button>
                            </div>
                        </div>
            `;
        questionNo = questionNo + 1;
        html = html + htmlChunk;
    })

    document.getElementById("quizContainer").innerHTML = html;
}

fetchJson();