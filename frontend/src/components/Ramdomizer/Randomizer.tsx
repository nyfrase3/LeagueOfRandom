import { useState } from "react";

import Champion from "./Champion";

import ChampionFilters from "./ChampionFilters";
import ItemFilters from "./ItemFilters";
import DefaultChampion from "./DefaultChampion";
import ChampionNames from "./ChampionNames";
import Build from "../Build";
import Stats from "../Stats";
import Item from "../Item";

function Randomizer() {
  const [champion, setChampion] = useState(null);
  const [type, setType] = useState("ALL");
  const [classState, setClassState] = useState("ALL");
  const [build, setBuild] = useState(null);
  const [selectedChampion, setSelectedChampion] = useState("ANY");

  const [boots, setBoots] = useState("ALL");
  const [mainStat, setMainStat] = useState("ALL");
  const [none, setNone] = useState(false);
  const [all, setAll] = useState(true);

  const [subStats, setSubStats] = useState({
    health: true,
    percentattackspeed: true,
    mana: true,
    abilityhaste: true,
    armor: true,
    magicresist: true,
    attackdamage: true,
    abilitypower: true,
  });

  const getRandom = () => {
    fetch(
      `${
        import.meta.env.VITE_APP_URL
      }randomChampion/${selectedChampion}/${type}/${classState}`,
    )
      .then((res) => res.json())
      .then((json) => setChampion(json[0]));

    const body = {};
    Object.keys(subStats).map((stat) => {
      if (subStats[stat]) {
        body[stat] = true;
      }
    });

    fetch(`${import.meta.env.VITE_APP_URL}randomItems/${boots}/${mainStat}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => setBuild(json));
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 gap-10 pt-10">
        <div className="flex flex-col gap-5">
          <ChampionFilters
            type={type}
            setType={setType}
            classState={classState}
            setClassState={setClassState}
          />
          <ChampionNames
            name={selectedChampion}
            setName={setSelectedChampion}
          />
        </div>

        <div className='w-full'>
          {champion && (
            <section className="text-gray-800">
              <h1 className="text-center text-xl font-bold">{champion.name}</h1>
              <div className="text-gray-600 pb-2 block text-center capitalize">
                {champion.title}
              </div>
              <div>
                <img
                  className="mx-auto rounded shadow-lg"
                  src={`/champions/${champion.name.replaceAll(
                    /['\s]/g,
                    "",
                  )}.jpg`}
                />
              </div>
            </section>
          )}

          {build && (
            <div className="pt-10">
              <div className="grid shadow-md border p-5 rounded-xl gap-4 gap-y-8 w-fit mx-auto grid-cols-3">
                {build?.map((item) => (
                  <div
                    key={item.id}
                  >
                    <Item item={item} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center flex-col lg:pt-[20%]">
            <button
              className="inline-flex w-1/2 items-center mx-auto justify-center gap-2 rounded-md border border-green-500 bg-green-50 px-2 py-1.5 text-green-800 transition-colors hover:bg-green-100 hover:text-green-900"
              onClick={getRandom}
            >
              Randomize
            </button>
            {!champion && (
              <section className="text-gray-900 w-full pt-5 text-center max-w-lg">
                <p>
                  You will be presented with a random champion, and a random
                  build. Select different options to tailor the results to your
                  desire.
                  <br />
                  Remember to have fun on the rift!
                </p>
              </section>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Stats items={build} />
          <ItemFilters
            boots={boots}
            setBoots={setBoots}
            mainStat={mainStat}
            setMainStat={setMainStat}
            none={none}
            setNone={setNone}
            all={all}
            setAll={setAll}
            subStats={subStats}
            setSubStats={setSubStats}
          />
        </div>
      </div>
    </>
  );
}

export default Randomizer;
