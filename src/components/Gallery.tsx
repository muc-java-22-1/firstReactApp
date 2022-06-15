import {useEffect, useState} from "react";

import GalleryItem from "./GalleryItem";
import "./Gallery.css"
import {Character, RamApi, RamApiInfo} from "../model";

export default function Gallery () {

    const [searchName, setSearchName] = useState('');
    const [ramCharacters, setRamCharacters] = useState<Character[]>([]);
    const [ramApiMeta, setRamApiMeta] = useState<RamApiInfo>();
    const [mode, setMode] = useState("page mode");
    const [searchError, setSearchError] = useState('')

    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        getRaMCharacterData(startUrl);
    }, []);

    useEffect(() => {
        setTimeout(()=>setErrorMsg(""), 5000)
    }, [errorMsg]);


    useEffect(() => {
        setTimeout(()=>setSearchError(""), 5000)
    }, [searchError]);

    const startUrl: string = "https://rickandmortyapi.com/api/character";

    const fetchAll = () => {
        fetchRec(startUrl).then((characters) => setRamCharacters(characters));
        setMode("all chars mode")
    }

    const fetchAllIter = () => {

    }

    const  fetchIter = async () => {

    }

    const fetchRec: (nextUrl: string) => Promise<Character[]> = (nextUrl: string) => {
        console.log(`fetch rec: ${nextUrl}`);
        return fetch(nextUrl)
            .then(response => response.json())
            .then(async (ramApi: RamApi) => {
                if (ramApi?.info?.next) {
                    // await new Promise((resolve, _) => setTimeout(() => resolve({}), 250));
                    // await wait(50);
                    return ramApi.results.concat(await fetchRec(ramApi.info.next));
                }
                return ramApi.results;
            });
    }

    const getRaMCharacterData = (url: string) => {
        setMode("page mode");
        console.log(`fetch: ${url}`);
        fetch(url)
            .then(response => {
                if(response.status === 200){
                     return response.json()
                }
                throw new Error("return not 200");
            })
            .then((ramApi: RamApi) => {
                setRamCharacters(ramApi.results);
                setRamApiMeta(ramApi.info);
                console.log(ramApi);
            }).catch(
            (e) => {
                setErrorMsg(e.toString());
                console.error(e);
            }
        );
    }

    const setSearchWord = (searchWord: string) => {
        if(searchWord.length>10){
            setSearchError("Searching term cannot be longer than 10 signs");
            return;
        }
        setSearchName(searchWord);
        setSearchError("");
    }

    return (
        <div data-testid="gallery">
            <h1>Rick and Morty character gallery</h1>
            <div className="search">
                <label htmlFor="nameInput">Search for name: </label><input data-testid='search-field' id="nameInput" type="text" value={searchName}
                                                                           onChange={ev => setSearchWord(ev.target.value)}/>
            </div>
            <div className="errormsg">
                {searchError}
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
                                <button onClick={() => getRaMCharacterData("asdf" + ramApiMeta.next)}>next</button>
                                :
                                <button className="invisible">next</button>
                        }
                    </div>
                    :
                    <button onClick={() => getRaMCharacterData(startUrl)}>load first page</button>
                }
            </div>
            <div className="errormsg">
                {errorMsg}
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
