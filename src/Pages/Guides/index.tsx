import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getGuides,
  getGuideById,
  approveGuide,
  rejectGuide
} from "../../slices/guidesSlice";
import GuideFilterForm from "../../Components/GuideFilterForm";
import type { RootState } from "../../store";
import CommonTable from "../../Components/CommonTable";
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  Chip
} from "@mui/material";

const GuidesPage = () => {

  const dispatch = useDispatch<any>();

  const { data, totalPages, loading } = useSelector(
    (state: RootState) => state.guides
  );

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);
  const [guideDetail, setGuideDetail] = useState<any>(null);

  const handleSearch = (formData: any) => {
    setFilters(formData);
    dispatch(getGuides({ filters: formData, page: 0, size: 10 }));
  };

  useEffect(() => {
    dispatch(getGuides({ filters: {}, page: 0, size: 10 }));
  }, [dispatch]);

  const handleView = async (id: number) => {
    const res = await dispatch(getGuideById(id));
    setGuideDetail(res.payload);
    setOpen(true);
  };

  const handleApprove = async () => {

    await dispatch(approveGuide(guideDetail.guide.id));

    setOpen(false);

    dispatch(getGuides({ filters, page, size: 10 }));
  };

  const handleReject = async () => {

    await dispatch(rejectGuide(guideDetail.guide.id));

    setOpen(false);

    dispatch(getGuides({ filters, page, size: 10 }));
  };

  const getStatusChip = (status: string) => {

    const map: any = {
      PENDING: "warning",
      VERIFIED: "success",
      REJECTED: "error",
    };

    return <Chip label={status} color={map[status]} size="small" />;
  };

  const columns = [

    { field: "id", headerName: "ID" },

    { field: "bio", headerName: "Bio" },

    { field: "experienceYears", headerName: "Experience" },

    { field: "baseLocation", headerName: "Location" },

    {
      field: "status",
      headerName: "Status",
      render: (row: any) => getStatusChip(row.status),
    },

    {
      field: "actions",
      headerName: "Actions",
      render: (row: any) => (
        <Button variant="outlined" onClick={() => handleView(row.id)}>
          View
        </Button>
      ),
    },
  ];

  const handlePageChange = (value: number) => {

    setPage(value - 1);

    dispatch(getGuides({ filters, page: value - 1, size: 10 }));
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e0e0e0",
        }}
      >
        <GuideFilterForm onSubmit={handleSearch} />
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid #e0e0e0",
        }}
      >
        <CommonTable
          columns={columns}
          rows={data}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>

        <DialogTitle>Guide Details</DialogTitle>

        <DialogContent>

          {guideDetail && (

            <Box>

              <Typography variant="h6">Guide Info</Typography>

              <p><b>Name:</b> {guideDetail.guide.user.name}</p>

              <p><b>Email:</b> {guideDetail.guide.user.email}</p>

              <p><b>Phone:</b> {guideDetail.guide.user.phone}</p>

              <p><b>Status:</b> {getStatusChip(guideDetail.guide.status)}</p>

              <p><b>Location:</b> {guideDetail.guide.baseLocation}</p>

              <p><b>Experience:</b> {guideDetail.guide.experienceYears} years</p>

              <p><b>Languages:</b> {JSON.parse(guideDetail.guide.languages).join(", ")}</p>

              <p><b>Expertise:</b> {JSON.parse(guideDetail.guide.expertise_tags).join(", ")}</p>

              <hr />

              <Typography variant="h6">Verification</Typography>

              <p><b>ID Type:</b> {guideDetail.verification.idType}</p>

              <p><b>Emergency Phone:</b> {guideDetail.verification.emergencyPhone}</p>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>

                <Button variant="outlined" href={guideDetail.verification.idFrontKey} target="_blank">
                  View ID Front
                </Button>

                <Button variant="outlined" href={guideDetail.verification.idBackKey} target="_blank">
                  View ID Back
                </Button>

                {guideDetail.verification.certificateKey && (
                  <Button variant="outlined" href={guideDetail.verification.certificateKey} target="_blank">
                    View Certificate
                  </Button>
                )}

              </Box>

              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>

                <Button variant="contained" color="success" onClick={handleApprove}>
                  Approve Guide
                </Button>

                <Button variant="contained" color="error" onClick={handleReject}>
                  Reject Guide
                </Button>

              </Box>

            </Box>
          )}

        </DialogContent>

      </Dialog>
    </>
  );
};

export default GuidesPage;