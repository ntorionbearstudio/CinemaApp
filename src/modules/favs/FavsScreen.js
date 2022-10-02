import React, { useCallback, useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { Box, Heading, Image, Text, theme } from 'native-base';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { MovieModal } from '@/components/MovieModal';
import { useFavorites } from '@/services/favoritesService';

export const FavsScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [getFavorites] = useFavorites();

  const loadFavorites = useCallback(async () => {
    setIsLoading(true);
    const favoritesData = await getFavorites();
    setFavorites(favoritesData);
    setIsLoading(false);
  }, [getFavorites]);

  const handleSelectMovie = (movie) => () => {
    setSelectedMovie(movie);
    setIsModalVisible(true);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [loadFavorites, isFocused]);

  const { width } = Dimensions.get('window');

  return (
    <Box flex={1}>
      <SafeAreaView>
        <Box padding={5}>
          <Heading color="white">Favoris</Heading>
        </Box>
        <Box px={5}>
          <FlatList
            data={favorites}
            columnWrapperStyle={{
              flex: 1,
              justifyContent: 'space-around',
            }}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={loadFavorites}
                tintColor="#fff"
              />
            }
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={handleSelectMovie(item)}>
                <Box bg={theme.colors.gray[800]} p={3} borderRadius={30}>
                  <Image
                    source={{ uri: item.posterPath.lg }}
                    width={(width - 100) / 2}
                    height={200}
                    borderRadius={20}
                    alt={item.alt_description || 'image description'}
                  ></Image>
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
            keyExtractor={(item) => item.slug}
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
