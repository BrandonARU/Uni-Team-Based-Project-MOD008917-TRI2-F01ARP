function fetchJson(){
    fetch('../JSON/Quiz/ProportionalReasoning.json')
        .then(response => response.json())
        .then((json) => processJson(json))
}

function processJson(json){
    let html = "";

    json.courses.forEach(object => {
        let htmlChunk = 
            `
                  
            `;

        html = html + htmlChunk;
    })

    document.getElementById("quizContainer").innerHTML = html;
}

fetchJson();