import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const cache = {
  posts: null,
  users: null,
  lastFetchedAt: null
};

async function fetchFromApi(endpoint) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      timeout: 5000
    });

    if (!Array.isArray(response.data)) {
      const error = new Error('Invalid response format: expected an array');
      error.status = 502;
      throw error;
    }

    return response.data;
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      const error = new Error('Request to upstream API timed out');
      error.status = 504;
      throw error;
    }

    if (err.response) {
      const error = new Error(
        `Upstream API responded with status ${err.response.status}`
      );
      error.status = 502;
      throw error;
    }

    const error = new Error('Failed to reach upstream API');
    error.status = 503;
    throw error;
  }
}

async function ensureCache() {
  if (cache.posts && cache.users) return;

  const [posts, users] = await Promise.all([
    fetchFromApi('/posts'),
    fetchFromApi('/users')
  ]);

  cache.posts = posts.filter(
    (p) => p && typeof p.id === 'number' && typeof p.userId === 'number'
  );
  cache.users = users.filter((u) => u && typeof u.id === 'number');

  cache.lastFetchedAt = new Date().toISOString();
}

async function getPosts({ userId, search }) {
  await ensureCache();

  let filtered = cache.posts;

  if (userId !== undefined) {
    const userIdNum = Number(userId);
    if (Number.isNaN(userIdNum)) {
      const error = new Error('userId must be a number');
      error.status = 400;
      throw error;
    }
    filtered = filtered.filter((p) => p.userId === userIdNum);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.body && p.body.toLowerCase().includes(q))
    );
  }

  return {
    count: filtered.length,
    lastFetchedAt: cache.lastFetchedAt,
    data: filtered
  };
}

async function getPostById(id) {
  await ensureCache();

  const idNum = Number(id);
  if (Number.isNaN(idNum)) {
    const error = new Error('id must be a number');
    error.status = 400;
    throw error;
  }

  const post = cache.posts.find((p) => p.id === idNum);
  if (!post) {
    const error = new Error('Post not found');
    error.status = 404;
    throw error;
  }

  const user = cache.users.find((u) => u.id === post.userId);

  return {
    id: post.id,
    title: post.title,
    body: post.body,
    userId: post.userId,
    user: user
      ? {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          company: user.company
        }
      : null,
    lastFetchedAt: cache.lastFetchedAt
  };
}

export { getPosts, getPostById };