import { HalukaLogo } from "src/components/logo";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import heroImg from "public/images/svg/login-hero.svg";
import { kGridSpacingDefault } from "src/utils/styles";
import { LoginForm } from "./loginForm";
import { useUser } from "src/swr-cache/useUser";
import React from "react";
import { useRouter } from "next/router";

export const HomePage: NextPage = () => {
  const { user, loading, loggedOut } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (user && !loggedOut) {
      user.role === 2
        ? router.replace("/cashier/booth-monitoring")
        : router.replace("/admin/settings/accounts");
    }
  }, [user, loggedOut]);

  if (loading) {
    return (
      <Container sx={{ height: "100vh" }}>
        <Stack justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Stack>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(images/png/login-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          pt: 4,
        }}
      >
        <Stack height="100%" justifyContent="space-between">
          <HalukaLogo />
          <Grid container spacing={kGridSpacingDefault} alignItems="center">
            <LoginHero />
            <LoginForm />
          </Grid>
          <Footer />
        </Stack>
      </Container>
    </Box>
  );
};

export const Footer: React.FC = () => (
  <Stack direction="row" width="100%" mb={3.25} justifyContent="space-between">
    <Typography variant="body-sm">
      Aplikasi Haluka dikembangkan oleh PT Solusi Data Kecerdasan Buatan - ©
      2022
    </Typography>
    <Typography variant="body-sm">Powered by solusi.ai</Typography>
  </Stack>
);

export const LoginHero: React.FC = () => {
  return (
    <Grid item xs={6}>
      <Image
        src={heroImg}
        alt="haluka-hero"
        width={632}
        height={346.83}
        layout="responsive"
      />
    </Grid>
  );
};
