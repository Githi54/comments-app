import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { TextInput } from "../TextInput";
import { IComment } from "../../types/types/comment.type";
import { getCaptcha, postComment } from "../../api/comments.api";
import {
  hasAllTagsClosed,
  isCorrectUserName,
  isValidTag,
} from "../../helpers/validation";
import { ErrorMessage } from "../../types/enums/errorMessage.enum";

type Props = {
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  isAnswer: boolean;
  answeredToCommentId?: number;
};

export const AddForm: React.FC<Props> = ({
  openForm,
  setOpenForm,
  isAnswer,
  answeredToCommentId,
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
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const handleChangeAvatar = useCallback((avatarName: string) => {
    setAvatar(avatarName);
    setIsVisible(false);
  }, []);

  const fetchCaptcha = useCallback(async () => {
    try {
      const response = await getCaptcha();
      const imgURL = URL.createObjectURL(response);
      setCaptchaURL(imgURL);
    } catch (error) {
      throw error;
    }
  }, []);

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
      setErrorMessage("");
    },
    []
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    isAnswer: boolean
  ) => {
    event.preventDefault();

    setIsLoad(true);

    const comment: IComment = {
      userName,
      userAvatar: avatar,
      email,
      text: commentText,
      isAnswer,
      answeredToCommentId: answeredToCommentId ? answeredToCommentId : null,
      homePage: homePage.trim().length > 0 ? homePage : null,
      captcha: captchaText,
    };

    await postComment(comment)
      .then(() => {
        setButtonText("Success");
        resetFormData();
      })
      .catch(() => {
        setButtonText("Error");
        setIsLoad(false);
      });

    fetchCaptcha();
  };

  const handleClose = () => {
    setOpenForm(false);
    resetFormData();
  };

  const resetFormData = () => {
    setIsLoad(false);
    setAvatar("none");
    setCommentText("");
    setEmail("");
    setUserName("");
    setHomePage("");
    setCapthcaText("");
    setIsVisible(false);
    setIsError(false);
    setErrorMessage("");
  };

  useEffect(() => {
    if (
      !isCorrectUserName(userName) ||
      !isValidTag(commentText) ||
      !hasAllTagsClosed(commentText)
    ) {
      setIsError(true);
    }

    if (!isCorrectUserName(userName) && userName.trim().length > 0) {
      setErrorMessage(ErrorMessage.UserName);
    }

    if (!isValidTag(commentText)) {
      setErrorMessage(ErrorMessage.NotValidTag);
    }

    if (!hasAllTagsClosed(commentText)) {
      setErrorMessage(ErrorMessage.CloseTag);
    }

    if (
      isCorrectUserName(userName) &&
      isValidTag(commentText) &&
      hasAllTagsClosed(commentText)
    ) {
      setIsError(false);
      setErrorMessage("");
    }
  }, [userName, commentText]);

  return (
    <Modal
      open={openForm}
      onClose={setOpenForm}
      style={{ maxHeight: "100%", overflow: "auto" }}
    >
      <Box
        style={{
          backgroundColor: "white",
          maxWidth: "600px",
          margin: "30px auto",
          padding: "5px 40px 40px",
          borderRadius: "40px",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
              paddingTop: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`avatars/${avatar}.png`}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "lightgray",
              }}
            />
            <Box style={{ maxWidth: "max-content" }}>
              <Button variant="outlined" size="small" onClick={handleClick}>
                Change avatar
              </Button>
            </Box>
            {isVisible && (
              <Box style={{ display: "flex", gap: "10px" }}>
                <Button onClick={() => handleChangeAvatar("none")}>
                  <Avatar
                    src={`avatars/none.png`}
                    style={{ cursor: "pointer", width: "40px", height: "40px" }}
                  />
                </Button>
                <Button onClick={() => handleChangeAvatar("man")}>
                  <Avatar
                    src={`avatars/man.png`}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "lightgray",
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </Button>
                <Button onClick={() => handleChangeAvatar("woman")}>
                  <Avatar
                    src={`avatars/woman.png`}
                    style={{
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                      backgroundColor: "lightgray",
                    }}
                  />
                </Button>
              </Box>
            )}
          </Box>
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
              <Input
                id="userName"
                aria-describedby="my-helper-text"
                value={userName}
                onChange={(event) => handleChangeInput(event, setUserName)}
                error={isError && errorMessage === ErrorMessage.UserName}
              />
              <FormHelperText id="my-helper-text">
                {errorMessage === ErrorMessage.UserName ? (
                  <Typography style={{ color: "red" }}>
                    {errorMessage}
                  </Typography>
                ) : (
                  "Must contain only Latin letters and numbers"
                )}
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
                type="url"
                value={homePage}
                onChange={(event) => handleChangeInput(event, setHomePage)}
              />
              <FormHelperText id="my-helper-text">URL format</FormHelperText>
            </FormControl>
            <Box>
              <TextInput
                commentText={commentText}
                setCommentText={setCommentText}
                setErrorMessage={setErrorMessage}
              />
            </Box>
            {(errorMessage === ErrorMessage.NotValidTag ||
              errorMessage === ErrorMessage.CloseTag) && (
              <Typography style={{ color: "red" }}>{errorMessage}</Typography>
            )}
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <FormControl>
                <InputLabel htmlFor="captcha" required>
                  Captcha
                </InputLabel>
                <Input
                  id="captcha"
                  aria-describedby="my-helper-text"
                  value={captchaText}
                  onChange={(event) => handleChangeInput(event, setCapthcaText)}
                  required
                />
                <FormHelperText id="my-helper-text">
                  Enter the text from the captcha
                </FormHelperText>
              </FormControl>
              <Box
                style={{
                  height: "60px",
                  width: "148px",
                  border: "1px solid lightblue",
                }}
              >
                <img
                  src={captchaURL}
                  alt="Captcha"
                  style={{
                    height: "60px",
                    width: "148px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Button
                variant="outlined"
                type="submit"
                style={{ width: "88px" }}
                disabled={isError}
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
