import Button from '@/components/Button';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';

const fetchData = async (url) => {
    const res = await fetch(url);
    const jsonData = await res.json();
    return jsonData;
};
function Index() {
    const [filter, setFilter] = useState('all');
    const [data, setData] = useState(null);
    const [input, setInput] = useState('');
    useEffect(() => {
        fetchData('https://restcountries.com/v3.1/all').then((data) =>
            setData(data)
        );
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        if (input.length > 0) {
            fetchData(`https://restcountries.com/v3.1/name/${input}`).then(
                (data) => setData(data)
            );
        } else {
            fetchData('https://restcountries.com/v3.1/all').then((data) =>
                setData(data)
            );
        }
    };
    return (
        <>
            <Head>
                <title>REST Countries API</title>
            </Head>
            <main>
                {/* navigation */}
                <nav className="py-5 mb-10 bg-white dark:bg-dark-mode-elements shadow-sm">
                    <div className="container mx-auto flex items-center justify-between">
                        <h1 className=" font-extrabold text-lg">
                            Where in the world
                        </h1>
                        <Button />
                        {/* <button className="flex gap-4 items-center cursor-pointer">
                            <BsMoon />
                            <p className=" font-semibold">Dark Mode</p>
                        </button> */}
                    </div>
                </nav>
                {/* search bar */}
                <div className=" container mx-auto flex flex-col gap-10 lg:flex-row justify-between">
                    <form
                        onSubmit={submitHandler}
                        className="flex gap-3 items-center py-4 lg:py-2 rounded-lg lg:w-[35%] px-4 bg-white dark:bg-dark-mode-elements shadow-md"
                    >
                        <BsSearch />
                        <input
                            className="w-full focus:outline-none dark:bg-dark-mode-elements"
                            type="text"
                            placeholder="Search for a country..."
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                        />
                    </form>
                    <div className="bg-white dark:bg-dark-mode-elements p-1 w-1/2 lg:w-[15%] shadow-md rounded-lg">
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                setFilter(value);
                            }}
                            id="countries"
                            className="bg-white dark:bg-dark-mode-elements font-semibold focus:outline-none block w-full p-2.5 dark:placeholder-gray-400 dark:text-white "
                        >
                            <option value="all">Filter by region</option>
                            <option value="Africa" className="font-semibold">
                                Africa
                            </option>
                            <option value="Americas" className="font-semibold">
                                Americas
                            </option>
                            <option value="Asia" className="font-semibold">
                                Asia
                            </option>
                            <option value="Europe" className="font-semibold">
                                Europe
                            </option>
                            <option value="Oceania" className="font-semibold">
                                Oceania
                            </option>
                        </select>
                    </div>
                </div>
                {/* countries */}
                <section className="container mx-auto mt-16">
                    <div className=" flex flex-col lg:flex-row flex-wrap lg:justify-between gap-y-16">
                        {data &&
                            data
                                .filter(({ region }, i, arr) => {
                                    if (filter === 'all') return arr;
                                    else return filter === region;
                                })
                                .map(
                                    (
                                        {
                                            flags,
                                            name,
                                            population,
                                            region,
                                            capital,
                                        },
                                        i
                                    ) => {
                                        return (
                                            <div
                                                className="bg-light-mode-elements dark:bg-dark-mode-elements shadow-lg rounded-lg flex flex-col self-center gap-y-5"
                                                key={i}
                                            >
                                                <Image
                                                    className=" flex-1"
                                                    width={300}
                                                    height={300}
                                                    src={flags.svg}
                                                    alt={`flag of ${name.official}`}
                                                />
                                                <div className="flex flex-col gap-2 mx-7 mb-10  flex-1">
                                                    <p className=" font-extrabold text-lg pb-2">
                                                        {name.common}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">
                                                            Population:
                                                        </span>
                                                        {` ${population.toLocaleString(
                                                            'en-US'
                                                        )}`}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">
                                                            Region:
                                                        </span>
                                                        {` ${region}`}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">
                                                            Capital:
                                                        </span>
                                                        {` ${capital}`}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default Index;
