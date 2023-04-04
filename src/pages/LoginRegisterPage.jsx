import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../constants/path';
import { useForm } from 'react-hook-form';
import { loginUser, registerUser } from '../fetcher';
import { Layout } from '../components';

function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const isLoginPage = location.pathname === PATH.login;

  const onSubmit = async (data) => {
    try {
      const res = isLoginPage ? await loginUser(data) : await registerUser(data);
      isLoginPage && window.localStorage.setItem('token', res.token);

      toast({
        title: isLoginPage ? 'Login' : 'Registered',
        description: isLoginPage ? 'You have successfully logged in.' : 'Account created successfully. Now, please log in with your account.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(isLoginPage ? PATH.home : PATH.login);
    } catch (e) {
      toast({
        title: 'Login Failed',
        description: `Account doesn't exist. Please register.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Stack spacing={1} maxW='500px' textAlign='center' align='center' w='100%' mx='auto'>
        <Heading mb={10}>Welcome to Library Fusion</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLoginPage && (
            <FormControl isInvalid={errors.name?.message}>
              <FormLabel>Name</FormLabel>
              <Input type='text' placeholder='Enter your name' {...register('name', { required: 'Name is required.' })} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
          )}
          <FormControl isInvalid={errors.email?.message}>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='Enter your email' {...register('email', { required: 'Email is required.' })} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password?.message}>
            <FormLabel>Password</FormLabel>
            <Input type='password' placeholder='Enter your password' {...register('password', { required: 'Password is required.' })} />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          {!isLoginPage && (
            <FormControl isInvalid={errors.passwordConfirmation?.message}>
              <FormLabel>Password Confirmation</FormLabel>
              <Input type='password' placeholder='Enter your password confirmation' {...register('passwordConfirmation', { required: 'Password confirmation is required.' })} />
              <FormErrorMessage>{errors.passwordConfirmation?.message}</FormErrorMessage>
            </FormControl>
          )}
          <Link to={isLoginPage ? PATH.register : PATH.login}>
            <Text mt={5}>{isLoginPage ? `Don't have an account? Click here to register.` : 'Already have an account? Click here to login.'}</Text>
          </Link>
          <Button mt={5} type='submit'>
            Submit
          </Button>
        </form>
      </Stack>
    </Layout>
  );
}

export default LoginPage;
