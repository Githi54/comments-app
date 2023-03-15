import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Modal,
} from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  openForm: boolean;
  handleCloseForm: () => void;
  handleSubmit: () => void;
};

export const AddForm: React.FC<Props> = ({
  openForm,
  handleCloseForm,
  handleSubmit,
}) => {
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
              maxWidth: "200px",
            }}
          >
            <FormControl>
              <InputLabel htmlFor="userName" required>
                User name
              </InputLabel>
              <Input id="userName" aria-describedby="my-helper-text" />
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
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
