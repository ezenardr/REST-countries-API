import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BsMoon, BsSearch } from 'react-icons/bs';

function Index() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);
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
                        <div className="flex gap-4 items-center cursor-pointer">
                            <BsMoon />
                            <p className=" font-semibold">Dark Mode</p>
                        </div>
                    </div>
                </nav>
                {/* searc bar */}
                <div className=" container mx-auto flex flex-col gap-10 lg:flex-row justify-between">
                    <div className="flex gap-3 items-center py-4 lg:py-2 rounded-lg lg:w-[35%] px-4 bg-white shadow-md">
                        <BsSearch />
                        <input
                            className="w-full focus:outline-none"
                            type="text"
                            placeholder="Search for a country..."
                        />
                    </div>
                    <div className="bg-white p-1 w-1/2 lg:w-[15%] shadow-md rounded-lg">
                        <select
                            id="countries"
                            className="bg-white font-semibold focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                        >
                            <option defaultValue="Filter by region">
                                Filter by region
                            </option>
                            <option value="Africa" className="font-semibold">
                                Africa
                            </option>
                            <option value="America" className="font-semibold">
                                America
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
                            data.map(
                                ({
                                    flags,
                                    name,
                                    population,
                                    region,
                                    capital,
                                }) => {
                                    return (
                                        <div
                                            className="bg-light-mode-elements shadow-lg rounded-lg flex flex-col self-center gap-y-5"
                                            key={name.common}
                                        >
                                            <Image
                                                className=" flex-1"
                                                width={300}
                                                height={300}
                                                src={flags.svg}
                                                alt={`flag of ${name.official}`}
                                            />
                                            <div className="flex flex-col gap-2 mx-7 mb-7  flex-1">
                                                <p className=" font-extrabold text-lg pb-2">
                                                    {name.common}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Population:
                                                    </span>
                                                    {` ${population}`}
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