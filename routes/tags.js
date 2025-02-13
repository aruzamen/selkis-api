const express = require("express");
const Tag = require("../model/Tag");
const router = express.Router();

// Create a new Tag
router.post("/", async (request, response) => {
  try {
    const { id, value } = request.body;
    const tag = await Tag.create({
      id,
      value,
    });
    response.json(tag);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Get all Tags
router.get("/", async (request, response) => {
  const tags = await Tag.findAll();
  response.json(tags);
});

// Get a Tag by ID
router.get("/:id", async (request, response) => {
  const tag = await Tag.findByPk(request.params.id);
  if (!tag) return response.status(404).json({ error: "Tag not found" });
  response.json(tag);
});

// Delete a Tag by ID
router.delete("/:id", async (request, response) => {
  const deleted = await Tag.destroy({ where: { id: request.params.id } });
  if (!deleted) return response.status(404).json({ error: "Tag not found" });
  response.json({ message: "Tag deleted successfully" });
});

module.exports = router;
