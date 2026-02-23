// CommonTable.tsx

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Pagination,
  Box,
} from "@mui/material";

const CommonTable = ({
  columns,
  rows,
  loading,
  page,
  totalPages,
  onPageChange,
}: any) => {
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#fafafa" }}>
            {columns.map((col: any) => (
              <TableCell
                key={col.field}
                sx={{
                  fontWeight: 600,
                  color: "#555",
                }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows?.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{
                "&:hover": {
                  background: "#f9fafb",
                },
              }}
            >
              {columns.map((col: any) => (
                <TableCell key={col.field}>
                  {col.render ? col.render(row) : row[col.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, value) => onPageChange(value - 1)}
          />
        </Box>
      )}
    </Box>
  );
};

export default CommonTable;