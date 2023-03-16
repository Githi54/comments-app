import { useCallback } from "react";
import { IconButton, Paper, Tooltip } from "@material-ui/core";
import { Link as LinkIcon, Attachment as AttachmentIcon, FormatBold as BoldIcon, FormatItalic as ItalicIcon } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    height: "100px",
    border: "1px solid"
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
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "1rem"
  },
  iconButton: {
    padding: 8,
  },
}));

type Props = {
    commentText: string;
    setCommetText: (arg: string) => void;
}

export const TextInput: React.FC<Props> = ({ commentText, setCommetText}) => {
    const classes = useStyles();
  
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommetText(event.target.value);
    }, [commentText]);
  
    // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const fileList = event.target.files;
    //   // Process the files here
    // };
  
    // const handleLinkClick = () => {
    //   // Open a dialog or popover to input the link here
    // };
  
    const handleBoldClick = useCallback(() => {
      setCommetText(`<b>${commentText}</b>`);
    }, [commentText]);
  
    const handleItalicClick = useCallback(() => {
        setCommetText(`<i>${commentText}</i>`);
      }, [commentText]);
  
    return (
      <Paper component="div" className={classes.root}>
        <textarea
          className={classes.input}
          placeholder="Type comment"
          value={commentText}
          onChange={handleInputChange}
        />
        <Tooltip title="Attach a file">
          <IconButton component="label" className={classes.iconButton}>
            <AttachmentIcon />
            <input type="file" hidden />
          </IconButton>
        </Tooltip>
        <Tooltip title="Insert a link">
          <IconButton className={classes.iconButton}>
            <LinkIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bold text">
          <IconButton className={classes.iconButton} onClick={handleBoldClick}>
            <BoldIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italicize text">
          <IconButton className={classes.iconButton} onClick={handleItalicClick}>
            <ItalicIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    );
  };