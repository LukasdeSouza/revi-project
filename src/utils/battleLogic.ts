import type { Monster, BattleRound, BattleResult } from '../types/monster';

export function calculateBattle(monster1: Monster, monster2: Monster): BattleResult {
  const rounds: BattleRound[] = [];
  let currentMonster1 = { ...monster1 };
  let currentMonster2 = { ...monster2 };
  
  // Determinar quem ataca primeiro
  let firstAttacker: Monster;
  let firstDefender: Monster;
  
  if (currentMonster1.speed > currentMonster2.speed) {
    firstAttacker = currentMonster1;
    firstDefender = currentMonster2;
  } else if (currentMonster2.speed > currentMonster1.speed) {
    firstAttacker = currentMonster2;
    firstDefender = currentMonster1;
  } else {
    // Velocidades iguais, quem tem maior ataque vai primeiro
    if (currentMonster1.attack >= currentMonster2.attack) {
      firstAttacker = currentMonster1;
      firstDefender = currentMonster2;
    } else {
      firstAttacker = currentMonster2;
      firstDefender = currentMonster1;
    }
  }
  
  let attacker = firstAttacker;
  let defender = firstDefender;
  
  // Batalha em rounds até que um monstro seja derrotado
  while (currentMonster1.hp > 0 && currentMonster2.hp > 0) {
    // Calcular dano
    const damage = Math.max(1, attacker.attack - defender.defense);
    
    // Aplicar dano
    if (attacker.id === currentMonster1.id) {
      currentMonster2.hp = Math.max(0, currentMonster2.hp - damage);
    } else {
      currentMonster1.hp = Math.max(0, currentMonster1.hp - damage);
    }
    
    // Registrar round
    rounds.push({
      attacker,
      defender,
      damage,
      defenderHpAfter: attacker.id === currentMonster1.id ? currentMonster2.hp : currentMonster1.hp
    });
    
    // Trocar atacante e defensor para o próximo round
    [attacker, defender] = [defender, attacker];
  }
  
  // Determinar vencedor
  const winner = currentMonster1.hp > 0 ? currentMonster1 : currentMonster2;
  const loser = currentMonster1.hp > 0 ? currentMonster2 : currentMonster1;
  
  return {
    winner,
    loser,
    rounds,
    totalRounds: rounds.length
  };
} 