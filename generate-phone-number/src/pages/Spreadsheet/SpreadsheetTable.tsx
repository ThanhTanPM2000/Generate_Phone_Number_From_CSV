import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { DataTable } from '../../components/common';
import { Spreadsheet } from '../../types';

type Props = {
  spreadsheets: Spreadsheet[];
  loading?: boolean;
  onDelete?: () => void;
  pagination?: {
    total: number; pageSize: number; currentPage: number; onPaginationChange: () => void;
  }

}

const SpreadsheetTable = ({ spreadsheets, loading = false, onDelete, pagination }: Props) => {
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Id',
      }),
      columnHelper.accessor('status', {
        header: 'Status',
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <DataTable columns={columns} data={spreadsheets} loading={loading} pagination={pagination} />;
};

export default SpreadsheetTable;

