
import GalleryItem from "./GalleryItem";
import {render, screen} from "@testing-library/react";
import {Character} from "../model";


test('GalleryItem is rendered correctly', ()=>{
    const char: Character = {name: "Rick",
        status: "Alive",
        species: "Human",
        image: "asdf.jpg",
        id: 1};
    render(<GalleryItem character={char}/>);

    const dummyChar = screen.getByTestId(char.id);

    expect(dummyChar).toHaveTextContent(char.name);
    expect(dummyChar).toHaveTextContent(`Status: ${char.status}`);
    expect(dummyChar).toHaveTextContent(`Species: ${char.species}`);
    expect(dummyChar).toHaveTextContent(`id: ${char.id}`);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', char.image)
    expect(image).toHaveAttribute('alt', 'Character')
})