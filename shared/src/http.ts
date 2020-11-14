import "isomorphic-fetch";

type Method = "GET" | "POST";

const mkRequest = (method: Method) => <T>(
  url: string,
  options: Omit<RequestInit, "url" | "method"> = {}
): Promise<T> =>
  fetch(url, {
    ...options,
    method,
    headers: { "Content-Type": "application/json", ...options.headers },
  }).then(async (res) =>
    res.ok
      ? res.json()
      : Promise.reject(new Error((await res.json()).message || "Error"))
  );

const get = mkRequest("GET");
const post = mkRequest("POST");

export { get, post };
