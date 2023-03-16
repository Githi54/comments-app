import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllComments } from "./api/comments.api";
import { AddForm } from "./components/AddForm";
import { CommentsList } from "./components/CommentsList";
import { Loader } from "./components/Loader";
import { IComment } from "./types/comment.type";

function App() {
  const [comments, setComments] = useState<IComment[] | null>(null);

  useEffect(() => {
    const getComments = async () => {
      const allComments = await getAllComments();

      console.log(allComments);

      setComments(allComments);
    };
    
    getComments();
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", margin: "0 auto"}}>
      {/* <AddForm openForm={true} handleCloseForm={() => null} handleSubmit={() => null} isAnswer={false} /> */}
      {Array.isArray(comments) ? (
        <CommentsList comments={comments} />
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default App;
