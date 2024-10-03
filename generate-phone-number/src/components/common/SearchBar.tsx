import { useEffect, useState } from 'react';
import { Button, Input, InputGroup, InputLeftElement, InputRightAddon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';


interface SearchBarProps {
  onSearch?: (searchText: string) => void;
  onChange?: (searchText: string) => void;
}

const SearchBar = ({ onSearch = () => { }, onChange = () => { }, ...rest }: SearchBarProps) => {
  // const searchRef = useRef();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const test = setTimeout(() => {
      // onSearch(search);
      onChange(search);
    }, 500);
    return () => {
      clearTimeout(test);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = () => {
    onSearch(search);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <InputGroup borderRadius={5} w="700px" {...rest}>
      <InputLeftElement pointerEvents="none">
        <FiSearch color="gray.600" />
      </InputLeftElement>
      <Input
        onChange={handleSearchChange}
        type="text"
        placeholder="Search..."
        border="1px solid #949494"
      />
      <InputRightAddon p={0} border="none">
        <Button
          bg="primary"
          color="white"
          onClick={handleSearch}
          borderLeftRadius={0}
          borderRightRadius={3.3}
          border="1px solid #949494"
        >
          Search
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
};

export default SearchBar;
