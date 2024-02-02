import React, { useEffect } from "react";
import Landing from "../components/Landing";
import Footer from "../components/Footer";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Home = () => {
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
        console.log(postsArray);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    // Call the function to fetch blog posts
    fetchBlogPosts();
  }, []);

  return (
    <div>
      <Landing />
      <Footer />
    </div>
  );
};

export default Home;
