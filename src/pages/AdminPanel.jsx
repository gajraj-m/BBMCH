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
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { storage, firebase, db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AdminPanel = () => {
  const [formData, setFormData] = useState({});
  const [brochureFormData, setBrochureFormData] = useState({});
  const [registerFormData, setRegisterFormData] = useState({});
  const [aboutFormData, setAboutFormData] = useState({});
  const [image, setImage] = useState(null);
  const [shopImages, setShopImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [blogPosts, setBlogPosts] = useState([]);
  const dispatch = useDispatch();
  const [gallery, setGallery] = useState({});
  const [quizFormData, setQuizFormData] = useState({});
  const [shopFormData, setShopFormData] = useState({});
  const [shop, setShop] = useState([]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const societyCollections = [
    "literary",
    "cultural",
    "audioVisual",
    "athletic",
    "dramatic",
    "fineArts",
    "socialService",
    "hostel",
  ];

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

    const fetchShopItems = async () => {
      try {
        const shopItemsRef = collection(db, "Shop");
        const shopItemsSnapshot = await getDocs(shopItemsRef);
        const items = shopItemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShop(items);
        console.log(items)
      } catch (error) {
        console.error("Error fetching shop items:", error);
        return []; // Return empty array on error
      }
    };

    // Call the function to fetch blog posts
    fetchBlogPosts();
    fetchShopItems();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = doc(db, "data", "gallery"); // Reference the "gallery" document
        const docSnap = await getDoc(dataRef);

        if (docSnap.exists) {
          const data = docSnap.data();
          setGallery(data);
        } else {
          console.log("No document found!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when needed (e.g., on component mount)
    fetchData();
  }, []);

  function renderAllSocietiesGallery() {
    return (
      <>
        {societyCollections.map((collectionName) => (
          <div key={collectionName}>
            <h2 className="font-bold mt-16 text-3xl">
              {collectionName.toUpperCase()} Society Gallery
            </h2>
            <Dialog>
              <DialogContent>
                <DialogTitle>Uploading...</DialogTitle>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <Button className="text-gray-700 mt-4">Add Image</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select your files to upload</DialogTitle>
                </DialogHeader>
                <div>
                  <form
                    onSubmit={(e) => handleGallerySubmit(e, collectionName)}
                    className="flex flex-col gap-4"
                  >
                    <div className="form-group mb-3 flex flex-row space-x-3">
                      <label className="textTitle">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange}
                      />
                    </div>
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                      Save
                    </button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
            {gallery?.[collectionName]?.length > 0 && ( // Check if images exist
              <div className="flex flex-row space-x-6 mt-8">
                {gallery[collectionName].map((image, id) => (
                  <div
                    key={id}
                    className="bg-gray-100 rounded-lg shadow-md shadow-gray-600 text-center p-2 w-1/4 hover:scale-105 duration-200"
                  >
                    <img
                      src={image.image}
                      alt=""
                      className="w-full rounded-lg"
                    />

                    <Dialog>
                      <DialogTrigger>
                        <Button className="bg-primary text-gray-800 mt-4">
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            You Sure want to delete this image?
                          </DialogTitle>
                        </DialogHeader>
                        <DialogFooter className="w-full">
                          <DialogClose asChild>
                            <button
                              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                              onClick={() =>
                                handleDeleteGalleryImage(collectionName, id)
                              }
                            >
                              Yes
                            </button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </>
    );
  }

  const handleDeleteBlog = async (post) => {
    console.log(post);
    try {
      const blogDocRef = doc(db, "Blog", post.id); // Reference to the specific blog post document
      await deleteDoc(blogDocRef);
      console.log("Blog post deleted successfully!");

      // Update your UI or state to reflect the deletion
      // (e.g., refetch blog posts, remove post from displayed list)
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

    const handleDeleteShopItem = async (item) => {
      try {
        const shopDocRef = doc(db, "Shop", item.id); // Reference to the specific blog post document
        await deleteDoc(shopDocRef);
        console.log("Shop item deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog post:", error);
      }
    };

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
  const handleQuizChange = (e) => {
    setQuizFormData({
      ...quizFormData,
      [e.target.id]: e.target.value,
    });
  };

  const handleShopChange = (e) => {
    setShopFormData({ ...shopFormData, [e.target.id]: e.target.value });
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
      console.log(doc);
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
      console.log("heheeh");
      console.log(aboutFormData);
      await updateDoc(dataRef, updateData);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleQuizSave = async (e) => {
    e.preventDefault();
    try {
      const dataRef = doc(db, "data", "constants"); // Reference to the specific document

      const updateData = { ["quiz"]: quizFormData }; // Update object with field and value
      await updateDoc(dataRef, updateData);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleShopImagesChange = (event) => {
    const newImages = [...shopImages, ...event.target.files]; // Spread operator
    setShopImages(newImages);
  };

  const handleGallerySubmit = async (e, documentName) => {
    e.preventDefault();
    try {
      let localImageUrl = "";
      if (image) {
        try {
          const imageRef = ref(
            storage,
            `images/${documentName}/${image.name + v4()}`
          );
          const res = await uploadBytes(imageRef, image);
          const downloadUrl = await getDownloadURL(res.ref);
          setImageUrl(downloadUrl);
          localImageUrl = downloadUrl;
        } catch (err) {
          console.log(err);
        }
      }

      const document = {
        image: localImageUrl,
      };

      // await setDoc(doc(db, "Blog", currentUser.id), document);
      const dataRef = doc(db, "data", "gallery"); // Reference to the specific document
      await updateDoc(dataRef, {
        [documentName]: arrayUnion(document), // Use arrayUnion to safely add to an array
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGalleryImage = async (documentName, imageId) => {
    try {
      const dataRef = doc(db, "data", "gallery"); // Reference the "gallery" document
      const docSnap = await getDoc(dataRef);

      if (docSnap.exists) {
        const data = docSnap.data();
        let array = [];

        array = data?.[documentName];

        const filteredArray = array.filter((item, index) => index !== imageId); // Filter out the image to delete
        await updateDoc(dataRef, {
          [documentName]: filteredArray,
        });
      } else {
        console.log("No document found!");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleShopItemSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = []; // Array to store download URLs

      if (shopImages) {
        // Assuming 'images' is an array of files
        for (const image of shopImages) {
          try {
            const imageRef = ref(storage, `images/Shop/${image.name + v4()}`);
            const res = await uploadBytes(imageRef, image);
            const downloadUrl = await getDownloadURL(res.ref);
            imageUrls.push(downloadUrl);
          } catch (err) {
            console.log(err);
          }
        }
      }

      const document = {
        ...shopFormData,
        images: imageUrls, // Store all uploaded image URLs in an array
      };

      await addDoc(collection(db, "Shop"), document);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <Nav />
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
            </form>
          </div>
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
              <button
                // disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {/* {loading ? "Loading..." : "Save"} */}
                Save
              </button>
            </form>
          </div>
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
              <button
                // disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {/* {loading ? "Loading..." : "Save"} */}
                Save
              </button>
            </form>
          </div>
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
                placeholder="About us Link"
                id="about"
                className="bg-slate-100 rounded-md p-2 text-xs text-black"
                onChange={handleAboutChange}
              />
              <button
                // disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {/* {loading ? "Loading..." : "Save"} */}
                Save
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* quiz */}
      <Dialog>
        <DialogTrigger>
          <Button className="text-gray-700 mt-24 ml-16">Add Quiz</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select your files to upload</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleQuizSave} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Quiz Title"
                id="title"
                className="bg-slate-100 rounded-md p-2 text-xs text-black"
                onChange={handleQuizChange}
              />
              <input
                type="text"
                placeholder="Link"
                id="link"
                className="bg-slate-100 rounded-md p-2 text-xs text-black"
                onChange={handleQuizChange}
              />

              <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                Save
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <h2 className="font-bold mt-16 text-3xl">Weely Journals</h2>

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

      {renderAllSocietiesGallery()}

      {/* shop */}
      <div className="mt-8">
        <h2 className="font-bold text-3xl">SHOP</h2>
        <Dialog>
          <DialogTrigger>
            <Button className="text-gray-700 mt-4">Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add an item to your shop</DialogTitle>
            </DialogHeader>
            <div>
              <form
                onSubmit={handleShopItemSubmit}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  placeholder="Item Title"
                  id="title"
                  className="bg-slate-100 rounded-md p-2 text-xs text-black"
                  onChange={handleShopChange}
                />
                <input
                  type="Number"
                  placeholder="Price"
                  id="price"
                  className="bg-slate-100 rounded-md p-2 text-xs text-black"
                  onChange={handleShopChange}
                />
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  type="text"
                  placeholder="description"
                  id="description"
                  className="bg-slate-100 rounded-md p-2 text-xs text-black"
                  onChange={handleShopChange}
                ></textarea>

                {/* <div className="form-group mb-3 flex flex-col space-y-1">
                  <p className="textTitle">Image</p>
                  {[1, 2, 3, 4].map((item, id) => (
                    <input
                      key={id}
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={handleShopImagesChange}
                    />
                  ))}
                </div> */}
                <div className="form-group mb-3 flex flex-col space-y-1">
                  <p className="textTitle">Images</p>
                  <input
                    type="file"
                    multiple
                    className="form-control"
                    onChange={handleShopImagesChange}
                  />
                </div>

                <button
                  // disabled={loading}
                  className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                  {/* {loading ? "Loading..." : "Save"} */}
                  Save
                </button>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* display */}
        <div className="flex flex-row space-x-12 mt-8">
          {shop.map((item) => (
            <div
              onClick={() => {
                // dispatch(setBlog(post));
              }}
              key={item.id}
              className="bg-gray-100 rounded-lg shadow-md shadow-gray-600 text-center p-2 w-1/4 hover:scale-105 duration-200"
            >
              {/* <img src={item.images[0]} alt="" className="w-full rounded-lg" /> */}
              <div className="">
                <Slider {...settings}>
                  {item.images.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt=""
                      className=" w-12 h-10z"
                    />
                  ))}
                </Slider>
              </div>

              <p className="text-gray-700 text-lg font-semibold mt-8">{item.title}</p>

              <p className="text-gray-700 text-sm mt-2 w-3/4 mx-auto">
                {item.description.slice(0, 50)}...
              </p>

              <Dialog>
                <DialogTrigger>
                  <Button className="bg-primary text-gray-800 mt-4">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      You Sure want to delete this post?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="w-full">
                    <DialogClose asChild>
                      <button
                        // disabled={loading}
                        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                        onClick={() => handleDeleteShopItem(item)}
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
     
    </div>
  );
};

export default AdminPanel;
