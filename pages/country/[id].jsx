import Navigation from '@/components/Navigation';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const fetchData = async (url) => {
    const res = await fetch(url);
    const jsonData = await res.json();
    return jsonData;
};
const Country = () => {
    const [data, setData] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    fetchData(`https://restcountries.com/v3.1/name/${id}`).then((data) =>
        setData(data)
    );
    return (
        <>
            <Navigation />
            <main className="container mx-auto">
                <Link
                    href="/"
                    className=" flex gap-4 bg-white dark:bg-dark-mode-elements py-3 items-center justify-center px-5 w-[30%] shadow-lg rounded-md mb-20 text-black dark:text-white"
                >
                    <AiOutlineArrowLeft />
                    Back
                </Link>
                {data &&
                    data.map(
                        (
                            {
                                flags,
                                name,
                                population,
                                region,
                                subregion,
                                capital,
                                tld,
                                currencies,
                                languages,
                                borders,
                            },
                            i
                        ) => {
                            const lang = Object.values(languages);
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col lg:flex-row lg:items-center lg:gap-20  self-center gap-y-10"
                                >
                                    <Head>
                                        <title>{name.official}</title>
                                    </Head>
                                    <Image
                                        className=" self-center lg:w-[30rem]"
                                        width={350}
                                        height={300}
                                        src={flags.svg}
                                        alt={`flag of ${name.official}`}
                                    />
                                    <div className="flex flex-col gap-10">
                                        <div className="lg:flex gap-[13rem] items-center">
                                            <div className="flex flex-col gap-2 mb-6 ">
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
                                                        Subregion:
                                                    </span>
                                                    {` ${subregion}`}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Capital:
                                                    </span>
                                                    {` ${capital}`}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2 mb-4  flex-1">
                                                <p>
                                                    <span className="font-semibold">
                                                        Top Level Domain:
                                                    </span>
                                                    {` ${tld}`}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Currencies:
                                                    </span>
                                                    {Object.entries(
                                                        currencies
                                                    ).map(
                                                        ([code, currency]) => (
                                                            <span key={code}>
                                                                {` ${currency.name}`}
                                                            </span>
                                                        )
                                                    )}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Languages:{' '}
                                                    </span>
                                                    {lang.map((el, i) => (
                                                        <span
                                                            key={i}
                                                        >{` ${el},`}</span>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col lg:flex-row gap-3 lg:items-center mb-10">
                                            <p className="font-semibold text-xl">
                                                Border Countries:
                                            </p>
                                            <div className="flex gap-3">
                                                {borders.map((el, i) => (
                                                    <div
                                                        key={i}
                                                        className=" py-2 px-4 bg-white dark:bg-dark-mode-elements rounded-lg shadow-md"
                                                    >
                                                        {el}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
            </main>
        </>
    );
};

export default Country;
