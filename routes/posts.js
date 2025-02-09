const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/create", async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ message: "El título y mensaje es obligatorio" });
    }

    const newPost = await Post.create({ title, body });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el Post", error });
  }
});

router.get('/', async (req, res) => {
  try {
      const posts = await Post.find();
      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ message: "Error obteniendo los posts", error });
  }
});

router.get('/id/:_id', async (req, res) => {
  try {
      const post = await Post.findById(req.params._id);
      if (!post) {
          return res.status(404).json({ message: "Post no encontrado" });
      }
      res.status(200).json(post);
  } catch (error) {
      res.status(500).json({ message: "Error buscando el post", error });
  }
});

router.get('/title/:title', async (req, res) => {
  try {
      const post = await Post.findOne({ title: req.params.title });
      if (!post) {
          return res.status(404).json({ message: "Post no encontrado" });
      }
      res.status(200).json(post);
  } catch (error) {
      res.status(500).json({ message: "Error buscando el post", error });
  }
});

router.put('/id/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: 'Titulo y mensaje deben existir' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { title, body },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error actualizando el post' });
  }
});


router.delete('/id/:_id', async (req, res) => {
  try {
    
    const { _id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(_id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json({ message: 'Post eliminido exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando el post' });
  }
});


module.exports = router;