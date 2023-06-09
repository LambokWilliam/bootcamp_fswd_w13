import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { API_URL, PATH } from '../constants/path';
import { Link, generatePath } from 'react-router-dom';
function InfoCard(props) {
  const { title, author, publisher, year, pages, image, id } = props;

  return (
    <Link to={generatePath(PATH.detail, { id })}>
      <Card maxW='sm' _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }} transition='all .2s ease-in-out'>
        <CardBody background='linear-gradient(#ed4264,#ffedbc)'>
          <Image src={`${API_URL}/${image}`} alt={title} borderRadius='lg' boxSize='250px' objectFit='cover' />
          <Stack mt='6' spacing='3' textAlign='center'>
            <Heading size='md'>Title: {title}</Heading>
            <Text>Author: {author}</Text>
            <Text>Publisher: {publisher}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}

export default InfoCard;
