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

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.attack > 0 &&
    formData.defense > 0 &&
    formData.speed > 0 &&
    formData.hp > 0 &&
    formData.image_url.trim() !== '';

  return (
    <div className="bg-white backdrop-blur-sm border-4 border-white/20 rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl">Cadastrar Monstro</h2>
      <span >preencha todas as infos abaixo para criar um novo monstro.</span>
      <hr className="mt-4 bg-slate-200 h-px border-0 rounded" />
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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
          disabled={!isFormValid}
          className={`w-full h-12 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-white
            ${!isFormValid ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : 'text-white'}
          `}
          style={isFormValid ? {
            background: 'linear-gradient(90deg, rgb(74, 143, 255) 0%, rgb(10, 84, 206) 100%)',
            boxShadow: '0 2px 8px 0 #2563eb22',
          } : {}}
        >
          Cadastrar Monstro
        </button>
      </form>
    </div>
  );
} 