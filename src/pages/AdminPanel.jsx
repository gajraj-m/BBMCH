import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { storage, firebase, db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";

const AdminPanel = () => {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { currentUser } = useSelector((state) => state.user);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let localImageUrl = "";
      if (image) {
        try {
          const imageRef = ref(storage, `images/Blog/${image.name + v4()}`);
          const res = await uploadBytes(imageRef, image);
          const downloadUrl = await getDownloadURL(res.ref);
          setImageUrl(downloadUrl);
          localImageUrl = downloadUrl;
        } catch (err) {
          console.log(err);
        }
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      // Calculate the estimated reading time
      const wordCount = formData.content.split(/\s+/).length;
      const readingSpeed = 200; // Adjust as needed (words per minute)
      const estimatedReadingTime = Math.ceil(wordCount / readingSpeed);

      const document = {
        ...formData,
        image: localImageUrl,
        publishDate: formattedDate,
        readTime: estimatedReadingTime,
      };

      // await setDoc(doc(db, "Blog", currentUser.id), document);
      await addDoc(collection(db, "Blog"), document);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleDelete = async () => {};

  return (
    <div className="p-4">
      <Dialog>
        <DialogTrigger>
          <Button className="text-gray-700 mt-24">Add Post</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select your files to upload</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Blog Title"
                id="title"
                className="bg-slate-100 rounded-md p-2 text-xs text-black"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Author"
                id="author"
                className="bg-slate-100 rounded-md p-2 text-xs text-black"
                onChange={handleChange}
              />
              <textarea
                name="Content"
                cols="30"
                rows="10"
                type="text"
                placeholder="Content"
                id="content"
                className="bg-slate-100 rounded-md p-2 text-xs text-black"
                onChange={handleChange}
              ></textarea>

              <div className="form-group mb-3 flex flex-row space-x-3">
                <label className="textTitle">Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={handleImageChange}
                />
              </div>

              <button
                // disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {/* {loading ? "Loading..." : "Save"} */}
                Save
              </button>
              {/* <OAuth /> */}
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-row space-x-6 mt-8">
        {blogPosts.map((post) => (
          <Link
            onClick={() => {
              // dispatch(setBlog(post));
            }}
            to={`/resources/journal/${post.id}`}
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

            <Button
              className="bg-primary text-gray-800 mt-4"
              onClick={() => {
                handleDelete;
              }}
            >
              Delete
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;