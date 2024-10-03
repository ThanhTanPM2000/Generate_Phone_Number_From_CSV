import { google } from "googleapis"
import { axios } from "./axios";

export const fetchData = async () => {
  try {
    const response = await axios.get("/retrieve-phone-number");
    return response.data;
  } catch (error) {
    console.log({ error })
  }
}

export const updateData = async () => {
  try {
    const response = await axios.post("/update-phone-number", {
      status: "hi"
    });
    return response.data;
  } catch (error) {
    console.log({ error })

  }
}
