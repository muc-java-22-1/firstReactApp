import {useState} from "react";

import GalleryItem from "./GalleryItem";
import "./Gallery.css"
import characters from "../characters.json"

export default function Gallery () {

    const [name, setName] = useState('');

    let ramCharacter = characters
        .filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
        .map(c => <GalleryItem character={{name:c.name, status:c.status, species:c.species, image_url:c.image}}/>);

    return (
        <div>
            <h1>Rick and Morty character gallery</h1>
            <div className="search">
                <label htmlFor="nameInput">Search for name: </label><input id="nameInput" type="text" value={name} onChange={ev => setName(ev.target.value)} />
            </div>
            <div className="Gallery">
                {ramCharacter}
            </div>
        </div>
    );
}
