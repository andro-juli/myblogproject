const express = require("express");

const app = express();

app.use(express.json());

const PORT = 7005;

const blog = [];

// GET, POST, DELETE, PUT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// GET
app.get("/project/blog", (req, res, next) => {
  res.status(200).json({
    status: "success",
    code: 200,
    data: blog,
  });
});

// POST
app.post("/project/blog", (req, res, next) => {
  const { post } = req.body;

  const blogExist = blog.find((element) => element.post === post);
  if (blogExist) {
    return res.status(409).json({
      status: "error",
      message: "Blog already exist",
      code: 409,
      data: null,
    });
  }
  blog.push(req.body);

  return res.status(201).json({
    status: "success",
    message: "Blog Post successful",
    code: 201,
    data: blog,
  });
});

// PUT, for updating
app.put("/project/blog/:id", (req, res, next) => {
  const { id } = req.params;
  const { post, url, title, author } = req.body;
  const blogIndex = blog.findIndex((element) => element.id === id);
  if (blogIndex >= 0) {
    blog[blogIndex] = {
      ...blog[blogIndex],
      post,
      url,
      title,
      author,
    };

    return res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      code: 200,
      data: blog,
    });
  }

  return res.status(400).json({
    status: "error",
    message: "Blog not found",
    code: 400,
    data: null,
  });
});

// DELETE
app.delete("/project/blog/:id", (req, res, next) => {
  const { id } = req.params;
  const blogIndex = blog.findIndex((element) => element.id === id);
  if (blogIndex >= 0) {
    blog.splice(blogIndex, 1);
    return res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
      code: 200,
      data: blog,
    });
  }

  return res.status(400).json({
    status: "error",
    message: "Blog Post not fount",
    code: 400,
    data: null,
  });
});
