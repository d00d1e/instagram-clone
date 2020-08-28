import React, { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "JLee",
      caption: "First post: ReactJS guys!",
      imageUrl: "https://www.freecodecamp.org/news/content/images/size/w1000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
    },
    {
      username: "mooose",
      caption: "Meow meow meow meow",
      imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1942&q=80"
    },
    {
      username: "lemon_lyfe",
      caption: "When life gives you lemons...",
      imageUrl: "https://images.unsplash.com/photo-1454944338482-a69bb95894af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80"
    }
  ]); 

  return (
    <div className="App">
      <div className="app__header">
        <img 
          className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        />
      </div>

      <h1>Instagram Clone with React!</h1>

      {
        posts.map(post => {
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        })
      }

    </div>
  );
}

export default App;
