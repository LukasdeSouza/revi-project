import { useState, useCallback } from 'react';
import type { Monster, CreateMonsterData } from '../types/monster';

export function useMonsters() {
  const [monsters, setMonsters] = useState<Monster[]>([]);

  const addMonster = useCallback((monsterData: CreateMonsterData) => {
    const newMonster: Monster = {
      ...monsterData,
      id: crypto.randomUUID(),
    };
    
    setMonsters(prev => [...prev, newMonster]);
    return newMonster;
  }, []);

  const removeMonster = useCallback((id: string) => {
    setMonsters(prev => prev.filter(monster => monster.id !== id));
  }, []);

  const getMonsterById = useCallback((id: string) => {
    return monsters.find(monster => monster.id === id);
  }, [monsters]);

  return {
    monsters,
    addMonster,
    removeMonster,
    getMonsterById,
  };
} 