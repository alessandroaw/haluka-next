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
import { HalukaContainer } from "src/components/container";
import { HalukaTitle } from "src/components/head";

const LoginTitle: React.FC = () => <HalukaTitle title="Login" />;

export const LoginPage: NextPage = () => {
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
        <LoginTitle />
        <Stack justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Stack>
      </Container>
    );
  }

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        backgroundImage: `url(images/png/login-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }}
    >
      <HalukaContainer
        // maxWidth="lg"
        sx={{
          pt: 4,
        }}
      >
        <LoginTitle />
        <HalukaLogo />
      </HalukaContainer>
      <Container>
        <Grid container spacing={kGridSpacingDefault} alignItems="center">
          <LoginHero />
          <LoginForm />
        </Grid>
      </Container>
      <HalukaContainer>
        <Footer />
      </HalukaContainer>
    </Stack>
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
