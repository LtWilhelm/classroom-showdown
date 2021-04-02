export const slimGet = async (url: string) => await (await fetch(url)).json();

export const slimPut = async <T>(url: string, data?: T) => await (await fetch(url, {
  body: JSON.stringify(data),
  method: 'PUT'
}))

export const slimPost = async <T>(url: string, data?: T) => await (await fetch(url, {
  body: JSON.stringify(data),
  method: 'POST'
}))