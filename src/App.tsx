import { useState } from 'react'
import { MonsterForm } from './components/MonsterForm'
import { MonsterCard } from './components/MonsterCard'
import { BattleResult } from './components/BattleResult'
import { calculateBattle } from './utils/battleLogic'
import type { Monster, BattleResult as BattleResultType } from './types/monster'
import './index.css'

function App() {
  const [monsters, setMonsters] = useState<Monster[]>([])
  const [selectedMonster1, setSelectedMonster1] = useState<Monster | null>(null)
  const [selectedMonster2, setSelectedMonster2] = useState<Monster | null>(null)
  const [battleResult, setBattleResult] = useState<BattleResultType | null>(null)

  const handleMonsterCreated = (monster: Monster) => {
    setMonsters(prev => [...prev, monster])
  }

  const handleMonsterSelect = (monster: Monster, position: 1 | 2) => {
    if (position === 1) {
      setSelectedMonster1(monster)
    } else {
      setSelectedMonster2(monster)
    }
  }

  const handleBattle = () => {
    if (selectedMonster1 && selectedMonster2) {
      const result = calculateBattle(selectedMonster1, selectedMonster2)
      setBattleResult(result)
    }
  }

  const handleCloseBattleResult = () => {
    setBattleResult(null)
    setSelectedMonster1(null)
    setSelectedMonster2(null)
  }

  const canStartBattle = selectedMonster1 && selectedMonster2

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-start bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full flex flex-col items-center px-2 py-8 flex-1">
        <h1 className="text-4xl font-bold text-center mb-8 w-full">⚔️ Batalha de Monstros ⚔️</h1>
        
        <div className="w-full flex flex-col lg:flex-row gap-8 mb-8">
          {/* Formulário de Cadastro */}
          <div className="flex-1 min-w-[320px]">
            <MonsterForm onMonsterCreated={handleMonsterCreated} />
          </div>
          
          {/* Lista de Monstros */}
          <div className="flex-1 min-w-[320px]">
            <h2 className="text-2xl font-bold mb-4">Monstros Cadastrados</h2>
            {monsters.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-white/70">Nenhum monstro cadastrado ainda.</p>
                <p className="text-white/50 text-sm mt-2">Cadastre um monstro para começar!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {monsters.map(monster => (
                  <MonsterCard
                    key={monster.id}
                    monster={monster}
                    isSelected={selectedMonster1?.id === monster.id || selectedMonster2?.id === monster.id}
                    isDisabled={selectedMonster1?.id === monster.id || selectedMonster2?.id === monster.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Arena de Batalha */}
        {monsters.length >= 2 && (
          <div className="relative w-full bg-gradient-to-r from-red-500/20 to-blue-500/20 border-2 border-white/30 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-center mb-6">🏟️ Arena de Batalha</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Monstro 1 */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Monstro 1</h3>
                {selectedMonster1 ? (
                  <MonsterCard
                    monster={selectedMonster1}
                    onSelect={() => setSelectedMonster1(null)}
                    isSelected={true}
                  />
                ) : (
                  <div className="bg-white/10 border-2 border-dashed border-white/30 rounded-xl p-6 min-h-[120px] flex items-center justify-center">
                    <p className="text-white/50">Selecione um monstro</p>
                  </div>
                )}
              </div>

              {/* VS */}
              <div className="text-center">
                <div className="text-6xl font-bold text-red-500 mb-4">⚔️</div>
                <button
                  onClick={handleBattle}
                  disabled={!canStartBattle}
                  className={`
                    px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200
                    ${canStartBattle 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  INICIAR BATALHA
                </button>
              </div>

              {/* Monstro 2 */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Monstro 2</h3>
                {selectedMonster2 ? (
                  <MonsterCard
                    monster={selectedMonster2}
                    onSelect={() => setSelectedMonster2(null)}
                    isSelected={true}
                  />
                ) : (
                  <div className="bg-white/10 border-2 border-dashed border-white/30 rounded-xl p-6 min-h-[120px] flex items-center justify-center">
                    <p className="text-white/50">Selecione um monstro</p>
                  </div>
                )}
              </div>
            </div>

            {/* Seleção de Monstros */}
            {(!selectedMonster1 || !selectedMonster2) && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4 text-center">Selecione os monstros para a batalha:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-center mb-2 text-white/70">Para Monstro 1:</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {monsters
                        .filter(m => m.id !== selectedMonster2?.id)
                        .map(monster => (
                          <div
                            key={monster.id}
                            onClick={() => handleMonsterSelect(monster, 1)}
                            className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-2 cursor-pointer transition-all duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={monster.image_url}
                                alt={monster.name}
                                className="w-8 h-8 rounded object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = 'https://via.placeholder.com/32x32/6b7280/ffffff?text=?'
                                }}
                              />
                              <span className="text-sm font-medium">{monster.name}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-center mb-2 text-white/70">Para Monstro 2:</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {monsters
                        .filter(m => m.id !== selectedMonster1?.id)
                        .map(monster => (
                          <div
                            key={monster.id}
                            onClick={() => handleMonsterSelect(monster, 2)}
                            className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-2 cursor-pointer transition-all duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={monster.image_url}
                                alt={monster.name}
                                className="w-8 h-8 rounded object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = 'https://via.placeholder.com/32x32/6b7280/ffffff?text=?'
                                }}
                              />
                              <span className="text-sm font-medium">{monster.name}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal de Resultado */}
        {battleResult && (
          <BattleResult result={battleResult} onClose={handleCloseBattleResult} />
        )}
      </div>
    </div>
  )
}

export default App
