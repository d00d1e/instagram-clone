import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import firebase from 'firebase/app';
import { db, storage } from './firebase';

function ImageUpload({username}) {
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState('');

  // choose file
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // handle file upload with progress bar
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round (
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            // post image to db
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            });

            setProgress(0);
            setCaption('');
            setImage(null);
          });
      }
    );
  };

  return (
    <div>
      <progress value={progress} max="100" />
      <Input type="text" placeholder="Enter a caption" onChange={event => setCaption(event.target.value)} value={caption}/>
      <Input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload
