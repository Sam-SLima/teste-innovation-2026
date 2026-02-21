"use client";

import { useProdutos } from "@/hooks/useProdutos";
import { useDebounce } from "@/lib/useDebounce";
import { ProductCard } from "@/components/productCard";
import { Modal } from "@/components/modal";
import { Header } from "@/components/header";
import { formatPrice } from "@/lib/format";
import { useState } from "react";

const ProdutosPage = () => {
  const [busca, setBusca] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  const debouncedBusca = useDebounce(busca, 400);

  const { data, isLoading, isError } = useProdutos({
    nome_produto: debouncedBusca,
    codigo_produto: debouncedBusca,
  });

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar</p>;

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      <Header />

      <div className="max-w-[1320px] mx-auto px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-10">
          {data?.map((produto: any) => (
            <ProductCard
              key={produto.codigo}
              produto={produto}
              onOpen={() => {
                setProdutoSelecionado(produto);
                setIsOpen(true);
              }}
            />
          ))}
        </div>

        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setProdutoSelecionado(null);
          }}
        >
          {produtoSelecionado && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {produtoSelecionado.nome}
              </h2>

              <img
                src={produtoSelecionado.imagem}
                alt={produtoSelecionado.nome}
                className="h-56 object-contain mx-auto mb-6"
              />

              <p className="text-sm text-gray-600 mb-2">
                Código: {produtoSelecionado.codigo}
              </p>
              <p className="mb-2">{produtoSelecionado?.descricao}</p>
              <p className="text-lg font-bold">
                R${" "}
                {produtoSelecionado.preco
                  ? formatPrice(produtoSelecionado.preco)
                  : "R$ 0,00"}
              </p>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProdutosPage;
