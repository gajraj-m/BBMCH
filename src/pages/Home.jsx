import React, { useEffect, useState } from "react";
import Landing from "../components/Landing";
import Footer from "../components/Footer";

import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";

const Home = () => {
  const [gallery, setGallery] = useState({});
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
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    const fetchData = async () => {
      try {
        const dataRef = doc(db, "data", "gallery"); // Reference the "gallery" document
        const docSnap = await getDoc(dataRef);

        if (docSnap.exists) {
          const data = docSnap.data();
          setGallery(data);
          // dispatch(setGallery(data));
          console.log(data);
        } else {
          console.log("No document found!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when needed (e.g., on component mount)
    fetchData();

    // Call the function to fetch blog posts
    fetchBlogPosts();
  }, []);

  return (
    <div>
      <Nav />
      <Landing />
      <Footer />
    </div>
  );
};

export default Home;
