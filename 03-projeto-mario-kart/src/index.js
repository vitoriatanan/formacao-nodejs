const player1 = {
  ID: 1,
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  ID: 2,
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

const player3 = {
    ID: 3,
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
};

const player4 = {
    ID: 4,
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0
};

const player5 = {
    ID: 5,
    NOME: "Browser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
};

const player6 = {
    ID: 6,
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
};




async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Aleatoriza os personagens
async function randomizingPlayers() {
  let player1 = await rollDice();
  let player2 = await rollDice();

  // Aleatoriza de novo se os personagens forem iguais
  if (player1 === player2) {
    let playerRan1 = await rollDice();
    let playerRan2 = await rollDice();

    return [playerRan1, playerRan2];
  }

  return [player1, player2];
}


// Seleciona os personagens referente ao seu ID
async function selectingPlayers() {
  const allPlayers = [player1, player2, player3, player4, player5, player6];

  let [id1, id2] = await randomizingPlayers(); // para aleatorizar os personagens

  // Garante que os IDs sorteados sejam únicos
  while (id1 === id2) {
    [id1, id2] = await randomizingPlayers();
  }

  // Busca os objetos correspondentes aos IDs
  const character1 = allPlayers.find(p => p.ID === id1); // para cada jogador chamado p, verifica se o id é igual.
  const character2 = allPlayers.find(p => p.ID === id2);

  console.log(`🏁🚨 Corrida entre ${character1.NOME} e ${character2.NOME} começando...\n`);

  await playRaceEngine(character1, character2);
  await declareWinner(character1, character2);
}


async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      // Gera 1 (casco) ou 2 (bomba) aleatoriamente
      let typeConfront = Math.floor(Math.random() * 2) + 1;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );


      if (typeConfront === 1) { // 1 - casco
        if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
          console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
          );
          character2.PONTOS--;
        }
        if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
          console.log(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
          );
          character1.PONTOS--;
        }
      } else { // 2 - bomba (-2 pontos)
        if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
          console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 2 pontos 💣`
          );
          character2.PONTOS -= 2;
        }
        if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
          console.log(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 2 pontos 💣`
          );
          character1.PONTOS -= 2;
          if (character1.PONTOS < 0) {
            character1.PONTOS = 0;
          }
        }
      }
     
      console.log(
        powerResult2 === powerResult1
          ? "Confronto empatado! Nenhum ponto foi perdido"
          : ""
      );
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("-----------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("\nA corrida terminou em empate!");
}

(async function main() {
  await selectingPlayers();
})();
