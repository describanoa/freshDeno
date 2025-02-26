import { FunctionalComponent } from "preact/src/index.d.ts";
import { Character } from "../types.ts";

type Props = {
    data: Character;
}

export const Characters: FunctionalComponent<Props> = (Props) => {
    const { data } = Props;

    return (
        <div key={data.id}>
            <h1>{data.name}</h1>
            <p>ID: {data.id}</p>
            <p>Status: {data.status ? data.status : 'Unknown'}</p>
            <p>Species: {data.species ? data.species : 'Unknown'}</p>
            <p>Type: {data.type ? data.type : 'Unknown'}</p>
            <p>Gender: {data.gender ? data.gender : 'Unknown'}</p>
            <p>Origin: <a href={data.origin.url} target="_blank">{data.origin.name}</a></p>
            <p>Location: <a href={data.location.url} target="_blank">{data.location.name}</a></p>
            <br/>
            <p>Image: <img src={data.image} alt={data.name}/></p>
            <br/>
            <p>Url: <a href={data.url} target="_blank">{data.name}</a></p>
        </div>
    );
}