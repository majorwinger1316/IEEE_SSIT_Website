import React, { useEffect, useState } from 'react';
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function Submission() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        }, 
        (error) => {
          console.log(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };

    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "articles", auth.currentUser.uid), {
        description: description,
        img: data.img,
        timeStamp: serverTimestamp()
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='submission'>
      <p>Upload your Article Here</p>
      <form onSubmit={handleAdd}>
        <label>Short description of the article:</label>
        <input 
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
        <label htmlFor="file">
          Image: <UploadFileIcon/>
        </label>
        <input 
          type="file" 
          id="file" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Submission;
