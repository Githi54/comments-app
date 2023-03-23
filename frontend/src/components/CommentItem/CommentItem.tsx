import { Avatar, Box, Button, Link, Typography } from "@material-ui/core";
import { IComment } from "../../types/comment.type";

type Props = {
  comment: IComment;
  answers: IComment[];
};

export const CommentItem: React.FC<Props> = ({ comment, answers }) => {
  const {
    text,
    userName,
    userAvatar,
    homePage,
    createdAt,
  } = comment;
  interface DateObj {
    data?: string;
    time?: string;
  }

  const normalizeDate = (date: string): DateObj => {
    const data =
      date.substring(8, 10) +
      "." +
      date.substring(5, 7) +
      "." +
      date.substring(0, 4);
    const time = date.substring(11, 16);

    return { data, time };
  };

  const { data, time } = (createdAt && normalizeDate(createdAt)) || {
    data: null,
    time: null,
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        gap: "15px",
        border: "1px solid gray",
        borderRadius: "5px",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "lightgrey",
          padding: "10px",
          gap: "10px",
        }}
      >
        <Avatar
          src={`avatars/${userAvatar}.png`}
          style={{ backgroundColor: "gray" }}
        />
        <Typography style={{ fontWeight: "bold" }}>
          {homePage ? <Link href={`${homePage}`} target="_blank">{userName}</Link> : userName}
        </Typography>
        <Typography
          style={{ fontSize: "12px" }}
        >{`${data} at ${time}`}</Typography>
      </Box>
      <Box>
        <Typography style={{ padding: "5px" }} dangerouslySetInnerHTML={{__html: text}} />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
      </Box>
    </Box>
  );
};
