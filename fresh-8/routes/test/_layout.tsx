import { PageProps } from "$fresh/server.ts";

const Layout = (props: PageProps) => {
    const Component = props.Component;
    return (
        <div>
            <h1>SOY EL TÍTULO DE LA PÁGINA</h1>
            <Component />
        </div>
    );
}

export default Layout;