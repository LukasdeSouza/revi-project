import type { Result } from '../types/result';

const WinnerCard = ({ result }: Result) => {
  return (
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
  )
}

export default WinnerCard