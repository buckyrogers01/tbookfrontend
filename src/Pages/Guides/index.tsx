import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGuides } from "../../slices/guidesSlice";
import GuideFilterForm from "../../Components/GuideFilterForm";
import type { RootState } from "../../store";
import CommonTable from "../../Components/CommonTable";
import { Paper } from "@mui/material";

const GuidesPage = () => {
  const dispatch = useDispatch<any>();
  const { data, totalPages, loading } = useSelector(
    (state: RootState) => state.guides
  );

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({});

  const handleSearch = (formData: any) => {
    setFilters(formData);
    dispatch(getGuides({ filters: formData, page: 0, size: 10 }));
  };

  useEffect(() => {
    dispatch(getGuides({ filters: {}, page: 0, size: 10 }));
  }, [dispatch]);
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "bio", headerName: "Bio" },
        { field: "experienceYears", headerName: "Experience" },
        { field: "baseLocation", headerName: "Location" },

        // custom render
        {
            field: "actions",
            headerName: "Actions",
            render: (row: any) => (
            <button onClick={() => alert(row.id)}>View</button>
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
      {/* <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handlePageChange}
      /> */}
    </>
  );
};

export default GuidesPage;