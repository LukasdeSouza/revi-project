import type { Monster } from '../types/monster';

const ChipAmountOfMonsters = ({ monsters }: { monsters: Monster[] }) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-blue-700 text-sm font-semibold shadow-sm">
        <span className="mr-2">{monsters.length} monstros</span>
        <div className="flex -space-x-2">
          {monsters.slice(0, 5).map((monster: Monster) => (
            <img
              key={monster.id}
              src={monster.image_url}
              alt={monster.name}
              className="w-6 h-6 rounded-full border-2 border-white object-cover bg-gray-100"
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/24x24/6b7280/ffffff?text=?';
              }}
            />
          ))}
          {monsters.length > 5 && (
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-xs font-bold border-2 border-white">+{monsters.length - 5}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChipAmountOfMonsters