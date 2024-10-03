import { axios } from "./axios";

type LoginResponse = {
  email: string;
  requireEmailVerification?: boolean;
};

export const login = async (code: string): Promise<LoginResponse> => {
  try {
    const res = await axios.post("/auth/login", { code });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post("/auth/logout");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
