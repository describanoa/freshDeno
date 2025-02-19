import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    url: string;
};

type Data = {
    results: Character;
}

export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
        const { id } = ctx.params;

        const characters = await Axios.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
        
        return ctx.render({ results: characters.data });
    }
};

const Page = (props: PageProps<Data>) => {
    const { id, name, status, species, type, gender, origin, location, image, url } = props.data.results;

    return (
        <div>
            <h1>{name}</h1>
            <p>ID: {id}</p>
            <p>Status: {status ? status : 'Unknown'}</p>
            <p>Species: {species ? species : 'Unknown'}</p>
            <p>Type: {type ? type : 'Unknown'}</p>
            <p>Gender: {gender ? gender : 'Unknown'}</p>
            <p>Origin: <a href={origin.url} target="_blank">{origin.name}</a></p>
            <p>Location: <a href={location.url} target="_blank">{location.name}</a></p>
            <br/>
            <p>Image: <img src={image} alt={name}/></p>
            <br/>
            <p>Url: <a href={url} target="_blank">{name}</a></p>
        </div>
    );
};

export default Page;