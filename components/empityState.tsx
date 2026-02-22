interface Props {
  message?: string;
}

export const EmptyState = ({
  message = "Nenhum produto encontrado",
}: Props) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center text-gray-500">
      <p className="text-lg font-medium text-center">{message}</p>
    </div>
  );
};
