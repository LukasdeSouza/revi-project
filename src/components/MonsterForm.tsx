import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { CreateMonsterData } from '../types/monster';

interface MonsterFormProps {
  onSubmit: (monster: CreateMonsterData) => void;
  onCancel: () => void;
}

const defaultMonster: CreateMonsterData = {
  name: '',
  attack: 50,
  defense: 50,
  speed: 50,
  hp: 100,
  image_url: '',
};

export function MonsterForm({ onSubmit, onCancel }: MonsterFormProps) {
  const [formData, setFormData] = useState<CreateMonsterData>(defaultMonster);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (formData.attack < 1 || formData.attack > 100) {
      newErrors.attack = 'Ataque deve estar entre 1 e 100';
    }

    if (formData.defense < 1 || formData.defense > 100) {
      newErrors.defense = 'Defesa deve estar entre 1 e 100';
    }

    if (formData.speed < 1 || formData.speed > 100) {
      newErrors.speed = 'Velocidade deve estar entre 1 e 100';
    }

    if (formData.hp < 1 || formData.hp > 200) {
      newErrors.hp = 'HP deve estar entre 1 e 200';
    }

    if (!formData.image_url.trim()) {
      newErrors.image_url = 'URL da imagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData(defaultMonster);
    }
  };

  const handleInputChange = (field: keyof CreateMonsterData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="card w-full max-w-md animate-bounce-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Criar Monstro</h2>
          <button
            onClick={onCancel}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`input ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Nome do monstro"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Ataque
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.attack}
                onChange={(e) => handleInputChange('attack', parseInt(e.target.value))}
                className={`input ${errors.attack ? 'border-red-500' : ''}`}
              />
              {errors.attack && (
                <p className="text-red-400 text-sm mt-1">{errors.attack}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Defesa
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.defense}
                onChange={(e) => handleInputChange('defense', parseInt(e.target.value))}
                className={`input ${errors.defense ? 'border-red-500' : ''}`}
              />
              {errors.defense && (
                <p className="text-red-400 text-sm mt-1">{errors.defense}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Velocidade
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.speed}
                onChange={(e) => handleInputChange('speed', parseInt(e.target.value))}
                className={`input ${errors.speed ? 'border-red-500' : ''}`}
              />
              {errors.speed && (
                <p className="text-red-400 text-sm mt-1">{errors.speed}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                HP
              </label>
              <input
                type="number"
                min="1"
                max="200"
                value={formData.hp}
                onChange={(e) => handleInputChange('hp', parseInt(e.target.value))}
                className={`input ${errors.hp ? 'border-red-500' : ''}`}
              />
              {errors.hp && (
                <p className="text-red-400 text-sm mt-1">{errors.hp}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              URL da Imagem
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              className={`input ${errors.image_url ? 'border-red-500' : ''}`}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {errors.image_url && (
              <p className="text-red-400 text-sm mt-1">{errors.image_url}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Criar Monstro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 