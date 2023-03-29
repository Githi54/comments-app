import { Box, Button, Typography } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";

type Props = {
  setSortType: (arg: string) => void;
  sortType: string;
};

export const SortBy: React.FC<Props> = ({ setSortType, sortType }) => {
  const [dateName, setDateName] = useState("date");
  const [userName, setUserName] = useState("username");
  const [email, setEmail] = useState("email");

  const handleClick = useCallback(
    (sortName: string, setSortName: (arg: string) => void) => {
      if (!sortName.includes("↑") && !sortName.includes("↓")) {
        setSortType(`${sortName} ↑`);
        setSortName(`${sortName} ↑`);
      }

      if (sortName.includes("↑")) {
        setSortName(sortName.replace(" ↑", " ↓"));
        setSortType(sortName.replace(" ↑", " ↓"));
      }

      if (sortName.includes("↓")) {
        setSortName(sortName.replace(" ↓", ""));
        setSortType("none");
      }
    },
    []
  );

  useEffect(() => {
    if (dateName !== sortType) {
      setDateName("date");
    }

    if (userName !== sortType) {
        setUserName("username");
    }

    if (email !== sortType) {
        setEmail("email");
    }
  }, [sortType]);

  return (
    <Box style={{ display: "flex", alignItems: "baseline" }}>
      <Typography style={{ textTransform: "uppercase", fontSize: "14px" }}>
        Sort by:
      </Typography>
      <Button
        style={{ fontSize: "14px" }}
        onClick={() => handleClick(dateName, setDateName)}
      >
        {dateName}
      </Button>
      <Button
        style={{ fontSize: "14px" }}
        onClick={() => handleClick(userName, setUserName)}
      >
        {userName}
      </Button>
      <Button
        style={{ fontSize: "14px" }}
        onClick={() => handleClick(email, setEmail)}
      >
        {email}
      </Button>
    </Box>
  );
};
