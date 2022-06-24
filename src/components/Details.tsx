import {Link, useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {CharacterDetails} from "../model";
import "./Details.css";

export default function Details() {

    const [characterDetails, setCharacterDetails] = useState<CharacterDetails>()

    useEffect(() => {
        fetchCharacter(params.charId!)
            .then((response: AxiosResponse<CharacterDetails, any>) => {
                setCharacterDetails(response.data)
            });
        localStorage.clear();
    }, [])
    const params = useParams();

    const fetchCharacter = (id: string) => {
            return axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    }

    return(
        <div className="detailspage">
            Details page for {params.charId}
            {
                characterDetails &&
                <div>
                    <h2>{characterDetails.name}</h2>
                    <p>
                        Status: {characterDetails.status}
                        <br/>
                        Species: {characterDetails.species}
                        <br/>
                        id: {characterDetails.id}
                    </p>
                    <img src={characterDetails.image} alt="Character"/>
                </div>
            }
            <h3>Episodes: </h3>
            {
                characterDetails &&
                characterDetails.episode.map((e) =>
                     <Link to={`/episode/${e.split("/").pop()}`}>{e.split("/").pop()}</Link>
                )
            }
        </div>
    )
}