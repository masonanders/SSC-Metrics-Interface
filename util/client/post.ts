export default async function post<D>(url: string, data: D) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response.json();
}
