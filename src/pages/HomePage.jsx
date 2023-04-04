import React, { useEffect, useState } from 'react';
import { InfoCard, Layout } from '../components';
import { getAllBooks } from '../fetcher/index.js';
import { SimpleGrid } from '@chakra-ui/react';

function HomePage() {
  const [books, setBooks] = useState(null);
  useEffect(() => {
    const fetchBooks = async () => {
      const { books } = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <Layout>
      <SimpleGrid columns={4} spacing={6} justifyContent='center'>
        {books?.map((book, idx) => (
          <InfoCard key={idx} {...book} />
        ))}
      </SimpleGrid>
    </Layout>
  );
}

export default HomePage;
