document.addEventListener("DOMContentLoaded", () => {
  const finishBtn = document.createElement("button");
  finishBtn.textContent = "Finish & Save?";
  finishBtn.style.cssText =
    "display:none; margin:2rem auto; padding:1rem 2.5rem; font-size:1.3rem; background:#ffc107; color:black; border:none; border-radius:50px; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.4);";
  finishBtn.id = "finishAndSaveBtn";

  const scoreElement = document.getElementById("quizScore");
  if (scoreElement && scoreElement.parentNode) {
    scoreElement.parentNode.appendChild(finishBtn);
  }

  finishBtn.onclick = () => {
    const scoreDisplay =
      document.getElementById("quizScore")?.textContent || "0 / 20";
    document.getElementById("modalFinalScore").textContent = scoreDisplay;
    document.getElementById("saveScoreModal").style.display = "flex";
  };

  document.getElementById("btnSaveNo").onclick = () => {
    document.getElementById("saveScoreModal").style.display = "none";
  };

  document.getElementById("btnSaveYes").onclick = () => {
    document.getElementById("nameEntry").style.display = "block";
  };

  document.getElementById("btnConfirmSave").onclick = async () => {
    const name = document.getElementById("playerName").value.trim();
    if (!name) {
      alert("Please enter your name");
      return;
    }

    const scoreText =
      document.getElementById("quizScore")?.textContent || "0 / 20";
    const scoreNum = parseInt(scoreText.match(/\d+/)?.[0] || "0");

    try {
      const res = await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score: scoreNum }),
      });

      if (res.ok) {
        alert("Score saved successfully!");
      } else {
        alert("Could not save score (server error)");
      }
    } catch (err) {
      alert("Cannot reach server. Is server.py running?\n" + err.message);
    }

    document.getElementById("saveScoreModal").style.display = "none";
    document.getElementById("nameEntry").style.display = "none";
    document.getElementById("playerName").value = "";
  };
});
