import { render, screen, fireEvent, act} from '@testing-library/react';
import App from '../App';

describe("Test adding to favourites", () => {

  test("When 'Add to Favourites' button is pressed then the button text should toggle to 'Favourited'", async () => {
    render(<App />);

    // check that we start with 50 unfavourited characters on page 1
    let allCharacters = await screen.findAllByText("Add to Favourites");
    expect(allCharacters.length).toEqual(50);

    // click on add to favourites for the first character, assert that the 
    // number of favourited characters is 1 and the number of unfavourited
    // has decreased by 1
    fireEvent.click(allCharacters[0]);

    allCharacters = await screen.findAllByText("Add to Favourites");
    expect(allCharacters.length).toEqual(49);

    let favCharacters = await screen.findAllByText("Favourited");
    expect(favCharacters.length).toEqual(1);

    // click on the favourited button and there should no longer
    // be any favourites
    fireEvent.click(favCharacters[0]);

    allCharacters = await screen.findAllByText("Add to Favourites");
    expect(allCharacters.length).toEqual(50);
    expect(screen.queryAllByText("Favourited")).toHaveLength(0);

  });
  test("When 'Show Favourites' button is pressed then only favourites are shown (favourites from a single page)", async () => {
    render(<App />);

    // add a couple of characters to the favourites
    let allCharacters = await screen.findAllByText("Add to Favourites");
    fireEvent.click(allCharacters[0]);
    fireEvent.click(allCharacters[2]);

    // click to show only favourites
    fireEvent.click(screen.getByText("Show Favourites"));
    let favCharacters = await screen.findAllByText("Favourited");

    // we should only have two characters, the ones we favourited
    expect(favCharacters.length).toEqual(2);

    expect(await screen.findByText("'Olu Mel")).toBeInTheDocument();
    expect(await screen.findByText("627")).toBeInTheDocument();

  });
  test("When 'Show Favourites' button is pressed then only favourites are shown (favourites from multiple pages)", async () => {
    render(<App />);

    // add a character from page 1
    const page1Characters = await screen.findAllByText("Add to Favourites");
    fireEvent.click(page1Characters[2]);

    // add a character from page 2
    fireEvent.click(screen.getByText("Next Page"));
    await (screen.findByText("Page: 2"));
    await (screen.findByText("Air Bud"));
    const page2Characters = await screen.findAllByText("Add to Favourites");
    fireEvent.click(page2Characters[2]);

    // cick on show favourites
    fireEvent.click(screen.getByText("Show Favourites"));

    // test that the 2 characters are shown   
    const favCharacters = await screen.findAllByText("Favourited");
  
    expect(favCharacters.length).toEqual(2);

    expect(await screen.findByText("627")).toBeInTheDocument();
    expect(await screen.findByText("Air Bud")).toBeInTheDocument();

    // just for fun, check that all the characters are 'Favourited'
    expect(screen.queryByText("Add to Favourites")).not.toBeInTheDocument();

  });
});