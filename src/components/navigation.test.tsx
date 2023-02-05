import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe("Navigation button tests", () => {
  test("When app first starts check that all buttons are visible", async () => {
    render(<App />);
  
    expect(await screen.findByText("Prev Page")).toBeInTheDocument();
    expect(await screen.findByText("Show Favourites")).toBeInTheDocument();
    expect(await screen.findByText("Next Page")).toBeInTheDocument();
  });

  test("When Show Favourites button is pressed then Show All button should be visible", async () => {
    render(<App />);
   
    fireEvent.click(screen.getByText("Show Favourites"));

    expect(await screen.findByText("Show All")).toBeInTheDocument();
    expect(screen.queryByText("Prev Page")).toBeNull();
    expect(screen.queryByText("Next Page")).toBeNull();
  });
});
