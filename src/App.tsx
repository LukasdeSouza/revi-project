import { useState } from 'react';
import { Plus, Sword, Users } from 'lucide-react';
import { MonsterForm } from './components/MonsterForm';
import { MonsterCard } from './components/MonsterCard';
import { BattleResult } from './components/BattleResult';
import { useMonsters } from './hooks/useMonsters';
import { calculateBattle } from './utils/battleLogic';
import type { Monster, BattleResult as BattleResultType, CreateMonsterData } from './types/monster';

function App() {
  const { monsters, addMonster, removeMonster } = useMonsters();
  const [showForm, setShowForm] = useState(false);
  const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]);
  const [battleResult, setBattleResult] = useState<BattleResultType | null>(null);

  const handleCreateMonster = (monsterData: CreateMonsterData) => {
    addMonster(monsterData);
    setShowForm(false);
  };

  const handleSelectMonster = (monster: Monster) => {
    if (selectedMonsters.find(m => m.id === monster.id)) {
      setSelectedMonsters(prev => prev.filter(m => m.id !== monster.id));
    } else if (selectedMonsters.length < 2) {
      setSelectedMonsters(prev => [...prev, monster]);
    }
  };

  const handleStartBattle = () => {
    if (selectedMonsters.length === 2) {
      const result = calculateBattle(selectedMonsters[0], selectedMonsters[1]);
      setBattleResult(result);
      setSelectedMonsters([]);
    }
  };

  const handleCloseBattleResult = () => {
    setBattleResult(null);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Sword className="text-primary-500" size={40} />
          Batalha de Monstros
        </h1>
        <p className="text-white/70 text-lg">
          Crie monstros e deixe-os lutar em batalhas épicas!
        </p>
      </header>

      {/* Botão de criar monstro */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Criar Monstro
        </button>
      </div>

      {/* Área de seleção para batalha */}
      {monsters.length >= 2 && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users size={24} />
            Selecionar Monstros para Batalha
          </h2>
          
          {selectedMonsters.length > 0 && (
            <div className="mb-4">
              <p className="text-white/80 mb-3">
                Monstros selecionados ({selectedMonsters.length}/2):
              </p>
              <div className="flex gap-3 mb-4">
                {selectedMonsters.map(monster => (
                  <div
                    key={monster.id}
                    className="flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 rounded-lg px-3 py-2"
                  >
                    <span className="text-white font-medium">{monster.name}</span>
                    <button
                      onClick={() => handleSelectMonster(monster)}
                      className="text-white/70 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              {selectedMonsters.length === 2 && (
                <button
                  onClick={handleStartBattle}
                  className="btn-primary flex items-center gap-2"
                >
                  <Sword size={20} />
                  Iniciar Batalha!
                </button>
              )}
            </div>
          )}
          
          <p className="text-white/60 text-sm">
            Clique em dois monstros para selecioná-los para batalha
          </p>
        </div>
      )}

      {/* Lista de monstros */}
      {monsters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {monsters.map(monster => (
            <MonsterCard
              key={monster.id}
              monster={monster}
              onSelect={handleSelectMonster}
              onDelete={removeMonster}
              isSelected={selectedMonsters.some(m => m.id === monster.id)}
              isSelectable={monsters.length >= 2}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐉</div>
          <h3 className="text-xl font-bold text-white mb-2">
            Nenhum monstro criado ainda
          </h3>
          <p className="text-white/60">
            Crie seu primeiro monstro para começar as batalhas!
          </p>
        </div>
      )}

      {/* Modal de criação de monstro */}
      {showForm && (
        <MonsterForm
          onSubmit={handleCreateMonster}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Modal de resultado da batalha */}
      {battleResult && (
        <BattleResult
          result={battleResult}
          onClose={handleCloseBattleResult}
        />
      )}
    </div>
  );
}

export default App;
