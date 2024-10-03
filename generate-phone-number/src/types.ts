export type Me = {
  id: string;
  email: string;
  picture: string;
  isAdmin: boolean;
  userStatus: "ONLINE" | "OFFLINE";
};

export type Spreadsheet = {
  id: string;
  title: string;
  userId: string;
  spreadsheetId: string;
  sheetName?: string
  headerRowIndex: number;
  isActive: boolean;
}
