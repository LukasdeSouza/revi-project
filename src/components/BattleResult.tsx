import { Trophy, X, Zap, Heart } from 'lucide-react';
import type { BattleResult } from '../types/monster';

interface BattleResultProps {
  result: BattleResult;
  onClose: () => void;
}

export function BattleResult({ result, onClose }: BattleResultProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="card w-full max-w-4xl animate-bounce-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-yellow-400" size={28} />
            Resultado da Batalha
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Vencedor */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl px-6 py-4">
            <Trophy className="text-yellow-400" size={32} />
            <div>
              <h3 className="text-xl font-bold text-white">{result.winner.name}</h3>
              <p className="text-yellow-400 font-medium">Vencedor!</p>
            </div>
          </div>
        </div>

        {/* Resumo da batalha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card bg-red-500/10 border-red-500/30">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="text-red-400" size={20} />
              {result.loser.name}
            </h4>
            <p className="text-red-400 font-medium">Derrotado</p>
          </div>

          <div className="card bg-blue-500/10 border-blue-500/30">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Heart className="text-blue-400" size={20} />
              Estatísticas
            </h4>
            <p className="text-white/80">Total de rounds: {result.totalRounds}</p>
          </div>
        </div>

        {/* Detalhes dos rounds */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white">Detalhes da Batalha</h4>
          <div className="max-h-64 overflow-y-auto space-y-3">
            {result.rounds.map((round, index) => (
              <div
                key={round.round}
                className={`card transition-all duration-300 ${
                  index === result.rounds.length - 1 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white/60">
                      Round {round.round}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {round.attacker.name}
                      </span>
                      <Zap className="text-yellow-400" size={16} />
                      <span className="text-white font-medium">
                        {round.defender.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-bold">
                      -{round.damage}
                    </span>
                    <span className="text-white/60 text-sm">
                      HP: {round.defenderHpAfter}
                    </span>
                  </div>
                </div>
                
                {round.defenderHpAfter <= 0 && (
                  <div className="mt-2 text-green-400 font-medium text-sm">
                    ⚡ {round.defender.name} foi derrotado!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            onClick={onClose}
            className="btn-primary"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
} 