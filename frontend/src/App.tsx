import { useEffect, useState } from "react";
import { getAllComments } from "./api/comments.api";
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

  console.log(comments);

  return (
    <>
      <h1>Hello world!</h1>
      {comments.length > 0 && <p>{comments[0].userName}</p>}
    </>
  );
}

export default App;
