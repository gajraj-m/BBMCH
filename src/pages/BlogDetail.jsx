// BlogDetail.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  // Assuming you are using React Router to get the blog post ID from the URL
  const { id } = useParams();

  const { blog } = useSelector((state) => state.app);

  // Fetch the detailed blog post data using postId
  // Implement the logic to fetch the blog post data from Firebase based on the postId

  return (
    <div className="p-4">
      <div className="mx-auto max-w-[50%] mt-24">
        <h1 className="text-white text-3xl lg:text-4xl font-bold w-fit mx-auto">
          {blog.title}
        </h1>
      </div>

      {/* date author readtime */}
      <div className="max-w-[50%] mx-auto mt-12">
        <p>{blog.author}</p>
        <div className="flex flex-row space-x-2">
          <p className="text-xs">{blog.readTime} min read</p>
          <p className="text-xs">{blog.publishDate}</p>
        </div>
      </div>

      {/* image */}
      <div className="m-12 rounded-lg shadow-lg shadow-gray-700">
        <img src={blog.image} alt={blog.title} className="w-full rounded-lg" />
      </div>

      {/* content */}
      <div className="max-w-[70%] mx-auto text-justify">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
