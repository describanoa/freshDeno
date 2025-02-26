import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Character } from "../types.ts";
import { Characters } from "../components/characters.tsx";

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
                <Characters data={character} />
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