import {useEffect, useState} from "react";

import GalleryItem from "./GalleryItem";
import "./Gallery.css"
import {Character, RamApi, RamApiInfo} from "../model";

export default function Gallery () {

    const [searchName, setSearchName] = useState('');
    const [ramCharacters, setRamCharacters] = useState<Character[]>([]);
    const [ramApiMeta, setRamApiMeta] = useState<RamApiInfo>();
    const [mode, setMode] = useState("page mode");

    useEffect(() => {
        getRaMCharacterData("https://rickandmortyapi.com/api/character")
    }, []);


    const fetchAll = () => {
        fetchRec("https://rickandmortyapi.com/api/character").then((characters) => setRamCharacters(characters));
        setMode("all chars mode")
    }
    const fetchRec: (nextUrl: string) => Promise<Character[]> = (nextUrl: string) => {
        console.log(`fetch rec: ${nextUrl}`);
        return fetch(nextUrl)
            .then(response => response.json())
            .then(async (ramApi: RamApi) => {
                if (ramApi?.info?.next) {
                    return ramApi.results.concat(await fetchRec(ramApi.info.next));
                }
                return ramApi.results;
            });
    }

    const getRaMCharacterData = (url: string) => {
        setMode("page mode");
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
                <label htmlFor="nameInput">Search for name: </label><input id="nameInput" type="text" value={searchName}
                                                                           onChange={ev => setSearchName(ev.target.value)}/>
            </div>
            <div className="pagination-buttons">
                {mode === "page mode"
                    ?
                    <div>
                        <button id="fetchall" onClick={() => fetchAll()}>fetch all</button>

                        {
                            ramCharacters && ramCharacters.length > 0 && (ramApiMeta?.prev || ramApiMeta?.next) &&
                            <span>Page: {Math.ceil(ramCharacters!.at(0)!.id / 20)}   </span>
                        }

                        {
                            ramApiMeta?.prev
                                ?
                                <button onClick={() => getRaMCharacterData(ramApiMeta.prev)}>prev</button>
                                :
                                <button className="invisible">prev</button>
                        }
                        {
                            ramApiMeta?.next
                                ?
                                <button onClick={() => getRaMCharacterData(ramApiMeta.next)}>next</button>
                                :
                                <button className="invisible">next</button>
                        }
                    </div>
                    :
                    <button onClick={() => getRaMCharacterData("https://rickandmortyapi.com/api/character")}>load first page</button>
                }
            </div>
            <div className="Gallery">
                {
                    ramCharacters
                        .filter(c => c.name.toLowerCase().includes(searchName.toLowerCase()))
                        .map(c => <GalleryItem key={c.id} character={c}/>)
                }
            </div>
        </div>
    );
}
