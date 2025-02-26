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
    name: string;
    results: Character[];
    page: number;
    totalPages: number;
};

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
        try {
            const url = new URL(req.url);
            const name = url.searchParams.get("name") || "";
            debugger;
            const page = parseInt(url.searchParams.get("page") || "1");
            const response = await Axios.get<{ results: Character[], info: { pages: number } }>(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`);
            return ctx.render({ name, results: response.data.results, page, totalPages: response.data.info.pages });
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching data");
        }
    }
};

const Page = (props: PageProps<Data>) => {
    const { name, results, page, totalPages } = props.data;

    return (
        <div>
            <form method="get" action="/buscar">
                <input type="text" name="name" value={name || ""} />
                <button type="submit">Enviar</button>
            </form>
            <br/>
            {results.map((character) => (
                <div key={character.id}>
                    <h1>{character.name}</h1>
                    <p>ID: {character.id}</p>
                    <p>Status: {character.status ? character.status : 'Unknown'}</p>
                    <p>Species: {character.species ? character.species : 'Unknown'}</p>
                    <p>Type: {character.type ? character.type : 'Unknown'}</p>
                    <p>Gender: {character.gender ? character.gender : 'Unknown'}</p>
                    <p>Origin: <a href={character.origin.url} target="_blank">{character.origin.name}</a></p>
                    <p>Location: <a href={character.location.url} target="_blank">{character.location.name}</a></p>
                    <br/>
                    <p>Image: <img src={character.image} alt={character.name}/></p>
                    <br/>
                    <p>Url: <a href={character.url} target="_blank">{character.name}</a></p>
                </div>
            ))}
            <div>
                {page > 1 && (
                    <a href={`/buscar?name=${name}&page=${page - 1}`}>
                        <button type="button">Previous</button>
                    </a>
                )}
                {page < totalPages && (
                    <a href={`/buscar?name=${name}&page=${page + 1}`}>
                        <button type="button">Next</button>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Page;