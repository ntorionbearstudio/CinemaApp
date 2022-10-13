import React, { useCallback, useEffect, useState } from 'react';

import { Box, Heading, Image, Text, theme } from 'native-base';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { MovieModal } from '@/components/MovieModal';
import { getMovies } from '@/services/moviesService';

export const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(0);

  const loadMovies = useCallback(async () => {
    setIsLoading(true);

    const [error, data] = await getMovies();
    if (!error && data) {
      if (page === 0) {
        setMovies(data.slice(0, 10));
      } else {
        setMovies((currentMovies) => [
          ...currentMovies,
          ...data.slice(page * 10, (page + 1) * 10),
        ]);
      }
    }

    setIsLoading(false);
  }, [page]);

  const loadNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const refresh = () => {
    setPage(0);
    loadMovies();
  };

  const handleSelectMovie = (movie) => () => {
    setSelectedMovie(movie);
    setIsModalVisible(true);
  };

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const { width } = Dimensions.get('window');

  return (
    <Box flex={1}>
      <SafeAreaView>
        <Box padding={5}>
          <Heading color="white">Films à l'affiche</Heading>
        </Box>
        <Box px={5}>
          <FlatList
            data={movies}
            columnWrapperStyle={{
              flex: 1,
              justifyContent: 'space-around',
            }}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={refresh}
                tintColor="#fff"
              />
            }
            numColumns={2}
            onEndReached={loadNextPage}
            keyExtractor={(item) => item.slug}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={handleSelectMovie(item)}>
                <Box bg={theme.colors.gray[800]} p={3} borderRadius={30}>
                  {item?.posterPath?.lg ? (
                    <Image
                      source={{ uri: item?.posterPath?.lg }}
                      width={(width - 100) / 2}
                      height={200}
                      borderRadius={20}
                      alt={item.alt_description || 'image description'}
                    ></Image>
                  ) : (
                    <Box
                      width={(width - 100) / 2}
                      height={200}
                      borderRadius={20}
                      bg={theme.colors.gray[700]}
                    />
                  )}

                  <Text
                    color="white"
                    fontWeight="bold"
                    numberOfLines={1}
                    width={(width - 100) / 2}
                    mt={2}
                  >
                    {item.title}
                  </Text>
                </Box>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <Box m={2}></Box>}
            ListFooterComponent={() => <Box mb={5}></Box>}
          />
        </Box>
      </SafeAreaView>

      {selectedMovie && selectedMovie.slug && (
        <MovieModal
          movieSlug={selectedMovie.slug}
          isVisible={isModalVisible}
          closeModal={() => setIsModalVisible(false)}
        />
      )}
    </Box>
  );
};
