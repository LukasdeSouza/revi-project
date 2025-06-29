import { useState } from 'react'
import { MonsterForm } from './components/MonsterForm'
import { MonsterCard } from './components/MonsterCard'
import { BattleResult } from './components/BattleResult'
import { calculateBattle } from './utils/battleLogic'
import type { Monster, BattleResult as BattleResultType } from './types/monster'
import './index.css'
import { Swords } from 'lucide-react'
import ListOfMonstersRegistered from './components/ListOfMonstersRegistered'

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
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-start bg-transparent overflow-x-hidden">
      <div className="w-full max-w-[1400px] flex flex-col items-center px-4 py-10 flex-1 box-border">
        <h1 className="text-5xl text-center text-blue-700 mb-10 w-full flex items-center justify-center gap-4">
          Batalha de Monstros
        </h1>

        <div className="w-full flex flex-col lg:flex-row gap-10 mb-12">
          <div className="flex-1 min-w-[320px]">
            <MonsterForm onMonsterCreated={handleMonsterCreated} />
          </div>
          <ListOfMonstersRegistered selectedMonster1={selectedMonster1} selectedMonster2={selectedMonster2} monsters={monsters} />
        </div>

        {monsters.length >= 2 && (
          <div className="relative w-full bg-white border border-gray-200 rounded-2xl p-10 mb-10 shadow-md">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800"> Arena de Batalha</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-700">Monstro 1</h3>
                {selectedMonster1 ? (
                  <MonsterCard
                    monster={selectedMonster1}
                    onSelect={() => setSelectedMonster1(null)}
                    isSelected={true}
                  />
                ) : (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 min-h-[120px] flex items-center justify-center">
                    <p className="text-gray-400">Selecione um monstro</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <Swords size={80} className='text-blue-600 mb-4' />
                <button
                  onClick={handleBattle}
                  disabled={!canStartBattle}
                  className={`
                    px-10 py-3 rounded-xl border border-slate-300 font-bold text-lg transition-all duration-200 shadow-md cursor-pointer
                    ${canStartBattle
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  INICIAR BATALHA
                </button>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-700">Monstro 2</h3>
                {selectedMonster2 ? (
                  <MonsterCard
                    monster={selectedMonster2}
                    onSelect={() => setSelectedMonster2(null)}
                    isSelected={true}
                  />
                ) : (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 min-h-[120px] flex items-center justify-center">
                    <p className="text-gray-400">Selecione um monstro</p>
                  </div>
                )}
              </div>
            </div>

            {(!selectedMonster1 || !selectedMonster2) && (
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 text-center text-gray-700">Selecione os monstros para a batalha:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-center mb-2 text-gray-500">Para Monstro 1:</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {monsters
                        .filter(m => m.id !== selectedMonster2?.id)
                        .map(monster => (
                          <div
                            key={monster.id}
                            onClick={() => handleMonsterSelect(monster, 1)}
                            className="bg-gray-100 hover:bg-blue-50 border border-gray-200 rounded-lg p-2 cursor-pointer transition-all duration-200"
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
                              <span className="text-sm font-medium text-gray-700">{monster.name}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-center mb-2 text-gray-500">Para Monstro 2:</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {monsters
                        .filter(m => m.id !== selectedMonster1?.id)
                        .map(monster => (
                          <div
                            key={monster.id}
                            onClick={() => handleMonsterSelect(monster, 2)}
                            className="bg-gray-100 hover:bg-blue-50 border border-gray-200 rounded-lg p-2 cursor-pointer transition-all duration-200"
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
                              <span className="text-sm font-medium text-gray-700">{monster.name}</span>
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

        {battleResult && (
          <BattleResult result={battleResult} onClose={handleCloseBattleResult} />
        )}
      </div>
    </div>
  )
}

export default App
