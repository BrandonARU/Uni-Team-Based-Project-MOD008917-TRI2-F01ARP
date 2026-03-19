function loadLeaderboard() {
  const tbody = document.getElementById("leaderboardBody");
  if (!tbody) return;

  let leaderboard =
    JSON.parse(localStorage.getItem("math0ryxLeaderboard")) || [];

  leaderboard = leaderboard.slice(0, 21); //first 21 scores//

  tbody.innerHTML = "";

  leaderboard.forEach((entry, index) => {
    const percentage = (entry.score / questions.length) * 100;
    let medal = "None";
    let medalClass = "medal-none";

    if (percentage >= 85) {
      medal = "Gold";
      medalClass = "medal-gold";
    } else if (percentage >= 67) {
      medal = "Silver";
      medalClass = "medal-silver";
    } else if (percentage >= 50) {
      medal = "Bronze";
      medalClass = "medal-bronze";
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.score} / ${questions.length}</td>
      <td>${entry.date}</td>
      <td class="${medalClass}">${medal}</td>
    `;
    tbody.appendChild(row);
  });

  if (leaderboard.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5">No scores. Play the game, kettle!</td></tr>';
  }
}

window.addEventListener("load", loadLeaderboard);
