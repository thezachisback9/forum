import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseclient";
import Comments from "../components/Commentbox";


function Postdetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>by {post.author}</p>

      {post.imgurl && (
        <img
          src={post.imgurl}
          alt="Post"
          style={{ maxWidth: "400px", marginBottom: "10px" }}
        />
      )}

      <p>{post.content}</p>
      <p>Upvotes: {post.Upvotes}</p>
      <p>Posted: {new Date(post.created_at).toLocaleString()}</p>
      <Comments postId={id} />


    </div>
  );
}

export default Postdetails;
