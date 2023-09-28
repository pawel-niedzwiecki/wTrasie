import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { query } = req.query;
  const encodedQuery = encodeURIComponent(query);

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 19c47f0f98f4d55c468e01dda85f482c5b5fdf14f582c7f4f60a085a1926964c',
    },
  };

  try {
    const meiliSearchResponse = await fetch(`https://ms-9ae19e2142f7-5386.fra.meilisearch.io/indexes/article/search?q=${encodedQuery}&sort=createdAt:desc&limit=20`, options);
    const data = await meiliSearchResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
