export type PokemonLink = {
  "id": string;
  "number": number;
  "name": string;
  "image": string;
  "isFavorite": boolean;
  "types": string[];
}

export type Pokemon = {
  "id": string;
  "name":  string;
  "types":  string[];
  "weight": {
    "minimum": string;
    "maximum": string;
  },
  "height": {
    "minimum": string;
    "maximum": string;
  },
  "maxCP": number;
  "maxHP": number;
  "evolutions": PokemonLink[],
  "number": number;
  "previousEvolutions": PokemonLink[];
  "image":  string;
  "sound":  string;
  "isFavorite": boolean;
}

export type ApiResponse = {
  count: number;
  items: Pokemon[];
  limit: number;
  offset: number;
}