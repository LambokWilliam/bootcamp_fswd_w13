import { Container, SimpleGrid, Flex, Text, Spacer, HStack, Button, useToast } from '@chakra-ui/react';
import { PATH } from '../constants/path';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Layout({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [window.localStorage.getItem('token')]);

  return (
    <>
      <Flex padding={4} sx={{ position: 'sticky', top: 0, zIndex: 99 }} background='linear-gradient(#ff5f6d, #ffc371)' color='white'>
        <Link to={PATH.home}>
          <Text
            as='b'
            fontSize='4xl'
            fontFamily='monospace'
            _hover={{
              opacity: 0.8,
              filter: 'brightness(1.2)',
              cursor: 'pointer',
            }}>
            Library Fusion
          </Text>
        </Link>
        <Spacer />
        <HStack spacing={4}>
          {isLogin && (
            <Link to='/newbook'>
              <Button colorScheme='blue' size='sm'>
                Create New Book
              </Button>
            </Link>
          )}
          {!isLogin ? (
            <Link to={PATH.login}>
              <Button colorScheme='blue' size='sm'>
                Login
              </Button>
            </Link>
          ) : (
            <Button
              colorScheme='red'
              size='sm'
              onClick={() => {
                window.localStorage.removeItem('token');
                setIsLogin(false);
                toast({
                  title: 'Logout',
                  description: 'You have successfully logged out.',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
                navigate(PATH.home);
              }}>
              Logout
            </Button>
          )}
        </HStack>
      </Flex>
      <Container maxW='container.xl' color='gray.700' mt={4} px={8} py={6} boxShadow='md' rounded='md'>
        {children}
      </Container>
      <Flex as='footer' justifyContent='center' alignItems='center' mt={200} py={4} borderTop='1px solid' borderColor='gray.300' background='linear-gradient(#ff5f6d, #ffc371)'>
        <Text fontSize='sm' textAlign='center' color='white'>
          © {new Date().getFullYear()} Library Fusion. All rights reserved.
        </Text>
      </Flex>
    </>
  );
}

export default Layout;
