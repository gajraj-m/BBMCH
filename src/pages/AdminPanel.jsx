import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { storage, firebase, db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";

const AdminPanel = () => {
  const [formData, setFormData] = useState({});
  const [brochureFormData, setBrochureFormData] = useState({});
  const [registerFormData, setRegisterFormData] = useState({});
  const [aboutFormData, setAboutFormData] = useState({});
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

  const handleDeleteBlog = async(post) => {
    console.log(post)
     try {
       const blogDocRef = doc(db, "Blog", post.id); // Reference to the specific blog post document
       await deleteDoc(blogDocRef);
       console.log("Blog post deleted successfully!");

       // Update your UI or state to reflect the deletion
       // (e.g., refetch blog posts, remove post from displayed list)
     } catch (error) {
       console.error("Error deleting blog post:", error);
     }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleBrochureChange = (e) => {
    setBrochureFormData({ ...brochureFormData, [e.target.id]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.id]: e.target.value,
    });
  };
   const handleAboutChange = (e) => {
     setAboutFormData({
       ...aboutFormData,
       [e.target.id]: e.target.value,
     });
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

  const handleBrochureSave = async (e) => {
    e.preventDefault();
    try {
      const dataRef = doc(db, "data", "constants"); // Reference to the specific document

      const updateData = { ["brochure"]: brochureFormData.brochure }; // Update object with field and value
      await updateDoc(dataRef, updateData);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

    const handleRegisterSave = async (e) => {
      e.preventDefault();
      try {
        const dataRef = doc(db, "data", "constants"); // Reference to the specific document

        const updateData = { ["register"]: registerFormData.register }; // Update object with field and value
        await updateDoc(dataRef, updateData);
      } catch (error) {
        console.error("Error updating document:", error);
      }
    };

     const handleAboutSave = async (e) => {
       e.preventDefault();
       try {
         const dataRef = doc(db, "data", "constants"); // Reference to the specific document

         const updateData = { ["about"]: aboutFormData.about }; // Update object with field and value
         await updateDoc(dataRef, updateData);
       } catch (error) {
         console.error("Error updating document:", error);
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

              {/* <OAuth /> */}
            </form>
          </div>
          <DialogFooter className="w-full">
            <DialogClose asChild>
              <button
                // disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {/* {loading ? "Loading..." : "Save"} */}
                Save
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* add brochure */}
      <Dialog>
        <DialogTrigger>
          <Button className="text-gray-700 mt-24 ml-16">
            Add Brochure Link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select your files to upload</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleBrochureSave} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Brochure link"
                id="brochure"
                className="bg-slate-100 rounded-md p-2 text-xs text-black"
                onChange={handleBrochureChange}
              />

              {/* <OAuth /> */}
            </form>
          </div>
          <DialogFooter className="w-full">
            <DialogClose asChild>
              <button
                // disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {/* {loading ? "Loading..." : "Save"} */}
                Save
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* add register */}
      <Dialog>
        <DialogTrigger>
          <Button className="text-gray-700 mt-24 ml-16">
            Add Register Link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select your files to upload</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleRegisterSave} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Register Link"
                id="register"
                className="bg-slate-100 rounded-md p-2 text-xs text-black"
                onChange={handleRegisterChange}
              />

              {/* <OAuth /> */}
            </form>
          </div>
          <DialogFooter className="w-full">
            <DialogClose asChild>
              <button
                // disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {/* {loading ? "Loading..." : "Save"} */}
                Save
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* add about us link */}
      <Dialog>
        <DialogTrigger>
          <Button className="text-gray-700 mt-24 ml-16">
            Add About Us Link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select your files to upload</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleAboutSave} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Register Link"
                id="about"
                className="bg-slate-100 rounded-md p-2 text-xs text-black"
                onChange={handleAboutChange}
              />

              {/* <OAuth /> */}
            </form>
          </div>
          <DialogFooter className="w-full">
            <DialogClose asChild>
              <button
                // disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {/* {loading ? "Loading..." : "Save"} */}
                Save
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-row space-x-6 mt-8">
        {blogPosts.map((post) => (
          <div
            onClick={() => {
              // dispatch(setBlog(post));
            }}
            key={post.id}
            className="bg-gray-100 rounded-lg shadow-md shadow-gray-600 text-center p-2 w-1/4 hover:scale-105 duration-200"
          >
            <img src={post.image} alt="" className="w-full rounded-lg" />
            <p className="text-gray-700 text-xs mt-2">Author : {post.author}</p>
            <p className="text-gray-700 text-xs mt-2">
              {post.publishDate} . {post.readTime} min read
            </p>
            <Link
              className="text-gray-700 font-bold text-2xl mt-2"
              to={`/resources/journal/${post.id}`}
            >
              {post.title}
            </Link>
            <p className="text-gray-700 text-sm mt-4 w-3/4 mx-auto">
              {post.content.slice(0, 50)}...
            </p>

            <Dialog>
              <DialogTrigger>
                <Button className="bg-primary text-gray-800 mt-4">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>You Sure want to delete this post?</DialogTitle>
                </DialogHeader>
                <DialogFooter className="w-full">
                  <DialogClose asChild>
                    <button
                      // disabled={loading}
                      className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                      onClick={() => handleDeleteBlog(post)}
                    >
                      {/* {loading ? "Loading..." : "Save"} */}
                      Yes
                    </button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
