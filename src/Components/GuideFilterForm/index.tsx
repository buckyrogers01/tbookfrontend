// GuideFilterForm.tsx

import { Button, TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";

const GuideFilterForm = ({ onSubmit }: any) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          label="Email"
          size="small"
          {...register("email")}
        />

        <TextField
          label="Base Location"
          size="small"
          {...register("baseLocation")}
        />

        <TextField
          label="Experience"
          type="number"
          size="small"
          {...register("experienceYears")}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            height: 40,
            px: 4,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          Search
        </Button>
      </Box>
    </form>
  );
};

export default GuideFilterForm;