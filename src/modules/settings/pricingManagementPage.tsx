import {
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { NextPage } from "next";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { RoundedButton } from "src/components/button";
import { SnackBarAlert } from "src/components/snackbar";
import { updateClient } from "src/repositories/clients";
import { useSnackBarControl } from "src/shared-hooks/useSnackbarControl";
import { useClient } from "src/swr-cache/useClient";
import * as Yup from "yup";
import { SaveChangeConfirmationDialog } from "./saveChangeConfirmationDialog";
import {
  kSettingFormMaxWidth,
  SettingsBorderBox,
  SettingsLayout,
} from "./settingsLayout";

const validationSchema = Yup.object({
  freeOfChargeDuration: Yup.number().required("Durasi Tanpa Biaya harus diisi"),
  chargePeriod: Yup.number().required("Periode Perhitugan Biaya harus diisi"),
  pricePerPeriod: Yup.number().required(
    "Biaya Per Periode pembayaran harus diisi"
  ),
});

export const PricingManagementPage: NextPage = () => {
  const { client, loading, mutate, error } = useClient();
  const [open, setOpen] = React.useState(false);
  const { sbOpen, sbMessage, sbSeverity, handleSbClose, handleSbOpen } =
    useSnackBarControl({});

  if (loading) {
    return (
      <SettingsLayout>
        <SettingsBorderBox>
          <Stack spacing={3}>
            {Array.from(Array(3).keys()).map((_, index) => (
              <PricingFieldSkeleton key={index} />
            ))}
          </Stack>
        </SettingsBorderBox>
      </SettingsLayout>
    );
  }

  if (error || !client) {
    return (
      <SettingsLayout>
        <GenericErrorAlert />
      </SettingsLayout>
    );
  }

  const { freeOfChargeDuration, chargePeriod, pricePerPeriod } = client;

  return (
    <SettingsLayout>
      <Formik
        initialValues={{
          freeOfChargeDuration: freeOfChargeDuration,
          pricePerPeriod: pricePerPeriod,
          chargePeriod: chargePeriod,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateClient(values);
            mutate({ ...client, ...values });
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
                <PricingField
                  value={values.freeOfChargeDuration}
                  name="freeOfChargeDuration"
                  label="Durasi Tanpa Biaya"
                  description="Durasi tanpa biaya digunakan untuk memberikan penelpon kompensasi waktu yang terbuang ketika memulai panggilan."
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  disabled={isSubmitting}
                  adornment="Detik"
                  error={
                    touched.freeOfChargeDuration &&
                    Boolean(errors.freeOfChargeDuration)
                  }
                  helperText={
                    touched.freeOfChargeDuration && errors.freeOfChargeDuration
                  }
                />
                <PricingField
                  value={values.chargePeriod}
                  name="chargePeriod"
                  label="Periode Perhitugan Biaya"
                  description="Periode perhitungan biaya adalah satuan periode waktu yang digunakan untuk mengkalkulasi biaya dari setiap panggilan."
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  disabled={isSubmitting}
                  adornment="Detik"
                  error={touched.chargePeriod && Boolean(errors.chargePeriod)}
                  helperText={touched.chargePeriod && errors.chargePeriod}
                />
                <PricingField
                  value={values.pricePerPeriod}
                  name="pricePerPeriod"
                  label="Biaya Per Periode"
                  description="Biaya per periode adalah biaya yang dikenakan kepada penelpon untuk setiap satuan periode waktu perhitungan biaya."
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  adornment="Rp"
                  disabled={isSubmitting}
                  error={
                    touched.pricePerPeriod && Boolean(errors.pricePerPeriod)
                  }
                  helperText={touched.pricePerPeriod && errors.pricePerPeriod}
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
    </SettingsLayout>
  );
};

interface PricingFieldProps {
  value: number;
  name: string;
  label: string;
  description: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false;
  disabled?: boolean;
  adornment?: "Rp" | "Detik";
}

const PricingField: React.FC<PricingFieldProps> = ({
  value,
  name,
  label,
  description,
  handleChange,
  handleBlur,
  disabled,
  error,
  helperText,
  adornment,
}) => {
  const getAdornment = () => {
    if (adornment === "Rp") {
      return {
        startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
      };
    }
    if (adornment === "Detik") {
      return {
        endAdornment: <InputAdornment position="end">Detik</InputAdornment>,
      };
    }
    return undefined;
  };

  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="title-lg" gutterBottom>
          {label}
        </Typography>
        <Typography variant="body-sm">{description}</Typography>
      </Stack>
      <TextField
        label={label}
        name={name}
        value={value}
        type="number"
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        helperText={helperText}
        InputProps={getAdornment()}
        sx={{
          maxWidth: "328px",
        }}
      />
    </Stack>
  );
};

const PricingFieldSkeleton: React.FC = () => {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="title-lg">
          <Skeleton sx={{ maxWidth: "40%" }} />
        </Typography>
        <Typography variant="body-sm">
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
