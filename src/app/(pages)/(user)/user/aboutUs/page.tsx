// pages/index.js
"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SecurityIcon from "@mui/icons-material/Security";
import FistIcon from "@mui/icons-material/FitnessCenterOutlined"; // Using as a fist icon replacement
import PeopleIcon from "@mui/icons-material/People";
import Head from "next/head";
import image1 from "../../../../assets/Images/image1.png";
import image2 from "../../../../assets/Images/image2.png";
import image3 from "../../../../assets/Images/image3.png";
import Image from "next/image";
let theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#FFD700", // Gold color
    },
    background: {
      default: "#000000",
      paper: "#111111",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

theme = responsiveFontSizes(theme);

export default function Home() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Bluemines - Your UK-Based Gateway to Crypto Wealth</title>
        <meta
          name="description"
          content="Discover the Future of Secure and Profitable Crypto Mining, Right from the Heart of the UK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          pb: 8,
        }}
      >
        {/* About Us Section */}
        <Container maxWidth="xl">
          <Box sx={{ pt: 5, pb: 3 }}>
            <Typography variant="h6" component="h1" sx={{ mb: 2 }}>
              About Us
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              Welcome to Bluemines – Your UK-Based Gateway to Crypto
              Wealth!
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 5 }}>
              Discover the Future of Secure and Profitable Crypto Mining, Right
              from the Heart of the UK
            </Typography>
          </Box>

          {/* Our Story Section */}
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            Our Story
          </Typography>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: { xs: 4, md: 4 },
            }}
          >
            <Grid container>
              <Grid >
                <Box>
                  <Typography paragraph>
                    Based in the vibrant and innovative landscape of the United
                    Kingdom, Bluemines was founded in 2023, with a simple
                    yet powerful vision: to make crypto mining accessible,
                    secure, and profitable for everyone.
                  </Typography>
                  <Typography paragraph>
                    Our journey began when a group of blockchain enthusiasts and
                    financial experts came together to address the challenges of
                    traditional crypto mining. We saw an opportunity to create a
                    platform that combines cutting-edge technology with
                    transparency and trust, all while adhering to the highest
                    standards of UK regulations.
                  </Typography>
                  <Typography paragraph>
                    Today, Bluemines is proud to be a leading name in the
                    crypto mining industry, helping users worldwide unlock their
                    financial potential.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid >
              <Grid container spacing={2}>
                <Grid>
                  <Image src={image1} alt="image" />
                </Grid>
                <Grid>
                  <Image src={image2} alt="image" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Our Mission Section */}
          <Paper
            elevation={3}
            sx={{
              bgcolor: "background.paper",
              p: { xs: 3, md: 5 },
              borderRadius: 2,
              mt: 8,
              mb: 8,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              align="center"
              sx={{ mb: 4 }}
            >
              Our Mission
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Our mission is to empower individuals to grow their wealth through
              secure and efficient crypto mining. We're committed to providing a
              platform that is not only profitable but also transparent,
              user-friendly, and fully compliant with UK financial regulations.
            </Typography>
            <Typography variant="body1" align="center">
              At Bluemines, we believe that everyone should have the
              opportunity to benefit from the crypto revolution – and we're here
              to make that happen.
            </Typography>
          </Paper>

          {/* Features Section */}
          <Grid container spacing={4}>
            <Grid >
              <List>
                <ListItem>
                  <ListItemText
                    primary="1. Daily Profits:"
                    secondary="Earn consistent rewards on your investments with our optimized mining plans."
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="2. UK-Based & Regulated:"
                    secondary="As a UK-based platform, we adhere to strict financial and data protection regulations, ensuring your security and peace of mind."
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="3. Global Reach, Local Trust:"
                    secondary="While we serve users worldwide, our roots in the UK reflect our commitment to trust, transparency, and innovation."
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="4. User-Friendly Platform"
                    secondary="Our intuitive interface makes crypto mining easy for everyone, from beginners to experts."
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="5. Referral Program:"
                    secondary="Share the treasure with friends and earn extra rewards through our referral system."
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="6. Expert Support:"
                    secondary="Our dedicated team is here to assist you 24/7 with any questions or concerns."
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid >
              <Image src={image3} alt="image" />
            </Grid>
          </Grid>

          {/* Our Values Section */}
          <Box sx={{ my: 8 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
              Our Values
            </Typography>
            <Grid container spacing={3}>
              <Grid >
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <LightbulbIcon sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Innovation
                    </Typography>
                    <Typography variant="body2">
                      We stay ahead of the curve by adopting the latest
                      advancements in blockchain technology.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid >
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <SecurityIcon sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Trust
                    </Typography>
                    <Typography variant="body2">
                      As a UK-based platform we prioritize transparency,
                      security, and compliance.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid >
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <FistIcon sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Empowerment:
                    </Typography>
                    <Typography variant="body2">
                      We empower our users to take control of their financial
                      future through crypto mining.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid >
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <PeopleIcon sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Community:
                    </Typography>
                    <Typography variant="body2">
                      We believe in the power of community and strive to create
                      a platform where everyone can thrive.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Team Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="subtitle1" sx={{ mb: 4 }}>
              Our team combines years of experience to ensure that your crypto
              journey is smooth and profitable.
            </Typography>
            <Grid container spacing={4}>
              <Grid >
                <Card sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
                  <Box
                    component="img"
                    src="/api/placeholder/300/300"
                    alt="Team member"
                    sx={{ width: "100%" }}
                  />
                  <CardContent>
                    <Typography variant="h6">Richard Th.</Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Founder & CEO
                    </Typography>
                    <Typography variant="body2">
                      A visionary leader with [X] years of experience in
                      blockchain technology and UK financial regulations.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid>
                <Card sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
                  <Box
                    component="img"
                    src="/api/placeholder/300/300"
                    alt="Team member"
                    sx={{ width: "100%" }}
                  />
                  <CardContent>
                    <Typography variant="h6">Richard Th.</Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      CTO
                    </Typography>
                    <Typography variant="body2">
                      A tech expert responsible for building our secure and
                      efficient mining infrastructure.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid >
                <Card sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
                  <Box
                    component="img"
                    src="/api/placeholder/300/300"
                    alt="Team member"
                    sx={{ width: "100%" }}
                  />
                  <CardContent>
                    <Typography variant="h6">Richard Th.</Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Head of Customer Support
                    </Typography>
                    <Typography variant="body2">
                      Your go-to person for any questions or assistance.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* UK Commitment Section */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  component="img"
                  src="/api/placeholder/300/200"
                  alt="UK flag"
                  sx={{ maxWidth: "100%" }}
                />
              </Box>
            </Grid>
            <Grid >
              <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
                Our Commitment to the UK and Beyond
              </Typography>
              <Typography paragraph>
                As a UK-based company, we're proud to operate under the robust
                regulatory framework of one of the world's most trusted
                financial hubs. Our compliance with UK laws ensures that your
                data and investments are protected at all times.
              </Typography>
              <Typography paragraph>
                But our vision doesn't stop at the UK. Bluemines is a
                global platform, serving users from all corners of the world.
                Whether you're in London, New York, or Tokyo, we're here to help
                you unlock your crypto treasure.
              </Typography>
            </Grid>
          </Grid>

          {/* Community Section */}
          <Paper
            elevation={3}
            sx={{
              bgcolor: "background.paper",
              p: { xs: 3, md: 5 },
              borderRadius: 2,
              mb: 8,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              align="center"
              sx={{ mb: 2 }}
            >
              Join the Bluemines Community
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              We're more than just a platform – we're a community of like-minded
              individuals who believe in the power of cryptocurrency. Whether
              you're here to grow your wealth, learn about crypto, or connect
              with others, Bluemines is your partner in this exciting
              journey.
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 1 }}>
              Ready to unlock your crypto treasure?
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Join us today and start earning daily profits!
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button variant="contained" color="secondary" size="large">
                Join Now
              </Button>
            </Box>
          </Paper>

          {/* UK Platform Advantages */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
              Key Additions for a UK-Based Platform
            </Typography>
            <Grid container spacing={4}>
              <Grid >
                <List>
                  <ListItem>
                    <ListItemText
                      primary="1. Regulatory Compliance:"
                      secondary="Highlight your adherence to UK financial and data protection laws."
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="2. Global Appeal:"
                      secondary="Emphasize that while you're UK-based, you serve a global audience."
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="3. Trust And Security:"
                      secondary="Use the UK's reputation for financial integrity to build trust."
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="4. Local Roots, Global Vision:"
                      secondary="Showcase your connection to the UK while appealing to international users."
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid >
                <Box
                  component="img"
                  src="/api/placeholder/400/300"
                  alt="UK map"
                  sx={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
