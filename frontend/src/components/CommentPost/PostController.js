import asyncHandler from "express-async-handler";
import Post from "../../models/post/Post.js";
import { cloudinaryUploadImage } from "../../utils/coudinary.js";
import fs from "fs";
import { validateMongodbId } from "../../utils/vakidateMongoDbId.js";
export const createPost = asyncHandler(async (req, res) => {
  const localPath = `public/images/posts/${req.file.filename}`;
  const imgUpload = await cloudinaryUploadImage(localPath);
  try {
    const post = await Post.create({
      image: imgUpload.url,
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    });
    res.json(post);
    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
});

export const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

export const getSinglePosts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("comments")
      .populate("likes")
      .populate("disLikes");

    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, category, user } = req.body;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        title: title,
        description: description,
        category: category,
        user: user,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    await Post.findByIdAndDelete(id);
    res.json("پست با موفقیت حذف شد.");
  } catch (error) {
    res.json(error);
  }
});

export const toggleLikePost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  const loginUserId = req.userId;
  const isLiked = post.isLike;

  const alreadyDisliked = post.disLikes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }

  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLike: false,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLike: true,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }
});

export const toggleDisLikePost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  const loginUserId = req.userId;
  const isDisLiked = post.isDisLiked;

  const alreadyLiked = post.likes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  if (alreadyLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLike: false,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }

  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: flase,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }
});
