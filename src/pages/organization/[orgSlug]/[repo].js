import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import CustomTable from "@/components/CustomTable";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({setOpen, open}) {
  
 
  const handleClose = () => setOpen(false);

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

  );
}


export default function repo() {
const [open, setOpen] = useState(false);

const clickHandler = () => {
    setOpen(true)
  };
  
  const router = useRouter();
  const repoId = router.query.repo;

  const rows = [
    { id: 1, envName: "Production" },
    { id: 2, envName: "Staging" },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "envName", headerName: "Env Name", width: 200 },
  ];
  return (
    <>
      <Typography variant="h3">Envs</Typography>
      <CustomTable
        rows={rows}
        columns={columns}
        clickRowHandler={clickHandler}
      />{" "}
       <BasicModal open={open} setOpen={setOpen} />
    </>
  );
}
