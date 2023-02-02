// note the anonymous type here for our props
// - a simple type like this doesn't always NEED an interface declaration
const Header: React.FC<{ currentPage: number; showFavourites: boolean }> = ({
  currentPage,
  showFavourites,
}) => (
  <header className="header__container">
    <h1 className="header__title">The World of Disney</h1>
    {showFavourites === false && (
      <p className="header__page-count ">Page: {currentPage}</p>
    )}
  </header>
);

export default Header;