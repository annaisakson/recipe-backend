import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET /recipes: Fetches all recipes from the database
router.get("/", async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /recipes: Creates a new recipe
router.post("/", async (req, res) => {
  try {
    const { title, ingredients, instructions, cookingTime, servings } =
      req.body;

    // Validate required fields
    if (!title || !ingredients || !instructions || !cookingTime || !servings) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        ingredients,
        instructions,
        cookingTime: parseInt(cookingTime),
        servings: parseInt(servings),
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
