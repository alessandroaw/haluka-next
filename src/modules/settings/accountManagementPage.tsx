import {
  Alert,
  Box,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, useFormikContext } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import underConstructionImg from "public/images/png/under-construction.png";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { RoundedButton } from "src/components/button";
import { FilterChip } from "src/components/chip";
import { SnackBarAlert } from "src/components/snackbar";
import { updateClient } from "src/repositories/clients";
import { updateUser } from "src/repositories/users";
import { useSnackBarControl } from "src/shared-hooks/useSnackbarControl";
import { useClient } from "src/swr-cache/useClient";
import { useUserList } from "src/swr-cache/useUserList";
import { User } from "src/types/models";
import { mutate } from "swr";
import * as Yup from "yup";
import { SaveChangeConfirmationDialog } from "./saveChangeConfirmationDialog";
import {
  kSettingFormMaxWidth,
  SettingsBorderBox,
  SettingsLayout,
} from "./settingsLayout";

const validationSchema = Yup.object({
  name: Yup.string().required("Nama wartel harus diisi"),
  // password is required and at least 8 characters long and should not contain trailint spaces
  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .matches(/^\S+$/, "Password tidak boleh mengandung spasi")
    .required(),
  // confirmPassword is required and should match password
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Password dan konfirimasi password harus sama"
    )
    .required("Konfirmasi password harus diisi"),
});

export const AccountManagementPage: NextPage = () => {
  const { users, loading, mutate, error } = useUserList();
  const [userIndex, setUserIndex] = React.useState<number>(0);
  const handleFilterClick = (index: number) => () => {
    setUserIndex(index);
  };

  if (loading) {
    return (
      <SettingsLayout>
        <SettingsBorderBox>
          <Stack spacing={3}>
            {Array.from(Array(3).keys()).map((_, index) => (
              <AccountFieldSkeleton key={index} />
            ))}
          </Stack>
        </SettingsBorderBox>
      </SettingsLayout>
    );
  }

  if (error || !users) {
    return (
      <SettingsLayout>
        <GenericErrorAlert />
      </SettingsLayout>
    );
  }

  const mutateByUserIndex = (newName: string) => {
    const newUsers = [...users];
    newUsers[userIndex].name = newName;
    mutate(newUsers);
  };

  return (
    <SettingsLayout>
      <Stack mb={3} direction="row" spacing={1}>
        {users.map(({ id, name, role }, index) => (
          <FilterChip
            key={id}
            label={role === 1 ? "Admin" : name}
            active={index === userIndex}
            onClick={handleFilterClick(index)}
          />
        ))}
      </Stack>
      <AccountSettingForm
        userId={users[userIndex].id}
        isAdmin={users[userIndex].role === 1}
        initialWartelName={users[userIndex].name}
        mutateByUserIndex={mutateByUserIndex}
      />
    </SettingsLayout>
  );
};

interface AccountSettingFormProps {
  userId: string;
  isAdmin?: boolean;
  initialWartelName: string;
  mutateByUserIndex: (newName: string) => void;
}

