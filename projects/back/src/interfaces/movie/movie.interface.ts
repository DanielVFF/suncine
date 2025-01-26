import { Movie } from "src/infra/db/models/movie.model";

export interface MovieResult extends Movie {
    likes? : number,
    user_liked? : boolean
}