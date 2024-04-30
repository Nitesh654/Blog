function handleFormSubmit(event) {
  event.preventDefault();
  const blogDetails = {
    imageUrl: event.target.imageUrl.value,
    title: event.target.title.value,
    blogDescription: event.target.blogDescription.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/106fb1c1ede94de28e9521301ad267ba/blogData",
      blogDetails
    )
    .then((response) => {
      displayBlogOnScreen(response.data);
      updateTotalBlogs();
    })
    .catch((error) => console.log(error));

  document.getElementById("imageUrl").value = "";
  document.getElementById("title").value = "";
  document.getElementById("blogDescription").value = "";
}

function displayBlogOnScreen(blogDetails) {
  const blogItem = document.createElement("li");

  const title = document.createElement("h2");
  title.textContent = blogDetails.title;
  blogItem.appendChild(title);

  const image = document.createElement("img");
  image.src = blogDetails.imageUrl;
  image.alt = "Blog Image";
  image.style.width = "200px";
  blogItem.appendChild(image);

  const description = document.createElement("p");
  description.textContent = blogDetails.blogDescription;
  blogItem.appendChild(description);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  blogItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  blogItem.appendChild(editBtn);

  const blogList = document.getElementById("blogList");
  blogList.appendChild(blogItem);

  deleteBtn.addEventListener("click", function (event) {
    blogList.removeChild(event.target.parentElement);
    deleteBlog(blogDetails._id);
    updateTotalBlogs();
  });

  editBtn.addEventListener("click", function (event) {
    blogList.removeChild(event.target.parentElement);
    deleteBlog(blogDetails._id);
    document.getElementById("imageUrl").value = blogDetails.imageUrl;
    document.getElementById("title").value = blogDetails.title;
    document.getElementById("blogDescription").value = blogDetails.blogDescription;
  });
}

function deleteBlog(blogId) {
  axios
    .delete(
      `https://crudcrud.com/api/106fb1c1ede94de28e9521301ad267ba/blogData/${blogId}`
    )
    .catch((error) => console.log(error));
}

function updateTotalBlogs() {
  axios
    .get("https://crudcrud.com/api/106fb1c1ede94de28e9521301ad267ba/blogData")
    .then((response) => {
      const totalBlogs = response.data.length;
      document.getElementById("totalBlogs").textContent = totalBlogs;
    })
    .catch((error) => console.log(error));
}

window.addEventListener('load', () => {
  axios
      .get("https://crudcrud.com/api/106fb1c1ede94de28e9521301ad267ba/blogData")
      .then((response) => {
          response.data.forEach(blog => {
              displayBlogOnScreen(blog);
          });
          updateTotalBlogs();
      })
      .catch((error) => console.log(error));
});
