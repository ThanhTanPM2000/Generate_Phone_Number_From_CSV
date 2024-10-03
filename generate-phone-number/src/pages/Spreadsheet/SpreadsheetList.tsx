import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchBar } from "../../components/common";
import SpreadsheetTable from "./SpreadsheetTable";
import * as apis from "../../apis"
import AddSpreadsheetModal from "./AddSpreadsheetModal";

const SpreadsheetList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const spreadSheetQuery = useQuery({
    queryKey: ["getSpreadsheets", page, pageSize, search],
    queryFn: () => apis.spreadsheet.getSpreadsheet(page, pageSize, false, search),
  });

  const addSpreadsheetMutation = useMutation({
    mutationFn: ({ title, spreadsheetId, sheetName, headerRowIndex }: {
      title: string, spreadsheetId: string, sheetName: string, headerRowIndex: number
    }) => {
      console.log({ title, spreadsheetId, sheetName, headerRowIndex })
      return apis.spreadsheet.addSpreadsheet(title, spreadsheetId, sheetName, headerRowIndex);
    },
  })


  return (
    <>
      <Box display={{ md: "flex" }} gap={{ md: "1" }}>
        <SearchBar />
        <Button onClick={() => setIsOpen(true)} bg="primary" color="white">
          Add New Spreadsheet
        </Button>
        <AddSpreadsheetModal
          isCreating={addSpreadsheetMutation.isPending}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCreate={addSpreadsheetMutation.mutate}
        />
      </Box>
      <SpreadsheetTable spreadsheets={[]} />
    </>
  )
}

export default SpreadsheetList;
