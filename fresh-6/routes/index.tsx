import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type Character = {
    id: number;
    name: string;
};

type Data = {
    results: Character[];
};

export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
        try {
            const response = await Axios.get<{ results: Character[] }>("https://rickandmortyapi.com/api/character");
            return ctx.render({ results: response.data.results });
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching data");
        }
    },
};

const Page = (props: PageProps<Data>) => {
    return (
        <div>
            <h1>Characters</h1>
            <ul>
                {props.data.results.map((character) => (
                <li key={character.id}>
                    <a href={`/character/${character.id}`}>{character.name}</a>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;
