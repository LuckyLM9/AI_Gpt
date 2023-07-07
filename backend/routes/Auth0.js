import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import verifyToken from "../middlewares/verifyJWT.js";
import AuthorModel from "../models/AuthorModel.js";
 const authRouter = Router();
 const createJwt = (author) => {
  return jwt.sign(
    {
      id: author._id,
      email: author.email,
      avatar: author.avatar,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "12h",
    }
  );
};
 authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const author = await AuthorModel.findOne({ email: email });
    if (!author) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, author.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(200).send({ token: createJwt(author) });
  } catch (error) {
    next(error);
  }
});
 authRouter.get("/connectedUser", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "not authorized" });
  }
  req.session.destroy();
   return res
    .clearCookie("connect.sid", { path: "/" })
    .status(200)
    .send({ token: createJwt(req.user) });
});
 authRouter.post("/signup", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const emailExists = await AuthorModel.findOne({ email: email });
    if (emailExists) {
      return res.status(409).send({ message: "author already in db" });
    }
    if (!password) {
      return res.status(400).send({ message: "password is required" });
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    const authObj = { ...req.body, password: hashedPassword };
    const author = new AuthorModel(authObj);
    await author.save();
    return res.status(201).send(author);
  } catch (error) {
    next(error);
  }
});
 authRouter.patch(
  "/:id/avatar",
  parser.single("avatarImg"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const author = await AuthorModel.findByIdAndUpdate(id, {
        avatar: req.file.path,
      });
      res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  }
);
 authRouter.get("/me", verifyToken, async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    const { email } = jwt.decode(token);
    const user = await AuthorModel.findOne({ email: email });
    if (!user) {
      res.status(401).json("Invalid email");
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
 export default authRouter;