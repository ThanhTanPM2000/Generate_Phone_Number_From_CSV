import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import { hasGrantedAnyScopeGoogle, useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as apis from "../apis";
import { withAuthRedirect } from "../HOC";
import axios from "axios"

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function SignIn() {
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (code: string) => {
      return apis.auth.login(code);
    },
    onSuccess: (data) => {
      navigate("/admin/dashboard")
    }
  });

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log({ tokenResponse: codeResponse });
      // const tokens = await axios.post(
      //   'https://oauth2.googleapis.com/token', {
      //   code: codeResponse.code,
      //   client_id: "883027007545-4vkoehj6mbglb5qjvs5ju6cnanvpchuo.apps.googleusercontent.com",
      //   client_secret: "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",
      //   redirect_uri: "http://localhost:3000",
      //   grant_type: "authorization_code"
      //
      // });

      loginMutation.mutate(codeResponse.code || "");

    },
    onError: (errorResponse) => {
    },
    scope: "https://www.googleapis.com/auth/spreadsheets"
  });

  return (
    <Flex
      h="100%"
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack width="lg" spacing={8} mx={"auto"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SigninSchema}
            onSubmit={() => { }}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  {loginMutation.isSuccess ? (
                    <Alert
                      display={loginMutation.isSuccess ? "flex" : "none"}
                      status="success"
                    >
                      <AlertIcon />
                      <AlertTitle>Đăng nhập thành công.</AlertTitle>
                    </Alert>

                  ) : (
                    <Alert
                      display={loginMutation.isError ? "flex" : "none"}
                      status="error"
                    >
                      <AlertIcon />
                      <AlertTitle>{loginMutation.error?.message}</AlertTitle>
                    </Alert>
                  )}
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Stack>
                    <Button
                      type="submit"
                      bg="primary"
                      color={"white"}
                      isLoading={loginMutation.isPending}
                    >
                      Sign In
                    </Button>
                  </Stack>
                  <Button leftIcon={<FcGoogle />} onClick={() => googleLogin()}>
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}

export default withAuthRedirect(SignIn)
