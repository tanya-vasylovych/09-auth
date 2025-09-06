import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearchChange: (value: string) => void;
}

const SearchBox = ({ onSearchChange }: SearchBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
};

export default SearchBox;
