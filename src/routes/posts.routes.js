import express from "express";
import { getPosts, getPostById } from "../services/jsonPlaceHolderApi.js";

const router = express.Router();

// GET /posts
router.get("/", async (req, res) => {
  try {
    const { userId, search } = req.query;
    const result = await getPosts({ userId, search });
    res.json(result);
  } catch (err) {
    console.error("Error in GET /posts:", err);
    res.status(err.status || 500).json({
      error: err.message || "Something went wrong",
    });
  }
});

// GET /posts/:id
router.get("/:id", async (req, res) => {
  try {
    const result = await getPostById(req.params.id);
    res.json(result);
  } catch (err) {
    console.error("Error in GET /posts/:id:", err);
    res.status(err.status || 500).json({
      error: err.message || "Something went wrong",
    });
  }
});

export default router;
