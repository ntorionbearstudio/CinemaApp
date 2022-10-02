import axios from 'axios';

export const getMainMovie = async (page = 0) => {
  try {
    const movieRes = await axios.get(
      'https://www.cinemaspathegaumont.com/api/featured?type=home&language=fr'
    );
    return [null, movieRes.data];
  } catch (error) {
    return [error];
  }
};

export const getMovies = async (page = 0) => {
  try {
    const moviesRes = await axios.get(
      'https://www.cinemaspathegaumont.com/api/shows?language=fr'
    );
    return [null, moviesRes.data.shows];
  } catch (error) {
    return [error];
  }
};

export const getMovie = async (slug) => {
  try {
    const movieRes = await axios.get(
      `https://www.cinemaspathegaumont.com/api/show/${slug}?language=fr`
    );
    return [null, movieRes.data];
  } catch (error) {
    return [error];
  }
};
