export const setCookie = (cookie: any, value: Object, maxAgeDurationMinutes: number) => {
  cookie.me.value = value;
  cookie.me.path = "/";
  cookie.me.sameSite = "strict";
}

