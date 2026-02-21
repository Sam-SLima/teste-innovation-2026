interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Buscar por nome ou código..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg p-2 mb-6"
    />
  );
};
