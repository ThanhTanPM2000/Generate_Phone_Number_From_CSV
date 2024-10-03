import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode"
import { isEmpty, isString } from "lodash";

type MeCookie = {
  isLogged: boolean;
  email: string;
  name: string;
  refreshToken: string;
  userId: string;
  picture: string;
  isAdmin: boolean;
};

const defaultMe = {
  isLogged: false,
  isAdmin: false,
  name: "",
  picture: "",
  refreshToken: ""
}

function useAuth() {
  const [cookies] = useCookies(["kitawa_auth"]);
  // console.log({
  //   kitawa_auth: cookies.kitawa_auth,
  //   isAuth: isEmpty({})
  //
  // })
  // return cookies.kitawa_auth as MeCookie
  const me = cookies.kitawa_auth ? {
    ...jwtDecode<MeCookie>(cookies.kitawa_auth),
    isLogged: true,
  } : defaultMe;
  return {
    ...me,
    isAdmin: typeof me?.isAdmin === "string" && me?.isAdmin == "true" ? true : false
  } as MeCookie;
}

export default useAuth;
