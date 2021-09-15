import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps() {
    const res = await fetch(defaultEndpoint)
    const data = await res.json();
    return {
        props: {
            data
        }
    }
}

export default function Home({ data }) {
    const { info, results: defaultResults = [] } = data;

    const [results, updateResults] = useState(defaultResults);

    const [page, updatePage] = useState({
        ...info,
        current: defaultEndpoint
    });
    const { current } = page;

    //testing functions setup in useEffect

    useEffect(() => {


        if (current === defaultEndpoint) return;


        async function request() {
            const res = await fetch(current)
            const nextData = await res.json();

            updatePage({
                current,
                ...nextData.info
            });


            if (!nextData.info?.prev) {
                updateResults(nextData.results);
                return;
            }


            updateResults(prev => {
                return [
                    ...prev,
                    ...nextData.results
                ]
            });
        }

        request();
    }, [current]);


    return (
        <div>This is home page</div>
    )
}
