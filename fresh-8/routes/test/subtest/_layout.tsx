import { PageProps } from "$fresh/server.ts";

const Layout = (props: PageProps) => {
    const Component = props.Component;
    return (
        <div>
            <h2>SOY EL SUBTÍTULO DE LA PÁGINA</h2>
            <Component />
        </div>
    );
}

export default Layout;