import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {CharacterDetails} from "../model";

export default function Episode () {
    //
    // [] = useState();
    //
    // useEffect(() => {
    //     fetchCharacter(params.charId!)
    //         .then((response: AxiosResponse<CharacterDetails, any>) => {
    //             setCharacterDetails(response.data)
    //         })
    // }, [])
    // const params = useParams();
    //
    // const fetchCharacter = (id: string) => {
    //     return axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
    // }

    return (
        <div>
            {/*Episode page {params.episodeId}*/}
        </div>
    )
}