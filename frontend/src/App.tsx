import { Box, Button } from "@material-ui/core";
import { Pagination } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { getAllComments } from "./api/comments.api";
import { AddForm } from "./components/AddForm";
import { CommentsList } from "./components/CommentsList";
import { Loader } from "./components/Loader";
import { SortBy } from "./components/SortBy";
import { SortType } from "./types/enums/sortType.enum";
import { IComment } from "./types/types/comment.type";
import { GetResponse } from "./types/types/getResponse.type";

function App() {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortType, setSortType] = useState("none");
  const [visibleComments, setVisibleComments] = useState<IComment[]>([]);
  const topRef = useRef<HTMLDivElement>(null);

  const handleOpenForm = useCallback(() => setOpenForm(true), []);

  const handleChangePage = useCallback(
    (_: ChangeEvent<any>, page: number) => {
      if (topRef.current !== null) {
        topRef.current.scrollIntoView({ behavior: "auto" }); // Змінюємо параметр behavior на "auto"
      }

      setCurrentPage(page);
      setSortType("none");
    },
    [currentPage]
  );

  useEffect(() => {
    const getComments = async () => {
      const response: GetResponse = await getAllComments(currentPage);
      const { items, totalPages } = response;

      setComments(items);
      setTotalPages(totalPages);
    };

    getComments();
  }, [comments, currentPage, totalPages]);

  const getSortComments = useCallback(
    (commentKey: keyof IComment): IComment[] => {
      if (sortType.includes("↑")) {
        return visibleComments.sort((a, b) =>
          `${a[commentKey]}`.localeCompare(`${b[commentKey]}`)
        );
      }

      if (sortType.includes("↓")) {
        return visibleComments?.sort((a, b) =>
          `${b[commentKey]}`.localeCompare(`${a[commentKey]}`)
        );
      }

      return [];
    },
    [sortType]
  );

  useEffect(() => {
    if (comments !== null) {
      setVisibleComments(comments);
    }

    switch (true) {
      case sortType.includes(SortType.None):
        break;

      case sortType.includes(SortType.Date):
        setVisibleComments(getSortComments("createdAt"));

        break;

      case sortType.includes(SortType.UserName):
        setVisibleComments(getSortComments("userName"));

        break;

        case sortType.includes(SortType.Email):
          setVisibleComments(getSortComments("email"));
  
          break;

      default:
        break;
    }
  }, [comments]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", margin: "0 auto" }}>
      <AddForm openForm={openForm} setOpenForm={setOpenForm} isAnswer={false} />
      <div ref={topRef}></div>
      {Array.isArray(comments) ? (
        <Box style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              maxWidth: "500px",
              alignItems: "center",
            }}
          >
            <SortBy setSortType={setSortType} sortType={sortType} />
            <Button
              onClick={handleOpenForm}
              style={{
                backgroundColor: "lightgray",
                textTransform: "capitalize",
              }}
              variant="outlined"
            >
              Add comment
            </Button>
          </Box>
          <CommentsList comments={visibleComments} />
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              onChange={handleChangePage}
              style={{
                position: "relative",
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
