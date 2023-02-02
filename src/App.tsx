import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";
import CharacterFavouritesProvider from "./components/characterFavouritesContext";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFavourites, setShowFavourites] = useState(false);

  // Some dummy state representing disney characters
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);
  const [characterFavourites, setCharacterFavourites] = useState<
    Array<DisneyCharacter>
  >([]);

  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  const getCharacters = async (pageNumber: number) => {
    const apiResponse = await fetch(
      `http://api.disneyapi.dev/characters?page=${pageNumber}`
    );
    const json = (await apiResponse.json()) as { data: DisneyCharacter[] };
    setCharacters(json.data);
  };

  const toggleFavouritesAll = () => {
    setShowFavourites((prev) => (prev === true ? false : true));
  };

  return (
    <CharacterFavouritesProvider
      characterFavourites={characterFavourites}
      setCharacterFavourites={setCharacterFavourites}
    >
      <div className="page">
        <Header currentPage={currentPage} showFavourites={showFavourites} />
        <Navigation
          currentPage={currentPage}
          showFavourites={showFavourites}
          setCurrentPage={setCurrentPage}
          toggleFavouritesAll={toggleFavouritesAll}
        />
        <CharacterContainer
          characters={showFavourites ? characterFavourites : characters}
        />
      </div>
    </CharacterFavouritesProvider>
  );
};

export default App;
