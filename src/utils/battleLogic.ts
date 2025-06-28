import type { Monster, BattleRound, BattleResult } from '../types/monster';

export function calculateBattle(monster1: Monster, monster2: Monster): BattleResult {
  const rounds: BattleRound[] = [];
  const currentMonster1 = { ...monster1 };
  const currentMonster2 = { ...monster2 };
  
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
  
  let roundNumber = 1;
  
  while (currentMonster1.hp > 0 && currentMonster2.hp > 0) {
    // Calcular dano
    const damage = Math.max(1, firstAttacker.attack - firstDefender.defense);
    
    // Aplicar dano
    firstDefender.hp = Math.max(0, firstDefender.hp - damage);
    
    // Registrar round
    rounds.push({
      round: roundNumber,
      attacker: firstAttacker,
      defender: firstDefender,
      damage,
      defenderHpAfter: firstDefender.hp
    });
    
    // Verificar se a batalha terminou
    if (firstDefender.hp <= 0) {
      break;
    }
    
    // Trocar posições para o próximo round
    [firstAttacker, firstDefender] = [firstDefender, firstAttacker];
    roundNumber++;
  }
  
  // Determinar vencedor
  const winner = currentMonster1.hp > 0 ? currentMonster1 : currentMonster2;
  const loser = currentMonster1.hp > 0 ? currentMonster2 : currentMonster1;
  
  return {
    winner,
    loser,
    rounds,
    totalRounds: roundNumber
  };
} 