import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertCustom({ open, setOpen, text, severity }) {
  const timer = setTimeout(() => {
    open && setOpen(false);
  }, 3000);

  return (
    <div className="alertCustom">
      <Collapse in={open}>
        <Alert
          onClick={() => clearTimeout(timer)}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                timer();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity={severity}
        >
          {text}
        </Alert>
      </Collapse>
    </div>
  );
}
