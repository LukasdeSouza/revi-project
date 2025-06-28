import { useState } from 'react';
import type { Monster } from '../types/monster';

interface MonsterFormProps {
  onMonsterCreated: (monster: Monster) => void;
}

export function MonsterForm({ onMonsterCreated }: MonsterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    attack: 0,
    defense: 0,
    speed: 0,
    hp: 0,
    image_url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMonster: Monster = {
      id: crypto.randomUUID(),
      ...formData
    };
    
    onMonsterCreated(newMonster);
    
    // Reset form
    setFormData({
      name: '',
      attack: 0,
      defense: 0,
      speed: 0,
      hp: 0,
      image_url: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'image_url' ? value : parseInt(value) || 0
    }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastrar Monstro</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Nome do monstro"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ataque</label>
            <input
              type="number"
              name="attack"
              value={formData.attack}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Defesa</label>
            <input
              type="number"
              name="defense"
              value={formData.defense}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Velocidade</label>
            <input
              type="number"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">HP</label>
            <input
              type="number"
              name="hp"
              value={formData.hp}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL da Imagem</label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Cadastrar Monstro
        </button>
      </form>
    </div>
  );
} 