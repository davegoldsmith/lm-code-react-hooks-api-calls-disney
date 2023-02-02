interface NavigationProps {
  currentPage: number;
  showFavourites: boolean;
  setCurrentPage: (page: number) => void;
  toggleFavouritesAll: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  showFavourites,
  setCurrentPage,
  toggleFavouritesAll,
}) => {
  const nextPage = () => {
    const newPageNumber = currentPage + 1;
    setCurrentPage(newPageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPageNumber = currentPage - 1;
      setCurrentPage(newPageNumber);
    }
  };

  const toggleFavourites = () => {
    toggleFavouritesAll();
  };

  return (
    <div className="navigation">
      {showFavourites === false && (
        <div className="navigation__item">
          <button className="navigation__button" onClick={prevPage}>
            Prev Page
          </button>
        </div>
      )}
      <div className="navigation__item">
        <button className="navigation__button" onClick={toggleFavourites}>
          {showFavourites === false ? "Show Favourites" : "Show All"}
        </button>
      </div>
      {showFavourites === false && (
        <div className="navigation__item">
          <button className="navigation__button" onClick={nextPage}>
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
