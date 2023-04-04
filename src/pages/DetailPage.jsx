import { Box, Button, Flex, Heading, Image, Input, Skeleton, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { deleteBookById, getBookDetail, updateBookById } from '../fetcher/index.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components';
import { PATH } from '../constants/path.js';

function DetailPage() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(null);
  const { id } = useParams();
  const navigation = useNavigate();
  const toast = useToast();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await getBookDetail(id);
        setBook(res.book);
        setEditedBook(res.book);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchBook();
  }, [id]);

  const onDelete = async () => {
    try {
      await deleteBookById(id);
      toast({
        title: `Book ${book.title} has been deleted`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigation(PATH.home);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditedBook(book);
  };

  const onSaveEdit = async () => {
    try {
      await updateBookById(id, editedBook);
      setBook(editedBook);
      setIsEditing(false);
      toast({
        title: `Book ${editedBook.title} has been updated`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedBook((prev) => ({
      ...prev,
      [name]: name === 'pages' || name === 'year' ? parseInt(value) : value,
    }));
  };

  return (
    <Layout>
      <Box>
        <Flex my='6'>
          {isLoading ? (
            <Box w='100%'>
              <Skeleton height='300px' my='100' />
            </Box>
          ) : (
            <Flex w='100%'>
              <Box w='600px'>
                <Image src={`http://localhost:8000/${book.image}`} alt={book.title} />
              </Box>
              <Box ml='8' flex='1'>
                {isEditing ? (
                  <>
                    <Text fontWeight='bold'>Title:</Text>
                    <Input type='text' name='title' value={editedBook.title} onChange={handleInputChange} />
                    <Text fontWeight='bold'>Author:</Text>
                    <Input type='text' name='author' value={editedBook.author} onChange={handleInputChange} />
                    <Text fontWeight='bold'>Publisher:</Text>
                    <Input type='text' name='publisher' value={editedBook.publisher} onChange={handleInputChange} />
                    <Text fontWeight='bold'>Year:</Text>
                    <Input type='number' name='year' value={editedBook.year} onChange={handleInputChange} />
                    <Text fontWeight='bold'>Pages:</Text>
                    <Input type='number' name='pages' value={editedBook.pages} onChange={handleInputChange} />
                    <Button colorScheme='green' onClick={onSaveEdit} mt='4' mr='4'>
                      Save
                    </Button>
                    <Button mt='4' colorScheme='red' onClick={onCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Text fontWeight='bold'>Title:</Text>
                    <Text>{book.title}</Text>
                    <Text fontWeight='bold'>Author:</Text>
                    <Text>{book.author}</Text>
                    <Text fontWeight='bold'>Publisher:</Text>
                    <Text>{book.publisher}</Text>
                    <Text fontWeight='bold'>Year:</Text>
                    <Text>{book.year}</Text>
                    <Text fontWeight='bold'>Pages:</Text>
                    <Text>{book.pages}</Text>
                    {token && (
                      <Button colorScheme='green' onClick={onEdit} mr='4' mt='4'>
                        Edit
                      </Button>
                    )}
                    {token && (
                      <Button colorScheme='red' onClick={onDelete} mt='4'>
                        Delete
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </Flex>
          )}
        </Flex>
      </Box>
    </Layout>
  );
}

export default DetailPage;
