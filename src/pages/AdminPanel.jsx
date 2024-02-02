import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { collection, addDoc } from "firebase/firestore";
import { storage, firebase, db } from "../config/firebase";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { currentUser } = useSelector((state) => state.user);

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
    </div>
  );
};

export default AdminPanel;
