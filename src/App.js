import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import ImageUpload from './ImageUpload';
import { db, auth } from './firebase';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

// Modal control
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]); 
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('false');  
  const [ user, setUser] = useState(null);

  // runs after first render AND after every update
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in (persistent login)
        setUser(authUser);
        console.log(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // runs every time a new post is added 
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="App">

      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>  
      ) : (
        <h3>Sorry, you need to login to upload</h3>
      )}
    
      {/* signUp modal */}
      <Modal open={open} onClose={() => setOpen(false)} >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img 
              className="app__headerImage" 
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
              alt=""
            />
          </center>
          <form className="app__signup">
            <Input 
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="[password]"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div> 
      </Modal>

      {/* signIn modal  */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)} >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img 
              className="app__headerImage" 
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
              alt=""
            />
          </center>
          <form className="app__signin">
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="[password]"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          
          <Button type="submit" onClick={signIn}>Sign In</Button>
            
          </form>
        </div> 
      </Modal>

      <div className="app__header">
        <img 
          className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        />
      </div>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
      )}
      <h1>Instagram Clone with React!</h1>

      {
        posts.map(({id, post}) => {
          return <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        })
      }

    </div>
  );
}

export default App;
