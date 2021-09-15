import Head from 'next/head';
import Link from 'next/link';

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps({ query }) {
    const { id } = query;
    const res = await fetch(`${defaultEndpoint}${id}`);
    const data = await res.json();
    return {
        props: {
            data
        }
    }
}

export default function Character({ data }) {

}
