import Cookies from 'js-cookie';


interface TypeDataKCookies {
  key: string;
  value: string;
  expires?: number;
  path?: string;
  security?: boolean;
  sameSite?: boolean;
}


export function setCookie({ key, value, expires, path = "/",security,sameSite }: TypeDataKCookies): void {
  Cookies.set(key, value, {
    expires: expires ? expires / 24 : undefined, // Converte horas para dias, se definido
    path,
    secure: security? true : false,
    sameSite: sameSite? "Strict" : undefined,
  });
}

export function getCookie(key: string): string | undefined {
  return Cookies.get(key);
}

export function removeCookie(key: string, path: string = "/"): void {
  Cookies.remove(key, { path });
}

