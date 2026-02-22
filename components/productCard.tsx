import { formatPrice } from "@/lib/format";
import { useFavoritosStore } from "@/store/favoritosStore";

import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";

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
    <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col">
      <span className="absolute top-3 left-3 text-[10px] font-bold text-cyan-600">
        EXCLUSIVO!
      </span>

      <button
        type="button"
        onClick={() => toggleFavorito(produto.codigo)}
        className="absolute top-3 right-3 text-lg"
      >
        {isFavorito ? <Favorite /> : <FavoriteBorderOutlined />}
      </button>

      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="h-44 object-contain mx-auto mb-4"
        />
      </div>

      <h2 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
        {produto.nome}
      </h2>

      <p className="text-xs text-gray-500 mb-2">{produto.codigo}</p>

      <p className="text-base font-bold text-gray-900 mb-4">
        {formatPrice(produto.preco)}
      </p>

      <button
        type="button"
        onClick={onOpen}
        className="mt-auto bg-[#8DC63F] hover:bg-[#7ab52f] transition-colors text-white py-2 rounded-md text-sm font-semibold"
      >
        CONFIRA
      </button>
    </div>
  );
};
