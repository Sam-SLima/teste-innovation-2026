import { formatPrice } from "@/lib/format";
import { useFavoritosStore } from "@/store/favoritosStore";

interface Produto {
  codigo: string;
  nome: string;
  imagem: string;
  preco: string;
  descricao: string;
}

interface Props {
  produto: Produto;
  onOpen: () => void;
}

export const ProductCard = ({ produto, onOpen }: Props) => {
  const { favoritos, toggleFavorito } = useFavoritosStore();
  const isFavorito = favoritos.includes(produto.codigo);

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 flex flex-col">
      <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
        EXCLUSIVO!
      </span>

      <button
        onClick={() => toggleFavorito(produto.codigo)}
        className="absolute top-2 right-2"
      >
        {isFavorito ? "❤️" : "🤍"}
      </button>

      <img
        src={produto.imagem}
        alt={produto.nome}
        className="h-40 object-contain mb-4"
      />

      <h2 className="font-semibold text-sm mb-1">{produto.nome}</h2>

      <p className="text-xs text-gray-500 mb-2">Código: {produto.codigo}</p>

      <p className="font-bold text-lg mb-3">{formatPrice(produto.preco)}</p>

      <button
        onClick={onOpen}
        className="mt-auto bg-black text-white py-2 rounded"
      >
        CONFIRA
      </button>
    </div>
  );
};
