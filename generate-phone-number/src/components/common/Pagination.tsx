import propTypes from 'prop-types';
import _ from 'lodash';
import { ReactElement, useState } from 'react';
import { Button, ButtonGroup, Box, Select, IconButton } from '@chakra-ui/react';
import { BiChevronsRight, BiChevronsLeft, BiDotsHorizontalRounded } from 'react-icons/bi';

type Props = {
  total: number;
  pageSize: number;
  currentPage: number;
  onPaginationChange: (page: number, pageSize: number) => void;
}

const Pagination = ({ total, pageSize, currentPage, onPaginationChange }: Props) => {
  const pagesCount = Math.ceil(total / pageSize);
  if (total === 0 || !total) return null;

  // only show 3 pages at a time
  const maxPages = 3;
  //   const pages = _.range(1, pagesCount + 1);

  const pages = _.range(currentPage - 1, currentPage + maxPages - 1).filter((page) => page > 0 && page <= pagesCount);

  const hanldePaginationChange = (page: number) => {
    onPaginationChange(page, pageSize);
  };

  const handleJumpNextMaxPages = () => {
    if (currentPage < pagesCount - maxPages) {
      onPaginationChange(currentPage + maxPages, pageSize);
    }
  };

  const handleJumpPrevMaxPages = () => {
    if (currentPage >= maxPages) {
      onPaginationChange(currentPage - maxPages, pageSize);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageSize = parseInt(e.target.value);
    onPaginationChange(1, pageSize);
  };

  const handleGotToPage = (page: number) => {
    onPaginationChange(page, pageSize);
  };

  return (
    <Box fontSize="-moz-initial" display="flex" gap={5} my={4}>
      {pagesCount !== 1 && (
        <ButtonGroup spacing={4}>
          {!pages.includes(1) && (
            <Button onClick={() => handleGotToPage(1)} colorScheme="gray" variant="outline">
              1
            </Button>
          )}
          {currentPage >= maxPages && (
            <JumbButton
              colorScheme="gray"
              variant="outline"
              onClick={handleJumpPrevMaxPages}
              icon={<BiChevronsLeft />}
            />
          )}
          {pages.map((page) => (
            <Button
              key={page}
              colorScheme={page === currentPage ? 'primary' : 'gray'}
              variant={page === currentPage ? 'solid' : 'outline'}
              onClick={() => hanldePaginationChange(page)}
            >
              {page}
            </Button>
          ))}
          {currentPage < pagesCount - maxPages && (
            <JumbButton
              colorScheme="gray"
              variant="outline"
              onClick={handleJumpNextMaxPages}
              icon={<BiChevronsRight />}
            />
          )}
          {!pages.includes(pagesCount) && (
            <Button onClick={() => handleGotToPage(pagesCount)} colorScheme="gray" variant="outline">
              {pagesCount}
            </Button>
          )}
        </ButtonGroup>
      )}
      <Select onChange={handlePageSizeChange} width="100px">
        {[1, 2, 3].map((value) => (
          <option key={value} value={value * 10}>
            {value * 10}
          </option>
        ))}
      </Select>
    </Box>
  );
};

type JumbButtonProps = {
  onClick: () => void;
  icon: ReactElement;
  colorScheme?: string;
  variant?: string;
};

const JumbButton = ({ onClick, icon, ...restProps }: JumbButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <IconButton
      aria-label=''
      icon={isHover ? icon : <BiDotsHorizontalRounded />}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      colorScheme="gray"
      variant="outline"
      onClick={onClick}
      {...restProps}
    />
  );
};

Pagination.propTypes = {
  total: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPaginationChange: propTypes.func.isRequired,
};

export default Pagination;