const AccountSettingForm: React.FC<AccountSettingFormProps> = ({
  userId,
  isAdmin = false,
  initialWartelName,
  mutateByUserIndex,
}) => {
  const { client, error } = useClient();
  const [openField, setOpenField] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { sbOpen, sbMessage, sbSeverity, handleSbClose, handleSbOpen } =
    useSnackBarControl({});

  const defaultPassword = "d3f4uxasa1uka";

  React.useEffect(() => {
    setOpenField(false);
  }, [userId]);

  return (
    <Formik
      initialValues={{
        name: initialWartelName,
        password: defaultPassword,
        confirmPassword: defaultPassword,
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const password =
            values.password === defaultPassword ? undefined : values.password;
          await updateUser(userId, values.name, password);
          mutateByUserIndex(values.name);
          mutate("/user/profile", (user: User) => {
            user.name = values.name;
            return user;
          });
          handleSbOpen("info", `Berhasil menyimpan perubahan`);
        } catch (error) {
          handleSbOpen("error", `Terjadi kesalahan saat menyimpan perubahan`);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        handleBlur,
        handleChange,
        values,
        touched,
        errors,
        submitForm,
        setFieldValue,
        isSubmitting,
      }) => (
        <Stack
          spacing={3}
          mb={5}
          width="100%"
          maxWidth={kSettingFormMaxWidth}
          alignItems="flex-end"
        >
          <SettingsBorderBox>
            <SnackBarAlert
              open={sbOpen}
              message={sbMessage}
              severity={sbSeverity}
              onClose={handleSbClose}
            />
            <Stack spacing={3}>
              {/* Render Client name in disabled form if user is admin and no data fetching error */}
              {isAdmin ? (
                client ? (
                  <AccountField
                    value={client.clientName}
                    name=""
                    label={"ID Klien"}
                    description={
                      "ID klien adalah nama unik yang digunakan untuk keperluan autentikasi admin dan KBU. ID klien tidak dapat diubah."
                    }
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    disabled
                  />
                ) : error ? (
                  <GenericErrorAlert />
                ) : (
                  <AccountFieldSkeleton />
                )
              ) : null}
              <AccountField
                value={values.name}
                name="name"
                label={isAdmin ? "Nama Klien" : "Nama Wartel"}
                description={
                  isAdmin
                    ? "Nama klien digunakan sebagai identitas dari institusi Anda."
                    : "Nama wartel digunakan sebagai identitas dari wartel serta diperlukan untuk autentiksai wartel dan KBU."
                }
                handleChange={handleChange}
                handleBlur={handleBlur}
                disabled={isSubmitting}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <PasswordField
                passwordValue={values.password}
                confirmPasswordValue={values.confirmPassword}
                openField={openField}
                handleOpenField={() => {
                  setFieldValue("password", "");
                  setFieldValue("confirmPassword", "");
                  setOpenField(true);
                }}
                label={isAdmin ? "Kata Sandi Admin" : "Kata Sandi Wartel"}
                description={
                  isAdmin
                    ? "Kata sandi admin digunakan untuk keperluan autentikasi admin."
                    : "Kata sandi wartel digunakan untuk keperluan autentikasi wartel."
                }
                handleChange={handleChange}
                handleBlur={handleBlur}
                disabled={isSubmitting}
                error={touched.password && Boolean(errors.password)}
                confirmPasswordError={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.password && errors.password}
                confirmPasswordHelperText={
                  touched.confirmPassword && errors.confirmPassword
                }
              />
            </Stack>
          </SettingsBorderBox>
          <RoundedButton
            onClick={() => setOpen(true)}
            loading={isSubmitting}
            type="submit"
            variant="contained"
            sx={{
              alignSelf: "flex-end",
            }}
          >
            Simpan perubahan
          </RoundedButton>
          <SaveChangeConfirmationDialog
            open={open}
            onClose={() => setOpen(false)}
            loading={isSubmitting}
            onConfirm={() => submitForm()}
          />
        </Stack>
      )}
    </Formik>
  );
};
interface PassowrdFieldProps {
  openField: boolean;
  handleOpenField: () => void;
  passwordValue: string;
  confirmPasswordValue: string;
  label: string;
  description: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false;
  confirmPasswordError?: boolean;
  confirmPasswordHelperText?: string | false;
  disabled?: boolean;
  type?: string;
}

const PasswordField: React.FC<PassowrdFieldProps> = ({
  openField,
  handleOpenField,
  passwordValue,
  confirmPasswordValue,
  label,
  description,
  handleChange,
  handleBlur,
  disabled,
  error,
  confirmPasswordError,
  helperText,
  confirmPasswordHelperText,
}) => {
  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="title-lg" gutterBottom>
          {label}
        </Typography>
        <Typography variant="body-md">{description}</Typography>
      </Stack>
      {openField ? (
        <>
          <TextField
            label="Kata Sandi Baru"
            name="password"
            value={passwordValue}
            type="password"
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error}
            helperText={helperText}
            sx={{
              maxWidth: "328px",
            }}
          />
          <TextField
            label="Konfirmasi Kata Sandi Baru"
            name="confirmPassword"
            value={confirmPasswordValue}
            type="password"
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
            error={confirmPasswordError}
            helperText={confirmPasswordHelperText}
            sx={{
              maxWidth: "328px",
            }}
          />
          <Stack direction="row" alignItems="center" spacing={1}>
            <i className="bx bx-error-circle bx-md" />
            <Typography variant="body-sm" color="textSecondary">
              Memperbarui kata sandi memerlukan Anda untuk melakukan login
              kembali setelah kata sandi berhasil diperbarui.
            </Typography>
          </Stack>
        </>
      ) : (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography fontWeight={400} fontSize="1.5rem" variant="title-md">
            ••••••••••••
          </Typography>
          <RoundedButton onClick={handleOpenField}>Perbarui</RoundedButton>
        </Stack>
      )}
    </Stack>
  );
};

interface AccountFieldProps {
  value: string;
  name: string;
  label: string;
  description: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false;
  disabled?: boolean;
  type?: string;
}

const AccountField: React.FC<AccountFieldProps> = ({
  value,
  name,
  label,
  description,
  handleChange,
  handleBlur,
  disabled,
  error,
  type = "text",
  helperText,
}) => {
  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="title-lg" gutterBottom>
          {label}
        </Typography>
        <Typography variant="body-md">{description}</Typography>
      </Stack>
      <TextField
        label={label}
        name={name}
        value={value}
        type={type}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        helperText={helperText}
        sx={{
          maxWidth: "328px",
        }}
      />
    </Stack>
  );
};

const AccountFieldSkeleton: React.FC = () => {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="title-lg">
          <Skeleton sx={{ maxWidth: "40%" }} />
        </Typography>
        <Typography variant="body-md">
          <Skeleton sx={{ maxWidth: "80%" }} />
        </Typography>
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{ maxWidth: "328px" }}
        />
      </Stack>
    </Stack>
  );
};
