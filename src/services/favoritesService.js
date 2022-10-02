import { useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES = '@CinemaApp/favorites-list';

export const useFavorites = () => {
  const getFavorites = useCallback(async () => {
    const favoritesData = await AsyncStorage.getItem(FAVORITES);
    return favoritesData ? JSON.parse(favoritesData) : null;
  }, []);

  const isItemInFavorites = useCallback(
    async (item) => {
      const favorites = await getFavorites();
      return (favorites || []).find(
        (itemInList) => item && itemInList.slug === item.slug
      );
    },
    [getFavorites]
  );

  const addItemToFavorites = async (item) => {
    const favorites = await getFavorites();
    await AsyncStorage.setItem(
      FAVORITES,
      JSON.stringify([...(favorites || []), item])
    );
  };

  const removeItemFromFavorites = async (item) => {
    const favorites = await getFavorites();

    const itemIndex = (favorites || []).findIndex(
      (itemInList) => itemInList.slug === item.slug
    );

    if (itemIndex > -1) {
      favorites.splice(itemIndex, 1);
    }

    await AsyncStorage.setItem(FAVORITES, JSON.stringify(favorites));
  };

  return [
    getFavorites,
    addItemToFavorites,
    removeItemFromFavorites,
    isItemInFavorites,
  ];
};
