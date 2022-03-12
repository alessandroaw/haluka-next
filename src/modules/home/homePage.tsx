import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import logoImg from "public/images/png/logo.png";
import heroImg from "public/images/svg/login-hero.svg";
import { kGridSpacingDefault } from "src/utils/constant";
import { LoginForm } from "./loginForm";

export const HomePage: NextPage = () => (
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
        <Box>
          <Image src={logoImg} width={90} height={40.5} layout="intrinsic" />
        </Box>
        <Grid container spacing={kGridSpacingDefault} alignItems="center">
          <LoginHero />
          <LoginForm />
        </Grid>
        <Footer />
      </Stack>
    </Container>
  </Box>
);

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
      <Image src={heroImg} width={632} height={346.83} layout="responsive" />
    </Grid>
  );
};
