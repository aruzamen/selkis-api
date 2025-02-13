const express = require("express");
const Topic = require("../model/Topic");
const Tag = require("../model/Tag");
const router = express.Router();

// Create a new Topic with a Tag
router.post("/", async (request, response) => {
  try {
    const { id, name, type, tagId, tag } = request.body;

    // Ensure the tag exists
    const aTag = await Tag.findByPk(tagId);
    var theTagId = undefined;

    if (!aTag && !tag) {
      return response.status(400).json({ error: "Tag not found" });
    }

    theTagId = (!aTag) ? tag.id : aTag.id;

    console.log("---topic---, ", theTagId);

    const topic = await Topic.create({
      id,
      name,
      type,
      tagId: theTagId,
    });

    response.json(topic);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Get all Topics with their Tags
router.get("/", async (request, response) => {
  const topics = await Topic.findAll({ 
    attributes: { exclude: ['tagId'] },
    include: { model: Tag, as: 'tag' }
  });

  response.json(topics);
});

// Get a Topic by ID
router.get("/:id", async (request, response) => {
  const topic = await Topic.findByPk(request.params.id, { include: Tag });
  if (!topic) return response.status(404).json({ error: "Topic not found" });
  response.json(topic);
});

// Delete a Topic by ID
router.delete("/:id", async (request, response) => {
  const deleted = await Topic.destroy({ where: { id: request.params.id } });
  if (!deleted) return response.status(404).json({ error: "Topic not found" });
  response.json({ message: "Topic deleted successfully" });
});

module.exports = router;
