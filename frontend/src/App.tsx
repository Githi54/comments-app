import { Box } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { getAllComments } from "./api/comments.api";
import { AddForm } from "./components/AddForm";
import { CommentsList } from "./components/CommentsList";
import { Loader } from "./components/Loader";
import { IComment } from "./types/comment.type";

function App() {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [openForm, setOpenForm] = useState(true);

  const handleClose = useCallback(() => setOpenForm(false), [])

  useEffect(() => {
    const getComments = async () => {
      const allComments = await getAllComments();

      setComments(allComments);
    };
    
    getComments();
  }, [comments]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", margin: "0 auto"}}>
      <AddForm openForm={openForm} handleCloseForm={handleClose} isAnswer={false} />
      {Array.isArray(comments) ? (
        <CommentsList comments={comments} />
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default App;
