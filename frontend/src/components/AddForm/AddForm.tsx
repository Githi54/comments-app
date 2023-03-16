import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
  Modal,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { TextInput } from "../TextInput";

type Props = {
  openForm: boolean;
  handleCloseForm: () => void;
  handleSubmit: () => void;
  isAnswer: boolean;
};

export const AddForm: React.FC<Props> = ({
  openForm,
  handleCloseForm,
  handleSubmit,
  isAnswer,
}) => {
  const [commentText, setCommentText] = useState("");

  // const handleTextChange = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     setCommentText(event.target.value);
  //   },
  //   [commentText]
  // );


  return (
    <Modal open={openForm} onClose={handleCloseForm}>
      <Box
        style={{
          backgroundColor: "white",
          maxWidth: "800px",
          margin: "30px auto",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseForm}
          style={{
            position: "absolute",
            right: "16.5rem",
            top: "1.7rem",
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "500px",
              gap: "10px",
            }}
          >
            <FormControl>
              <InputLabel htmlFor="userName" required>
                User name
              </InputLabel>
              <Input id="userName" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">
                Must contain only Latin letters and numbers
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email" required>
                Email address
              </InputLabel>
              <Input
                id="email"
                aria-describedby="my-helper-text"
                type="email"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="userName">Home page</InputLabel>
              <Input id="userName" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">URL format</FormHelperText>
            </FormControl>
            <Box>
              <TextInput commentText={commentText} setCommetText={setCommentText} />
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
