import { Box, Button } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { getAllComments } from "./api/comments.api";
import { AddForm } from "./components/AddForm";
import { CommentsList } from "./components/CommentsList";
import { Loader } from "./components/Loader";
import { IComment } from "./types/comment.type";

function App() {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = useCallback(() => setOpenForm(true), []);

  useEffect(() => {
    const getComments = async () => {
      const allComments = await getAllComments();

      setComments(allComments);
    };

    getComments();
  }, [comments]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", margin: "0 auto" }}>
      <AddForm
        openForm={openForm}
        setOpenForm={setOpenForm}
        isAnswer={false}
      />
      {Array.isArray(comments) ? (
        <Box style={{display: "flex", flexDirection: "column", gap: "20px"}}>
          <Box>
            <Button
              onClick={handleOpenForm}
              style={{
                backgroundColor: "lightgray",
                float: "right",
                textTransform: "capitalize"
              }}
              variant="outlined"
            >
              Add comment
            </Button>
          </Box>
          <CommentsList comments={comments} />
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default App;
