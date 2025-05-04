// import React from "react";
// import { Controller, Control, FieldErrors } from "react-hook-form";
// import { TextField } from "@mui/material";

// interface FormInputProps {
//   name: string;
//   control: Control<any>;
//   label: string;
//   type?: string;
//   errors?: FieldErrors;
//   multiline?: boolean;
//   rows?: number;
// }

// const FormInput: React.FC<FormInputProps> = ({
//   name,
//   control,
//   label,
//   type = "text",
//   errors,
//   multiline = false,
//   rows = 4,
// }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <TextField
//           {...field}
//           type={type}
//           label={label}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           multiline={multiline}
//           rows={multiline ? rows : undefined}
//           error={!!errors?.[name]}
//           helperText={errors?.[name]?.message as string}
//           InputLabelProps={{ style: { color: "#aaa" } }}
//           InputProps={{
//             style: { color: "#fff" },
//           }}
//           sx={{
//             backgroundColor: "#262626",
//             // px: 2,
//             // py: 1,
//             borderRadius: "6px",
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "#444",
//               },
//               "&:hover fieldset": {
//                 borderColor: "#666",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "#888",
//               },
//             },
//             "& .MuiInputBase-root": {
//               color: "#fff",
//             },
//           }}
//         />
//       )}
//     />
//   );
// };

// export default FormInput;
import React, { useState } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  errors?: FieldErrors;
  multiline?: boolean;
  rows?: number;
  rules?: any;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  type = "text",
  errors,
  multiline = false,
  rows = 4,
  rules,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type={isPassword && !showPassword ? "password" : "text"}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
          multiline={multiline}
          rows={multiline ? rows : undefined}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message as string}
          InputLabelProps={{ style: { color: "#aaa" } }}
          InputProps={{
            style: { color: "#fff" },
            endAdornment: isPassword && (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  sx={{ color: "#aaa" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "#262626",
            borderRadius: "6px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444",
              },
              "&:hover fieldset": {
                borderColor: "#666",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#888",
              },
            },
          }}
        />
      )}
    />
  );
};

export default FormInput;
