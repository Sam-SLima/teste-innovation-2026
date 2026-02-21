"use client";

import { useProdutos } from "@/hooks/useProdutos";
import { useDebounce } from "@/lib/useDebounce";
import { SearchInput } from "@/components/inputSearch";
import { ProductCard } from "@/components/productCard";
import { Modal } from "@/components/modal";

import { useState } from "react";

const ProdutosPage = () => {
  const [busca, setBusca] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  const debouncedBusca = useDebounce(busca, 400);

  const { data, isLoading, isError, refetch } = useProdutos({
    nome_produto: debouncedBusca,
    codigo_produto: debouncedBusca,
  });

  if (isLoading) return <p>Carregando produtos...</p>;

  if (isError)
    return (
      <p>
        Erro ao carregar produtos.
        <button onClick={() => refetch()}>Tentar novamente</button>
      </p>
    );

  console.log("produto:", produtoSelecionado);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      <SearchInput value={busca} onChange={setBusca} />

      {data?.length === 0 && <p>Nenhum produto encontrado.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setProdutoSelecionado(null);
          }}
        >
          {produtoSelecionado && (
            <>
              <h2 className="text-xl font-bold mb-2">
                {produtoSelecionado.nome}
              </h2>

              <img
                src={produtoSelecionado.imagem}
                alt={produtoSelecionado.nome}
                className="h-40 object-contain mb-4"
              />

              <p>Código: {produtoSelecionado.codigo}</p>

              {produtoSelecionado.descricao && (
                <p className="mt-2 text-sm text-gray-600">
                  {produtoSelecionado.descricao}
                </p>
              )}
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProdutosPage;
