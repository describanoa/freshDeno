import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
    name: string;
}

export const handler: Handlers = {
    GET: (req: Request, ctx: FreshContext<unknown, Data>) => {
        const url = new URL(req.url);
        const name = url.searchParams.get("name") || "";
        return ctx.render({ name });
    }
};

const Page = (props: PageProps) => {
    return (
        <div>
            <form method="get" target="/saludar"> {/* Si pones target="/saludar" se abre otra pestaña, sin ello se hace en la misma */}
                <input type="text" name="name" value={props.data.name || ""} />
                <button type="submit">Enviar</button>
            </form>
            {props.data.name && <h1>Hola {props.data.name}</h1>}
        </div>
    );
};

export default Page;