export interface Character {
    name: string;
    status: string;
    species: string;
    image: string;
    id: number;
}

export interface CharacterDetails {
    name: string;
    status: string;
    species: string;
    image: string;
    id: number;

    episode: string[]
}


export interface RamApi {
    info: RamApiInfo
    results: Character[]
}

export interface RamApiInfo {
    prev: string;
    next: string;
}