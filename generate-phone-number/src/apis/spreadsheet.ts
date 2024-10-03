import { axios } from "./axios"

export const getSpreadsheet = async (page = 1, size = 10, isGettingAll = false, search = "") => {
  try {
    const response = await axios.get(`/spreadsheets?page=${page}&size=${size}&isGettingAll=${isGettingAll}&search=${search}`);
    return response.data;
  } catch (error) {
    console.log("error at get spreadsheets")
  }
}

export const addSpreadsheet = async (title: string, spreadsheetId: string, sheetName: string, headerRowIndex: number) => {
  try {
    const response = await axios.post("/spreadsheets", {
      title,
      spreadsheetId,
      headerRowIndex,
      sheetName
    })

    return response?.data
  } catch (error) {
    console.log("error at add spreadsheet ", error)
  }
}
