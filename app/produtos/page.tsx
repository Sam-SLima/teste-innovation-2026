"use client";

import { useProdutos } from "@/hooks/useProdutos";
import { useDebounce } from "@/lib/useDebounce";
import { ProductCard } from "@/components/productCard";
import { Modal } from "@/components/modal";
import { Header } from "@/components/header";
import { formatPrice } from "@/lib/format";
import { Produto } from "../types/produto";
import { SkeletonGrid } from "@/components/skeletonGrid";
import { EmptyState } from "@/components/empityState";

import { useState, useRef, useEffect, useMemo } from "react";
import { useFavoritosStore } from "@/store/favoritosStore";

const ITEMS_PER_PAGE = 10;

const ProdutosPage = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [page, setPage] = useState(1);
  const [ordenacao, setOrdenacao] = useState("nome-asc");
  const [isOpen, setIsOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null,
  );
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const { favoritos } = useFavoritosStore();

  const debouncedNome = useDebounce(nome, 400);
  const debouncedCodigo = useDebounce(codigo, 400);

  const { data, isLoading, isError, refetch } = useProdutos({
    nome_produto: debouncedNome,
    codigo_produto: debouncedCodigo,
  });

  const produtosFiltrados = useMemo(() => {
    if (!data) return [];
    return data.filter((p) =>
      mostrarFavoritos ? favoritos.includes(String(p.codigo)) : true,
    );
  }, [data, mostrarFavoritos, favoritos]);

  const produtosOrdenados = useMemo(() => {
    return [...produtosFiltrados].sort((a, b) => {
      switch (ordenacao) {
        case "nome-asc":
          return a.nome.localeCompare(b.nome);
        case "nome-desc":
          return b.nome.localeCompare(a.nome);
        case "preco-asc":
          return Number(a.preco) - Number(b.preco);
        case "preco-desc":
          return Number(b.preco) - Number(a.preco);
        default:
          return 0;
      }
    });
  }, [produtosFiltrados, ordenacao]);

  const produtosVisiveis = useMemo(() => {
    return produtosOrdenados.slice(0, page * ITEMS_PER_PAGE);
  }, [produtosOrdenados, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedNome, debouncedCodigo, ordenacao, mostrarFavoritos]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          produtosVisiveis.length < produtosOrdenados.length
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [produtosVisiveis.length, produtosOrdenados.length]);

  if (isLoading)
    return (
      <div className="p-10">
        <SkeletonGrid />
      </div>
    );

  if (isError)
    return (
      <div className="text-center mt-20">
        <p className="mb-4 text-red-500">Erro ao carregar produtos</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Tentar novamente
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      <Header />

      <div className="flex flex-wrap gap-4 p-7">
        <input
          placeholder="Buscar por nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm outline-none"
        />

        <input
          placeholder="Buscar por código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm outline-none"
        />

        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all outline-none duration-200 py-3 px-5"
        >
          <option value="nome-asc">Nome A → Z</option>
          <option value="nome-desc">Nome Z → A</option>
          <option value="preco-asc">Preço ↑</option>
          <option value="preco-desc">Preço ↓</option>
        </select>

        <button
          onClick={() => setMostrarFavoritos((v) => !v)}
          className={`px-4 py-3 rounded-lg border ${
            mostrarFavoritos
              ? "bg-black text-white"
              : "bg-white border-gray-200"
          }`}
        >
          Mostrar favoritos
        </button>
      </div>

      <div className="max-w-[1320px] mx-auto px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-10">
          {produtosVisiveis.length === 0 ? (
            <EmptyState />
          ) : (
            produtosVisiveis.map((produto) => (
              <ProductCard
                key={produto.codigo}
                produto={produto}
                onOpen={() => {
                  setProdutoSelecionado(produto);
                  setIsOpen(true);
                }}
              />
            ))
          )}
        </div>

        <div ref={loadMoreRef} className="h-10" />

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

              <p className="mb-2">{produtoSelecionado.descricao}</p>

              <p className="text-lg font-bold">
                R${" "}
                {produtoSelecionado.preco
                  ? formatPrice(produtoSelecionado.preco)
                  : "0,00"}
              </p>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProdutosPage;
