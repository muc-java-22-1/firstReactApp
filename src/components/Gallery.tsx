import {useEffect, useState} from "react";

import GalleryItem from "./GalleryItem";
import "./Gallery.css"
import {Character, RamApi, RamApiInfo} from "../model";

export default function Gallery () {

    const [searchName, setSearchName] = useState('');
    const [ramCharacters, setRamCharacters] = useState<Character[]>();
    const [ramApiMeta, setRamApiMeta] = useState<RamApiInfo>();

    useEffect(() => {
        getRaMCharacterData("https://rickandmortyapi.com/api/character")
    }, []);


    const getRaMCharacterData = (url: string) => {
        console.log(`fetch: ${url}`);
        fetch(url)
            .then(response => response.json())
            .then((ramApi: RamApi) => {
                setRamCharacters(ramApi.results);
                setRamApiMeta(ramApi.info);
            });
    }

    return (
        <div>
            <h1>Rick and Morty character gallery</h1>
            <div className="search">
                <label htmlFor="nameInput">Search for name: </label><input id="nameInput" type="text" value={searchName} onChange={ev => setSearchName(ev.target.value)} />
            </div>
            <div className="pagination-buttons">
                {
                    ramApiMeta && ramApiMeta.prev &&
                    <button onClick={() => getRaMCharacterData(ramApiMeta.prev)}>prev</button>
                }
                {
                    ramApiMeta && ramApiMeta.next &&
                    <button onClick={() => getRaMCharacterData(ramApiMeta.next)}>next</button>
                }
            </div>
            <div className="Gallery">
                {ramCharacters &&
                    ramCharacters
                        .filter(c => c.name.toLowerCase().includes(searchName.toLowerCase()))
                        .map(c => <GalleryItem character={c}/>)
                }
            </div>
        </div>
    );
}
