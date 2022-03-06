import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import logoImg from "public/images/png/logo.png";
import heroImg from "public/images/svg/login-hero.svg";

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
      sx={{
        height: "100%",
        pt: 4,
      }}
    >
      <Stack height="100%" justifyContent="space-between">
        <Box>
          <Image src={logoImg} width={90} height={40.5} layout="intrinsic" />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Image
              src={heroImg}
              width={632}
              height={346.83}
              layout="responsive"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="display-lg">Hello world!</Typography>
          </Grid>
        </Grid>
        <Box>
          <Typography>Footer</Typography>
        </Box>
      </Stack>
    </Container>
  </Box>
);
