import { useEffect, useState } from "react";
import { getAllComments } from "./api/comments.api";
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
        <>
          <h1>Hello world!</h1>
          <p>{comments[0].userName}</p>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
