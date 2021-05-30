/**
 * Sveltekit load shorthand for JSON data endpoints
 */
 export async function loadData(endpoint: string, fetch: any) {
  const res = await fetch(endpoint);

  if (!res.ok) {
    return res.status === 404
      ? undefined
      : {
          status: res.status,
          error: res.statusText
        };
  }

  return {
    props: await res.json()
  };
}
