import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

function Requests() {
  const requests = [
    {
      id: 1,
      user: "21CS001",
      field: "Phone Number",
      status: "Pending",
    },
  ];

  return (
    <Box>
      <Typography variant="h5" color="white" mb={3}>
        Profile Update Requests
      </Typography>

      <Paper sx={paperStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Requested Field</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.user}</TableCell>
                <TableCell>{req.field}</TableCell>
                <TableCell>{req.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" sx={{ mr: 1 }}>
                    Approve
                  </Button>
                  <Button variant="contained" color="error">
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

const paperStyle = {
  p: 3,
  borderRadius: 3,
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255,255,255,0.2)",
};

export default Requests;