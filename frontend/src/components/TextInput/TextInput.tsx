import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Box, IconButton, Input, Paper, Tooltip } from "@material-ui/core";
import {
  Link as LinkIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    height: "100px",
    border: "1px solid gray",
    justifyContent: "space-between",
  },
  input: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    resize: "none",
    overflow: "auto",
    minHeight: "80px",
    border: "none",
    outline: "none",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "1rem",
  },
  iconButton: {
    padding: 8,
  },
}));

type Props = {
  commentText: string;
  setCommentText: (arg: string) => void;
  setErrorMessage: (str: string) => void;
};

export const TextInput: React.FC<Props> = ({
  commentText,
  setCommentText,
  setErrorMessage,
}) => {
  const classes = useStyles();
  const [isViewLinkInput, setIsViewLinkInput] = useState(false);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (commentText.trim().length > 0) {
      setText(commentText);
    }

    if (commentText.length === 0) {
      setText("Type comment");
    }
  }, [commentText, text]);

  const handleInputChange = useCallback(
    (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      setState: (arg: string) => void
    ) => {
      setState(event.target.value);
      setErrorMessage("");
    },
    []
  );

  const handleClickText = useCallback(
    (tag: string) => {
      const selectedText = window.getSelection();

      if (`${selectedText}`.includes(`<${tag}>`)) {
        return;
      }

      if (`${selectedText}`.length > 0) {
        setCommentText(
          commentText.replace(
            `${selectedText}`,
            `<${tag}>${selectedText}</${tag}>`
          )
        );

        return;
      }

      if (commentText.includes(`<${tag}>${commentText}</${tag}>`)) {
        return;
      }

      setCommentText(`<${tag}>${commentText}</${tag}>`);
    },
    [commentText]
  );

  const handleAddedLink = useCallback(() => {
    const selectedText = window.getSelection();

    if (!link.trim().length) {
      return;
    }

    if (`${selectedText}`.length > 0) {
      setCommentText(
        commentText.replace(
          `${selectedText}`,
          `<a href=${link}>${selectedText}</a>`
        )
      );

      return;
    }

    setCommentText(`<a href=${link}>${commentText}</a>`);
    setIsViewLinkInput(false);
  }, [commentText, link]);

  const handleLinkView = useCallback(() => {
    setIsViewLinkInput(!isViewLinkInput);
  }, [isViewLinkInput]);

  return (
    <Box style={{ position: "relative" }}>
      {isViewLinkInput && (
        <Box style={{ position: "absolute", bottom: 15, left: 5, zIndex: 3 }}>
          <Box
            style={{
              display: "flex",
              position: "relative",
              border: "2px solid lightblue",
            }}
          >
            <Input
              style={{
                display: "block",
                maxWidth: "200px",
                backgroundColor: "white",
              }}
              onChange={(event) => handleInputChange(event, setLink)}
            />
            <Tooltip
              title="Insert a link"
              style={{ position: "absolute", right: 0 }}
            >
              <IconButton
                size="small"
                onClick={handleAddedLink}
                style={{ border: "1px solid transparent" }}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
      <Paper component="div" className={classes.root}>
        <Box style={{ position: "relative" }}>
          <textarea
            className={classes.input}
            placeholder="Type comment"
            value={commentText}
            onChange={(event) => handleInputChange(event, setCommentText)}
            required
          />
        </Box>
        <Box>
          <Tooltip title="Insert a link">
            <IconButton className={classes.iconButton} onClick={handleLinkView}>
              <LinkIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bold text">
            <IconButton
              className={classes.iconButton}
              onClick={() => handleClickText("strong")}
            >
              <BoldIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italicize text">
            <IconButton
              className={classes.iconButton}
              onClick={() => handleClickText("i")}
            >
              <ItalicIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};
