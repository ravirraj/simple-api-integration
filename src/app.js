import express from 'express';
import postsRouter from './routes/posts.routes.js';



const app = express();


app.use('/posts', postsRouter);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
export default app;
