export interface Character {
    name: string;
    status: string;
    species: string;
    image: string;
}


export interface RamApi {
    info: RamApiInfo
    results: Character[]
}

export interface RamApiInfo {
    prev: string;
    next: string;
}