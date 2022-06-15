import {useEffect, useState} from "react";

import GalleryItem from "./GalleryItem";
import "./Gallery.css"
import {Character, RamApi, RamApiInfo} from "../model";
import {wait} from "@testing-library/user-event/dist/utils";

export default function Gallery () {

    const firstCharacterPageUrl: string = "https://rickandmortyapi.com/api/character";

    const [searchName, setSearchName] = useState('');
    const [ramCharacters, setRamCharacters] = useState<Character[]>([]);
    const [ramApiMeta, setRamApiMeta] = useState<RamApiInfo>();
    const [mode, setMode] = useState("page mode");

    const [actualUrl, setActualUrl] = useState<string>(localStorage.getItem("actualcharacterpage")??firstCharacterPageUrl);

    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        getCharactersFromPageUrl(actualUrl);
    }, []);

    useEffect(()=>{
        localStorage.setItem("actualcharacterpage", actualUrl);
    }, [actualUrl])

    useEffect(() => {
        setTimeout(()=>setErrorMsg(""), 5000)
    }, [errorMsg]);

    const fetchAll = () => {
        fetchRec(firstCharacterPageUrl).then((characters) => setRamCharacters(characters));
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

    const getCharactersFromPageUrl = (url: string) => {
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
                setActualUrl(url);
                console.log(ramApi);
            }).catch(
            (e) => {
                setErrorMsg(e.toString());
                console.error(e);
            }
        );
    }

    return (
        <div data-testid="gallery">
            <h1>Rick and Morty character gallery</h1>
            <div className="search">
                <label htmlFor="nameInput">Search for name: </label><input data-testid='search-field' id="nameInput" type="text" value={searchName}
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
                                <button onClick={() => getCharactersFromPageUrl(ramApiMeta.prev)}>prev</button>
                                :
                                <button className="invisible">prev</button>
                        }
                        {
                            ramApiMeta?.next
                                ?
                                <button onClick={() => getCharactersFromPageUrl(ramApiMeta.next)}>next</button>
                                :
                                <button className="invisible">next</button>
                        }
                    </div>
                    :
                    <button onClick={() => getCharactersFromPageUrl(firstCharacterPageUrl)}>load first page</button>
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
