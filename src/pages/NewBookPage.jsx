import React from 'react';
import { Layout } from '../components';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';
import { createNewBook } from '../fetcher';
import { useForm } from 'react-hook-form';

function NewBookPage() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('publisher', data.publisher);
      formData.append('year', data.year);
      formData.append('pages', data.pages);
      formData.append('image', data.image[0]);
      await createNewBook(formData);

      toast({
        title: 'Create New Book',
        description: 'You have successfully created a new book.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Create New Book Failed',
        description: 'An error occurred while creating a new book.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <FormControl isInvalid={errors.title?.message}>
            <FormLabel>Title</FormLabel>
            <Input name='title' placeholder='Enter title' {...register('title', { required: 'Title is required.' })} />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.author?.message}>
            <FormLabel>Author</FormLabel>
            <Input name='author' placeholder='Enter author' {...register('author', { required: 'Author is required.' })} />
            <FormErrorMessage>{errors.author?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.publisher?.message}>
            <FormLabel>Publisher</FormLabel>
            <Input name='publisher' placeholder='Enter publisher' {...register('publisher', { required: 'Publisher is required.' })} />
            <FormErrorMessage>{errors.publisher?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.year?.message}>
            <FormLabel>Year</FormLabel>
            <Input name='year' type='number' placeholder='Enter year' {...register('year', { required: 'Year is required.' })} />
            <FormErrorMessage>{errors.year?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.pages?.message}>
            <FormLabel>Pages</FormLabel>
            <Input name='pages' type='number' placeholder='Enter pages' {...register('pages', { required: 'Pages is required.' })} />
            <FormErrorMessage>{errors.pages?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.image?.message}>
            <FormLabel>Image</FormLabel>
            <Input name='image' type='file' accept='image/*' {...register('image', { required: 'Image is required.' })} />
            <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
          </FormControl>
          <Button type='submit'>Create New Book</Button>
        </VStack>
      </form>
    </Layout>
  );
}

export default NewBookPage;
