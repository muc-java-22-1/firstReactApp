import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Gallery from "./Gallery";

test('Rick and Morty filtering', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
        expect(url).toEqual("https://rickandmortyapi.com/api/character");
        return Promise.resolve({
            status: 200,
            json: () => Promise.resolve({results: chars()})
        } as Response);
    });

    render(<Gallery />);

    await waitFor(() => {
            expect(screen.getByTestId(1)).toBeDefined();
            expect(screen.getByTestId(2)).toBeDefined();
            expect(screen.getByTestId(2)).toBeDefined();
    });

    await waitFor(() => {
        expect(screen.getByTestId("gallery")).toHaveTextContent("Rick Sanchez");
    });

    // Filter characters
    const searchField = screen.getByTestId('search-field')
    fireEvent.change(searchField, { target: { value: 'smith' }});


    await waitFor(() => {
        expect(screen.getByTestId("gallery")).toHaveTextContent("Rick Sanchez");
    });
    await waitFor(() => {
        expect(()=>screen.getByTestId(1)).toThrowError();
        expect(screen.getByTestId(2)).toBeDefined();
        expect(screen.getByTestId(2)).toBeDefined();
    });
});

const chars = ()=> {return [
    {
        "id": 1,
        "name": "Rick Sanchez",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
            "name": "Earth (C-137)",
            "url": "https://rickandmortyapi.com/api/location/1"
        },
        "location": {
            "name": "Citadel of Ricks",
            "url": "https://rickandmortyapi.com/api/location/3"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        "url": "https://rickandmortyapi.com/api/character/1",
        "created": "2017-11-04T18:48:46.250Z"
    },
    {
        "id": 2,
        "name": "Morty Smith",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
            "name": "unknown",
            "url": ""
        },
        "location": {
            "name": "Citadel of Ricks",
            "url": "https://rickandmortyapi.com/api/location/3"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        "url": "https://rickandmortyapi.com/api/character/2",
        "created": "2017-11-04T18:50:21.651Z"
    },
    {
        "id": 3,
        "name": "Summer Smith",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Female",
        "origin": {
            "name": "Earth (Replacement Dimension)",
            "url": "https://rickandmortyapi.com/api/location/20"
        },
        "location": {
            "name": "Earth (Replacement Dimension)",
            "url": "https://rickandmortyapi.com/api/location/20"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        "url": "https://rickandmortyapi.com/api/character/3",
        "created": "2017-11-04T19:09:56.428Z"
    }
]}