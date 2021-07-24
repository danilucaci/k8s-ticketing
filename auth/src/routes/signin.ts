import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.status(200).send("Hello");
});

export { router as signinRouter };
