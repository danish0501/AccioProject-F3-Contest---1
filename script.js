// prompt("Hello");

// OpeningCeremony() → Race100M() → LongJump() → HighJump() → AwardCeremony()

function openingCeremony(callback) {
  setTimeout(() => {
    console.log("Let the games begin");
    const score = { red: 0, yellow: 0, blue: 0, green: 0 };
    callback(score, race);
  }, 1000);
}

function race(score, callback) {
  setTimeout(() => {
    const raceTimes = {
      red: Math.floor(Math.random() * 6) + 10,
      yellow: Math.floor(Math.random() * 6) + 10,
      blue: Math.floor(Math.random() * 6) + 10,
      green: Math.floor(Math.random() * 6) + 10,
    };
    const winner = Object.keys(raceTimes).reduce((prev, curr) =>
      raceTimes[prev] < raceTimes[curr] ? prev : curr
    );
    score[winner] += 25;
    console.log(`Race winner: ${winner}`);
    console.log(`Previous score: ${JSON.stringify(score)}`);
    callback(score, longJump);
  }, 3000);
}

function longJump(score, callback) {
  setTimeout(() => {
    const jumper = ["red", "yellow", "blue", "green"][Math.floor(Math.random() * 4)];
    score[jumper] += 150;
    console.log(`Long jump winner: ${jumper}`);
    console.log(`Previous score: ${JSON.stringify(score)}`);
    callback(score, highJump);
  }, 2000);
}

function highJump(score, callback) {
  const colors = ["red", "yellow", "blue", "green"];
  const promptMessage = `Enter the color that secured the highest jump (${colors.join(", ")}):`;
  const input = prompt(promptMessage);
  if (colors.includes(input)) {
    score[input] += 100;
  } else if (input !== null) {
    console.log("Invalid input or event was cancelled");
  }
  console.log(`Previous score: ${JSON.stringify(score)}`);
  callback(score, awardCeremony);
}

function awardCeremony(score) {
  const sortedScores = Object.entries(score).sort((a, b) => b[1] - a[1]);
  console.log(`Winner: ${sortedScores[0][0]} (${sortedScores[0][1]} points)`);
  console.log(`Runner-up: ${sortedScores[1][0]} (${sortedScores[1][1]} points)`);
  console.log(`Third place: ${sortedScores[2][0]} (${sortedScores[2][1]} points)`);
}

openingCeremony((score, callback) => {
  callback(score, (score, callback) => {
    callback(score, (score, callback) => {
      callback(score, (score) => {
        awardCeremony(score);
      });
    });
  });
});