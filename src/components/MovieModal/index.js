import React, { useCallback, useEffect, useState } from 'react';

import { Badge, Box, HStack, Icon, Text, theme } from 'native-base';
import {
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useFavorites } from '@/services/favoritesService';
import { getMovie } from '@/services/moviesService';

export const MovieModal = ({ movieSlug, isVisible, closeModal }) => {
  const [mainMovie, setMainMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isItemInFavoritesValue, setIsItemInFavoritesValue] = useState(false);
  const [, addItemToFavorites, removeItemFromFavorites, isItemInFavorites] =
    useFavorites();

  const loadMovie = useCallback(async () => {
    setIsLoading(true);
    const [error, data] = await getMovie(movieSlug);
    if (!error && data) {
      setMainMovie(data);
    }
    setIsLoading(false);
  }, [movieSlug]);

  const loadFavorites = useCallback(async () => {
    const isItemInList = await isItemInFavorites(mainMovie);
    setIsItemInFavoritesValue(isItemInList);
  }, [mainMovie, isItemInFavorites]);

  const handleFavorite = async () => {
    if (await isItemInFavorites(mainMovie)) {
      await removeItemFromFavorites(mainMovie);
    } else {
      console.log('add item');
      await addItemToFavorites(mainMovie);
    }

    loadFavorites();
  };

  useEffect(() => {
    loadMovie();
  }, [loadMovie]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <Box flex={1}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Box flex={1} />
        </TouchableWithoutFeedback>
      </Box>

      <Box height={500} bg={theme.colors.gray[800]} p={5}>
        {isLoading ? (
          <Box>
            <ActivityIndicator />
          </Box>
        ) : (
          <>
            <HStack justifyContent="space-between">
              <Text color="white" fontSize={20} fontWeight="bold">
                {mainMovie.title}
              </Text>
              <TouchableOpacity onPress={handleFavorite}>
                <Box
                  bg="white"
                  borderRadius={50}
                  width={10}
                  height={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon
                    as={FontAwesome}
                    name={isItemInFavoritesValue ? 'heart' : 'heart-o'}
                    color={theme.colors.red[500]}
                    size={6}
                  />
                </Box>
              </TouchableOpacity>
            </HStack>

            {mainMovie.genres &&
              mainMovie.genres.map((genre) => (
                <Badge alignSelf="flex-start" key={genre} mt={2}>
                  {genre}
                </Badge>
              ))}
            <Text color={theme.colors.gray[400]} fontWeight="bold" my={2}>
              {`Par ${mainMovie.directors} par ${mainMovie.actors}`}
            </Text>
            <ScrollView>
              <Text color={theme.colors.gray[400]} fontSize={15}>
                {mainMovie.synopsis}
              </Text>
            </ScrollView>
          </>
        )}
      </Box>
    </Modal>
  );
};
