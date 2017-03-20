export const get = async ({ url }) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
			'Accept': 'application/json'
		},
  });
  if(res.status !== 200) {throw res}
  return await res.json();
};
