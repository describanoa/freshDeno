import { RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
    skipInheritedLayouts: true, // Skip already inherited layouts
};

const Page = () => {
    return (
        <div>
            <p>SOY LA PÁGINA 3</p>
        </div>
    );
}

export default Page;