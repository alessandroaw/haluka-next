import React from "react";
import * as Yup from "yup";
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Form, Formik } from "formik";
import { RoundedButton } from "src/components/button";
import { kGridSpacingDefault } from "src/utils/constant";
import { fetchUsersByClientName, login } from "src/repositories/ auth";
import { User } from "src/types/models";

type LoginStage = "clientNameVerification" | "loginAsCashier" | "loginAsAdmin";

const mockUsers: User[] = [
  {
    id: "751791f3-c9dc-47bd-95c3-7e83506efabf",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    clientId: "16863166-bc5c-4727-ab3d-d6818795968f",
    name: "devi",
    password: "password",
    role: 1,
  },
  {
    id: "5c8d9d99-7650-4a3a-9c70-769c8a2a73ee",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    clientId: "16863166-bc5c-4727-ab3d-d6818795968f",
    name: "warput",
    password: "password",
    role: 2,
  },
];

export const LoginForm: React.FC = () => {
  const [stage, setStage] = React.useState<LoginStage>(
    // "clientNameVerification"
    "loginAsCashier"
  );
  const [clientName, setClientName] = React.useState("");
  const [users, setUsers] = React.useState<User[]>(mockUsers);

  const loginFormMux = () => {
    switch (stage) {
      case "clientNameVerification":
        return (
          <ClientNameVerificationForm
            clientName={clientName}
            setUsers={setUsers}
            setClientName={setClientName}
            setStage={setStage}
          />
        );
      case "loginAsCashier":
      case "loginAsAdmin":
        return (
          <LoginFormInput stage={stage} users={users} setStage={setStage} />
        );
      default:
        return <Typography>Stage is not defined</Typography>;
    }
  };

  return (
    <Grid
      container
      item
      xs={6}
      spacing={kGridSpacingDefault / 2}
      justifyContent="center"
    >
      <Grid item xs={8}>
        <Typography variant="display-md">Selamat datang di Haluka!</Typography>
        <Paper
          sx={{
            mt: 5,
            py: 3,
            px: 2,
            borderRadius: "16px",
          }}
          elevation={0}
        >
          {loginFormMux()}
        </Paper>
      </Grid>
    </Grid>
  );
};

interface ClientNameVerificationFormProps {
  clientName: string;
  setStage: React.Dispatch<React.SetStateAction<LoginStage>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setClientName: React.Dispatch<React.SetStateAction<string>>;
}

const ClientNameVerificationForm: React.FC<ClientNameVerificationFormProps> = ({
  setStage,
  clientName: initialClientName,
  setUsers,
  setClientName,
}) => {
  const validationSchema = Yup.object({
    clientName: Yup.string().required("ID Klien harus diisi"),
  });

  return (
    <Stack spacing={2}>
      <Typography variant="body-md">
        Silakan masukan data Anda yang telah terdaftar untuk dapat menggunakan
        Aplikasi Haluka.
      </Typography>
      <Formik
        initialValues={{
          clientName: initialClientName,
          isAdmin: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          try {
            const users = await fetchUsersByClientName(values.clientName);
            if (users.length === 0) {
              setErrors({
                clientName: "ID Klien tidak ditemukan",
              });
            } else {
              setClientName(values.clientName);
              setUsers(users);
              setStage(values.isAdmin ? "loginAsAdmin" : "loginAsCashier");
            }
          } catch (error) {
            setErrors({
              clientName: "Terjadi kesalahan saat menghubungi server",
            });
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
          submitForm,
          touched,
          errors,
        }) => (
          <Form>
            <Stack spacing={2}>
              <TextField
                label="ID Klien"
                value={values.clientName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="clientName"
                id="clientName"
                error={touched.clientName && Boolean(errors.clientName)}
                helperText={touched.clientName && errors.clientName}
                fullWidth
              />
              {isSubmitting ? (
                <Stack justifyContent="center" alignItems="center" height={90}>
                  <CircularProgress />
                </Stack>
              ) : (
                <>
                  <RoundedButton
                    type="submit"
                    disableElevation
                    variant="contained"
                    fullWidth
                  >
                    Masuk sebagai kasir
                  </RoundedButton>
                  <RoundedButton
                    onClick={() => {
                      setFieldValue("isAdmin", true);
                      submitForm();
                    }}
                    disableElevation
                    variant="outlined"
                    fullWidth
                  >
                    Masuk sebagai admin
                  </RoundedButton>
                </>
              )}
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

interface LoginFormInputProps {
  users: User[];
  setStage: React.Dispatch<React.SetStateAction<LoginStage>>;
  stage: LoginStage;
}

const LoginFormInput: React.FC<LoginFormInputProps> = ({
  stage,
  users,
  setStage,
}) => {
  return (
    <Stack spacing={2}>
      <Box>
        <RoundedButton
          onClick={() => setStage("clientNameVerification")}
          startIcon={<i className="bx bx-left-arrow-alt" />}
        >
          Ubah ID Klien
        </RoundedButton>
      </Box>
      <Formik
        initialValues={{
          password: "",
          user:
            stage === "loginAsAdmin"
              ? users.filter((u) => u.role === 1)[0]
              : users[0],
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          try {
            const user = await login(values.user.id, values.password);
          } catch (error) {
            setErrors({
              password: "Terjadi kesalahan saat menghubungi server",
            });
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
          touched,
          errors,
        }) => (
          <Form>
            <Stack spacing={2}>
              {stage === "loginAsCashier" && (
                <Autocomplete
                  disablePortal
                  disableClearable
                  onChange={(_, newValue) =>
                    setFieldValue("user", newValue ?? "")
                  }
                  options={users.filter((u) => u.role > 1)}
                  value={values.user || null}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Wartel" />
                  )}
                />
              )}
              <TextField
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                id="password"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                fullWidth
              />
              <RoundedButton
                type="submit"
                disableElevation
                loading={isSubmitting}
                variant="contained"
                fullWidth
              >
                Masuk sebagai {stage === "loginAsAdmin" ? "admin" : "kasir"}
              </RoundedButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
