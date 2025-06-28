import type { Monster } from '../types/monster';

interface MonsterCardProps {
  monster: Monster;
  onSelect?: (monster: Monster) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
}

export function MonsterCard({ monster, onSelect, isSelected = false, isDisabled = false }: MonsterCardProps) {
  const handleClick = () => {
    if (!isDisabled && onSelect) {
      onSelect(monster);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-white/10 backdrop-blur-sm border rounded-xl p-4 shadow-xl cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'border-purple-500 bg-purple-500/20 scale-105' 
          : 'border-white/20 hover:scale-105 hover:bg-white/20'
        }
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <div className="flex items-center space-x-4">
        <img
          src={monster.image_url}
          alt={monster.name}
          className="w-16 h-16 rounded-lg object-cover border border-white/20"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/64x64/6b7280/ffffff?text=?';
          }}
        />
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">{monster.name}</h3>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-red-400">⚔️</span>
              <span>{monster.attack}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-blue-400">🛡️</span>
              <span>{monster.defense}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-green-400">⚡</span>
              <span>{monster.speed}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">❤️</span>
              <span>{monster.hp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 