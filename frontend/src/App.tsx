import { useEffect, useState } from "react";
import { getAllComments } from "./api/comments.api";
import { CommentsList } from "./components/CommentsList";
import { Loader } from "./components/Loader";
import { IComment } from "./types/comment.type";

function App() {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const getComments = async () => {
      const allComments = await getAllComments();

      setComments(allComments);
    };

    getComments();
  }, []);

  return (
    <>
      {comments.length > 0 ? (
        <CommentsList comments={comments} />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
