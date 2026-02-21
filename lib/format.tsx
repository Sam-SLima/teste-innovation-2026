export const formatPrice = (preco: string | number) => {
  const valor = typeof preco === "string" ? parseFloat(preco) : preco;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};
