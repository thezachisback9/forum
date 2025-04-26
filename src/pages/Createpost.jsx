import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { supabase } from '../supabaseclient';

function Createpost() {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const [post, setPost] = useState({
    author: '',
    title: '',
    content: '',
    imgurl: '',
    Upvotes: '',
    editcode: ''
  });



  const createPost = async (event) => {   
    if (!post.title.trim()) {
        alert("stop being lazy and make a title");
        return;
      }      
    event.preventDefault();
    const { data, error } = await supabase
      .from('posts')
      .insert({
        author: post.author,
        title: post.title,
        content: post.content,
        imgurl: post.imgurl,
        Upvotes: 0,
        editcode: post.editcode
      });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    window.location = "/";
  };

  return (
    <>
      <div className="writeauthor">
        <div>Your name:</div>
        <input 
          type="text"
          name="author" 
          value={post.author} 
          onChange={handleChange} 
        />
      </div>
      <div className="writetitle">
        <div>Post title:</div>
        <input 
          type="text"
          name="title" 
          value={post.title} 
          onChange={handleChange} 
        />
      </div>
      <div className="writecontent">
        <div>Post content:</div>
        <input 
          type="text"
          name="content" 
          value={post.content} 
          onChange={handleChange} 
        />
      </div>
      <div className="writeimage">
        <div>Image URL --optional--:</div>
        <input 
          type="text"
          name="imgurl" 
          value={post.imgurl} 
          onChange={handleChange} 
        />
        <div className="writecode">
        <div>Code --you need this to edit/delete your post so dont forget it--</div></div>
        <input 
          type="text"
          name="editcode" 
          value={post.editcode} 
          onChange={handleChange} 
        />
      </div>
      <button onClick={createPost}>SUBMIT</button>
    </>
  );
}

export default Createpost;
