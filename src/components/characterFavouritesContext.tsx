import React, { ReactElement } from "react";
import { DisneyCharacter } from "../disney_character";

interface CharacterFavouritiesProviderProps {
  children: ReactElement;
  characterFavourites: Array<DisneyCharacter>;
  setCharacterFavourites: (favourites: Array<DisneyCharacter>) => void;
}

export const FavouritesContext = React.createContext<DisneyCharacter[]>([]);
export const UpdateFavouritesContext = React.createContext(
  (favourites: Array<DisneyCharacter>) => {}
);

const CharacterFavouritesProvider: React.FC<CharacterFavouritiesProviderProps> =
({ children, setCharacterFavourites, characterFavourites }) => {
  return (
    <FavouritesContext.Provider value={characterFavourites}>
    <UpdateFavouritesContext.Provider value={setCharacterFavourites}>
      {children}
    </UpdateFavouritesContext.Provider>
    </FavouritesContext.Provider>
  );
};

export default CharacterFavouritesProvider;
