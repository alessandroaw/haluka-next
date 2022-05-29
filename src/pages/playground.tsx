import { Container, Box, Stack, Typography } from "@mui/material";
import { NextPage } from "next";

const PlaygroundPage: NextPage = () => (
  <Container>
    <Stack spacing={2}>
      <Stack>
        <Typography variant="display-lg">Display Large</Typography>
        <Typography variant="display-md">Display Medium</Typography>
        <Typography variant="display-sm">Display Small</Typography>
      </Stack>
      <Stack>
        <Typography variant="headline-lg">Headline Large</Typography>
        <Typography variant="headline-md">Headline Medium</Typography>
        <Typography variant="headline-sm">Headline Small</Typography>
      </Stack>
      <Stack>
        <Typography variant="title-lg">Title Large</Typography>
        <Typography variant="title-md">Title Medium</Typography>
        <Typography variant="title-sm">Title Small</Typography>
      </Stack>
      <Stack>
        <Typography variant="label-lg">Label Large</Typography>
        <Typography variant="label-md">Label Medium</Typography>
        <Typography variant="label-sm">Label Small</Typography>
      </Stack>
      <Stack>
        <Typography variant="body-lg">Body Large</Typography>
        <Typography variant="body-md">Body Medium</Typography>
        <Typography variant="body-sm">Body Small</Typography>
      </Stack>
    </Stack>
  </Container>
);

export default PlaygroundPage;
