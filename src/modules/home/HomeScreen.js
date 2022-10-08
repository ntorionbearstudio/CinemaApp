import React, { useCallback, useEffect, useState } from 'react';

import { Box, Button, Flex, Image } from 'native-base';
import { ImageBackground } from 'react-native';

import { MovieModal } from '@/components/MovieModal';
import { getMainMovie } from '@/services/moviesService';

export const HomeScreen = () => {
  const [mainMovie, setMainMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadMovie = useCallback(async () => {
    setIsLoading(true);

    const [error, data] = await getMainMovie();
    if (!error && data) {
      setMainMovie(data[0]);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadMovie();
  }, [loadMovie]);

  return (
    <Box flex={1}>
      {mainMovie && mainMovie.mobileBackdrop && (
        <ImageBackground
          style={{ height: '100%' }}
          source={{
            uri: mainMovie.mobileBackdrop.lg,
          }}
          alt="background"
        >
          <Flex flex={1} justifyContent="flex-end" p={5} pb={150}>
            <Box>
              {mainMovie && mainMovie.logo && (
                <Image
                  source={{
                    uri: mainMovie.logo.lg,
                  }}
                  width="100%"
                  height={20}
                  resizeMode="contain"
                  alt="logo"
                />
              )}
            </Box>
            <Button
              mt={5}
              colorScheme="gray"
              onPress={() => setIsModalVisible(true)}
            >
              Plus d'infos
            </Button>
          </Flex>
        </ImageBackground>
      )}

      {mainMovie && mainMovie.showSlug && (
        <MovieModal
          movieSlug={mainMovie.showSlug}
          isVisible={isModalVisible}
          closeModal={() => setIsModalVisible(false)}
        />
      )}
    </Box>
  );
};
