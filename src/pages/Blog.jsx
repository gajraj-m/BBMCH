import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; // Import your Firebase configuration
import { useDispatch } from "react-redux";
import { setBlog } from "../redux/slices/appSlice";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const blogCollectionRef = collection(db, "Blog");
        const querySnapshot = await getDocs(blogCollectionRef);
        const postsArray = [];
        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          postsArray.push({
            id: doc.id,
            ...postData,
          });
        });
        setBlogPosts(postsArray);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    // Call the function to fetch blog posts
    fetchBlogPosts();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-background rounded-lg p-2 text-center mb-4 mt-20">
        <h1 className="font-bold text-3xl text-primary">Blog Posts</h1>
      </div>
      <div className="flex flex-row space-x-6 mt-8">
        {blogPosts.map((post) => (
          <Link
            onClick={() => {
              dispatch(setBlog(post));
            }}
            to={`/resources/blog/${post.id}`}
            key={post.id}
            className="bg-gray-100 rounded-lg shadow-md shadow-gray-600 text-center p-2 w-1/4 hover:scale-105 duration-200"
          >
            <img src={post.image} alt="" className="w-full rounded-lg" />
            <p className="text-gray-700 text-xs mt-2">Author : {post.author}</p>
            <p className="text-gray-700 text-xs mt-2">
              {post.publishDate} . {post.readTime} min read
            </p>
            <p className="text-gray-700 font-bold text-2xl mt-2">
              {post.title}
            </p>
            <p className="text-gray-700 text-sm mt-4 w-3/4 mx-auto">
              {post.content.slice(0, 50)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
