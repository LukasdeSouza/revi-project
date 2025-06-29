import type { BattleResult } from '../types/monster';

interface BattleResultProps {
  result: BattleResult;
  onClose: () => void;
}

export function BattleResult({ result, onClose }: BattleResultProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-100 border border-white/20 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900">Resultado da Batalha</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 mb-6 shadow-md">
          <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">Vencedor</h3>
          <div className="flex items-center justify-center space-x-4">
            <img
              src={result.winner.image_url}
              alt={result.winner.name}
              className="w-20 h-20 rounded-lg object-cover border border-green-500/50"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/80x80/6b7280/ffffff?text=?';
              }}
            />
            <div className="text-center">
              <h4 className="text-xl font-bold text-slate-800 text-left">{result.winner.name}</h4>
              <p className="text-green-400">HP restante: {result.winner.hp}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 mb-6 shadow-md">
          <h3 className="text-2xl font-bold text-red-400 mb-4 text-center">Perdedor</h3>
          <div className="flex items-center justify-center space-x-4">
            <img
              src={result.loser.image_url}
              alt={result.loser.name}
              className="w-20 h-20 rounded-lg object-cover border border-red-500/50 opacity-50"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/80x80/6b7280/ffffff?text=?';
              }}
            />
            <div className="text-center">
              <h4 className="text-xl font-bold text-slate-900 text-left">{result.loser.name}</h4>
              <p className="text-red-400">HP final: 0</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">Estatísticas da Batalha</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-black/70">Total de Rounds</p>
              <p className="text-2xl font-bold text-slate-600">{result.totalRounds}</p>
            </div>
            <div>
              <p className="text-black/70">Duração</p>
              <p className="text-2xl font-bold text-slate-600">{result.totalRounds} rounds</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 border border-slate-300 rounded-xl p-4">
          <h3 className="text-xl font-bold text-slate-800 mb-4 text-center"> Detalhes dos Rounds</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {result.rounds.map((round, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-black/70">Round {index + 1}</span>
                  <span className="text-sm font-bold text-red-400">Dano: {round.damage}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <img
                      src={round.attacker.image_url}
                      alt={round.attacker.name}
                      className="w-6 h-6 rounded object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/24x24/6b7280/ffffff?text=?';
                      }}
                    />
                    <span className="text-green-400">{round.attacker.name}</span>
                    <span className="text-white/50">→</span>
                    <img
                      src={round.defender.image_url}
                      alt={round.defender.name}
                      className="w-6 h-6 rounded object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/24x24/6b7280/ffffff?text=?';
                      }}
                    />
                    <span className="text-red-400">{round.defender.name}</span>
                  </div>
                  <span className="text-green-700/70">HP: {round.defenderHpAfter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
} 