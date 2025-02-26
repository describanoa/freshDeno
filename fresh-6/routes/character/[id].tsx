import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Characters } from "../../components/characters.tsx";
import { Character } from "../../types.ts";

type Data = {
    results: Character;
}

export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
        try {
            const { id } = ctx.params;
            debugger;
            const characters = await Axios.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
            return ctx.render({ results: characters.data });
        } 
        catch (error) 
        {
            console.error(error);
            throw new Error('Error fetching data');
        }
    }
};

const Page = (props: PageProps<Data>) => {
    try{
        return (
            <Characters data={props.data.results} />
        );
    }
    catch (error) {
        console.error(error);
        return <div>Error fetching data</div>;
    }
};

export default Page;