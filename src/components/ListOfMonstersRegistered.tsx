import ChipAmountOfMonsters from './Chip'
import type { Monster } from '../types/monster'
import { MonsterCard } from './MonsterCard'

const ListOfMonstersRegistered = (
  { selectedMonster1, selectedMonster2, monsters }:
    { selectedMonster1: Monster | null, selectedMonster2: Monster | null, monsters: Monster[] }) => {
      
  return (
    <div className="flex-1 min-w-[320px]">
      <ChipAmountOfMonsters monsters={monsters} />

      <h2 className="text-2xl text-gray-800">Monstros Cadastrados</h2>
      <span className='mb-4'>veja abaixo todos os monstros cadastrados</span>
      {monsters.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
          <p className="text-gray-500">Nenhum monstro cadastrado ainda.</p>
          <p className="text-gray-400 text-sm mt-2">Cadastre um monstro para começar!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
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
  )
}

export default ListOfMonstersRegistered