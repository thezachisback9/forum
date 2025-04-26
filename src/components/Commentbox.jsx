import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        content: newComment.trim()
      });

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setComments((prev) => [...prev, ...data]);
      setNewComment("");
    }
    windows.location = `/${id}`;
  };

  return (
    <div>
      <h3>Comments</h3>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} style={{ marginBottom: "10px" }}>
            <p>{comment.content}</p>
            <small>{new Date(comment.created_at).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      <form onSubmit={handleAddComment} style={{ marginTop: "15px" }}>
        <textarea
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          style={{ width: "100%" }}
        ></textarea>
        <button type="submit" style={{ marginTop: "5px" }}>
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default Comments;
