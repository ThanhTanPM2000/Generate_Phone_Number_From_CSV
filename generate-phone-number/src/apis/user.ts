import { axios } from "./axios";

export const me = async () => {
  try {
    const response = await axios.get("/me");
    return response.data
  } catch (error) {
    console.log({ error })
    throw error;
  }
}
