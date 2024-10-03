import {
  Flex,
  Image,
  Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, VStack
} from '@chakra-ui/react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import Pagination from './Pagination';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  total: number;
  onPaginationChange: (page: number) => void;
}

interface DataTableProps {
  data: any[];
  columns: any[];
  loading: boolean;
  pagination?: PaginationProps;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, pagination = {
  total: 0,
  pageSize: 0,
  currentPage: 0,
  onPaginationChange: () => { }
}, loading }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
  });

  const { total, pageSize, currentPage, onPaginationChange } = pagination;
  const indexOfLastRow = currentPage * pageSize;
  const indexOfFirstRow = indexOfLastRow - pageSize;
  const isUsingApiPagination = true;
  let currentRows = table.getRowModel().rows;
  currentRows = isUsingApiPagination ? currentRows : currentRows.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <VStack my={5} alignItems="flex-start" gap={5}>
      <Text visibility={loading ? 'hidden' : 'visible'} color="gray" fontSize="md">
        Total rows: {total || 0}
      </Text>
      <Table variant="striped" colorScheme="telegram">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as { isNumeric?: boolean };
                return (
                  <Th
                    textAlign="center"
                    key={header.id}
                    isNumeric={meta?.isNumeric}
                    width={header.getSize()}
                    textTransform="inherit"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        {!loading && (
          <Tbody>
            {currentRows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as { isNumeric?: boolean };
                  return (
                    <Td opacity={loading ? '0.5' : '1'} textAlign="center" key={cell.id} isNumeric={meta?.isNumeric}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
      {data.length === 0 && !loading && (
        <Flex
          display="flex"
          flexDir="column"
          justifyContent="center"
          mt="10"
          alignItems="center"
          width="full"
        >
          {/* <Image height="100px" src="/no-content.png" alt="No content" /> */}
          <Text>No Data In Table</Text>
        </Flex>
      )}
      {loading && (
        <Flex flexDir="column" justifyContent="center" alignItems="center" width="full" gap={5}>
          <Spinner />
          <Text>Loading...</Text>
        </Flex>
      )}
      <Pagination currentPage={currentPage} total={total} pageSize={pageSize} onPaginationChange={onPaginationChange} />
    </VStack>
  );
}

export default DataTable;
