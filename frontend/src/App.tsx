import { Box, Button } from "@material-ui/core";
import { Pagination } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getAllComments } from "./api/comments.api";
import { AddForm } from "./components/AddForm";
import { CommentsList } from "./components/CommentsList";
import { Loader } from "./components/Loader";
import { IComment } from "./types/comment.type";

function App() {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleOpenForm = useCallback(() => setOpenForm(true), []);

  const handleChangePage = useCallback(
    (event: ChangeEvent<any>, page: number) => {
      setCurrentPage(page);
    },
    []
  );

  useEffect(() => {
    const getComments = async () => {
      const allComments = await getAllComments(currentPage);

      setComments(allComments.items);
      setTotalPages(allComments.totalPages);
    };

    getComments();
  }, [comments, currentPage, totalPages]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", margin: "0 auto" }}>
      <AddForm openForm={openForm} setOpenForm={setOpenForm} isAnswer={false} />
      {Array.isArray(comments) ? (
        <Box style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Box>
            <Button
              onClick={handleOpenForm}
              style={{
                backgroundColor: "lightgray",
                float: "right",
                textTransform: "capitalize",
              }}
              variant="outlined"
            >
              Add comment
            </Button>
          </Box>
            <CommentsList comments={comments} />
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                onChange={handleChangePage}
                style={{
                  position: "fixed",
                  bottom: 0,
                }}
              />
            )}
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default App;
