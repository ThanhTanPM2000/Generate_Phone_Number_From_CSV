import db from "../database/prisma.setup"

export const getSpreadsheets = async (page = 1, size = 10, isGettingAll = false, search = "") => {
  try {
    const spreadsheets = await db.spreadSheet.findMany({
      where: {
        OR: [{
          title: {
            contains: search?.trim().toLowerCase(),
            mode: "insensitive"
          }
        }]
      },
      ...(!isGettingAll && { skip: (page - 1) * size }),
      ...(!isGettingAll && { take: size }),
    })

    const total = await db.spreadSheet.count({
      where: {
        OR: [
          {
            title: {
              contains: search?.trim().toLowerCase(),
              mode: "insensitive"
            }
          }
        ]
      }
    })

    return {
      data: spreadsheets,
      page,
      size,
      total
    }
  } catch (error) {
    throw error;
  }
}

export const addSpreadsheet = async (userId: string, title: string, spreadsheetId: string, headerRowIndex = 1, sheetName = "Sheet1") => {
  try {
    const newSpreadsheet = await db.spreadSheet.create({
      data: {
        userId,
        title,
        spreadsheetId,
        sheetName,
        headerRowIndex
      }
    })

    return newSpreadsheet;
  } catch (error) {
    throw error;
  }
}
