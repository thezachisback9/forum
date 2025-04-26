import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { Link } from "react-router-dom";

function Browsepage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("created_at"); 

  useEffect(() => {
    const getPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order(orderBy, { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    };

    getPosts();
  }, [orderBy]); 

  const handleVote = async (postId, currentUpvotes) => {
    const { data, error } = await supabase
      .from("posts")
      .update({ Upvotes: currentUpvotes + 1 })
      .eq("id", postId);

    if (error) {
      console.error("Upvote error:", error);
    } else {
      console.log("Upvote success:", data);
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, Upvotes: post.Upvotes + 1 } : post
        )
      );
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
        
      <h1>ONE PIECE FORUM</h1>
      <h3>All Posts</h3>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
        <option value="created_at">Sort by Newest</option>
        <option value="Upvotes">Sort by Upvotes</option>
      </select>

      {filteredPosts.map((post) => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>Upvotes: {post.Upvotes}</p>
          <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
          <Link to={`/post/${post.id}`}>View Post</Link><div>         </div>
          <Link to={`/post/${post.id}/edit`}>Edit Post</Link>
          <div>         </div>
          <button onClick={() => handleVote(post.id, post.Upvotes)}>Upvote</button>
        </div>
      ))}
    </div>
  );
}

export default Browsepage;
