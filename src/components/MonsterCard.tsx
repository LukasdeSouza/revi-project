import { Sword, Shield, Zap, Heart, Trash2 } from 'lucide-react';
import type { Monster } from '../types/monster';

interface MonsterCardProps {
  monster: Monster;
  onSelect?: (monster: Monster) => void;
  onDelete?: (id: string) => void;
  isSelected?: boolean;
  isSelectable?: boolean;
}

export function MonsterCard({ 
  monster, 
  onSelect, 
  onDelete, 
  isSelected = false,
  isSelectable = false 
}: MonsterCardProps) {
  const handleClick = () => {
    if (isSelectable && onSelect) {
      onSelect(monster);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(monster.id);
    }
  };

  return (
    <div
      className={`monster-card relative ${
        isSelectable ? 'cursor-pointer' : ''
      } ${
        isSelected 
          ? 'ring-2 ring-primary-500 bg-primary-500/20' 
          : 'hover:bg-white/20'
      }`}
      onClick={handleClick}
    >
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors z-10"
          title="Deletar monstro"
        >
          <Trash2 size={16} />
        </button>
      )}

      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          {monster.image_url ? (
            <img
              src={monster.image_url}
              alt={monster.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className="text-4xl font-bold text-white hidden">
            {monster.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-3">{monster.name}</h3>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="flex items-center gap-2 text-sm">
            <Sword className="text-red-400" size={16} />
            <span className="text-white/80">{monster.attack}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Shield className="text-blue-400" size={16} />
            <span className="text-white/80">{monster.defense}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Zap className="text-yellow-400" size={16} />
            <span className="text-white/80">{monster.speed}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Heart className="text-green-400" size={16} />
            <span className="text-white/80">{monster.hp}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 