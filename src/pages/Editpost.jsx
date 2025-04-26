import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseclient";

function Editpost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
        setError("Post not found.");
      } else {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      }
    };

    fetchPost();
  }, [id]);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (inputCode === post.editcode) {
      setAuthorized(true);
      setError("");
    } else {
      setError("Invalid code. You are not allowed to edit this post.");
    }
  };

  const handleSave = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({
        title: title,
        content: content,
      })
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      setError("Failed to save changes.");
    } else {
      alert("Post updated successfully!");
    }
  };

  if (!post) return <p>Loading...</p>;
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
  
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);
  
    if (error) {
      console.error("Delete error:", error);
      setError("Failed to delete post.");
    } else {
      alert("Post deleted successfully.");
      window.location = "/browse"; 
    }
  };
  

  return (
    <div>
      <h2>Edit Post</h2>

      {!authorized ? (
        <form onSubmit={handleCodeSubmit}>
          <p>Enter your edit code to unlock editing:</p>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button type="submit">Submit</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      ) : (
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Content:
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={handleDelete} style={{ marginTop: "10px", color: "red" }}>Delete Post</button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default Editpost;
