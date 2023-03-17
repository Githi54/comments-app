import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  Modal,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { TextInput } from "../TextInput";
import { IComment } from "../../types/comment.type";
import { getCaptcha, postComment } from "../../api/comments.api";

type Props = {
  openForm: boolean;
  handleCloseForm: () => void;
  isAnswer: boolean;
};

export const AddForm: React.FC<Props> = ({
  openForm,
  handleCloseForm,
  isAnswer,
}) => {
  const [captchaURL, setCaptchaURL] = useState("");
  const [captchaText, setCapthcaText] = useState("");
  const [avatar, setAvatar] = useState("none");
  const [commentText, setCommentText] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [homePage, setHomePage] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");

  const fetchCaptcha = async () => {
    try {
      const response = await getCaptcha();
      const imgURL = URL.createObjectURL(response);
      setCaptchaURL(imgURL);
      console.log(imgURL);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChangeInput = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setState: (str: string) => void
    ) => {
      setState(event.target.value.trim());
      setButtonText("Submit");
    },
    []
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    isAnswer: boolean,
    answeredToCommentId?: number
  ) => {
    event.preventDefault();

    const comment: IComment = {
      userName,
      userAvatar: avatar,
      email,
      text: commentText,
      isAnswer,
      answeredToCommentId: answeredToCommentId || null,
      homePage: homePage.trim().length > 0 ? homePage : null,
    };

    const result = await postComment(comment, captchaText);

    result === 200 || result === 201
      ? setButtonText("Success")
      : setButtonText("Error");

    setAvatar("none");
    setCommentText("");
    setEmail("");
    setUserName("");
    setHomePage("");
    setIsLoad(false);
  };

  return (
    <Modal open={openForm} onClose={handleCloseForm}>
      <Box
        style={{
          backgroundColor: "white",
          maxWidth: "600px",
          margin: "30px auto",
          padding: "5px 20px 20px",
          borderRadius: "20px",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseForm}
          style={{
            float: "right",
            verticalAlign: "top",
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={(event) => handleSubmit(event, isAnswer)}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "500px",
              gap: "10px",
              marginTop: "25px",
            }}
          >
            <FormControl>
              <InputLabel htmlFor="userName" required>
                User name
              </InputLabel>
              <Input
                id="userName"
                aria-describedby="my-helper-text"
                value={userName}
                onChange={(event) => handleChangeInput(event, setUserName)}
              />
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
                value={email}
                onChange={(event) => handleChangeInput(event, setEmail)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="homePage">Home page</InputLabel>
              <Input
                id="homePage"
                aria-describedby="my-helper-text"
                value={homePage}
                onChange={(event) => handleChangeInput(event, setHomePage)}
              />
              <FormHelperText id="my-helper-text">URL format</FormHelperText>
            </FormControl>
            <Box>
              <TextInput
                commentText={commentText}
                setCommentText={setCommentText}
              />
            </Box>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Box sizeHeight={"50px"} sizeWidth={"50px"}>
                <img src={captchaURL} alt="Captcha" />
                
              </Box>
              <FormControl>
                <InputLabel htmlFor="captcha" required>
                  Captcha
                </InputLabel>
                <Input
                  id="captcha"
                  aria-describedby="my-helper-text"
                  value={captchaText}
                  onChange={(event) => handleChangeInput(event, setCapthcaText)}
                />
                <FormHelperText id="my-helper-text">
                  Enter the text from the captcha
                </FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <Button
                variant="outlined"
                type="submit"
                style={{ width: "88px" }}
              >
                {isLoad ? <CircularProgress size={"1.5rem"} /> : buttonText}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
