import clsx from "clsx";
import React, { useState } from "react";

const statsMap = {
  abilityhaste: "ability haste",
  attackdamage: "attack damage",
  abilitypower: "ability power",
  armor: "armor",
  health: "health",
  lethality: "lethality",
  magicpenetration: "magic penetration",
  magicresist: "magic resist",
  mana: "mana",
  movespeed: "movement speed",
  percentarmorpenetration: "armor penetration %",
  percentattackspeed: "attack speed %",
  percentbasehealthregen: "health regen %",
  percentbasemanaregen: "mana regen %",
  percentcriticalstrikechance: "crit chance %",
  percentcriticalstrikedamage: "crit damage %",
  percenthealandshieldpower: "heal & shield power %",
  percentlifesteal: "lifesteal %",
  percentmagicpenetration: "magic penetration %",
  percentmovespeed: "movement speed %",
  percentomnivamp: "omnivamp %",
  percenttenacity: "tenacity %",
};

const Item = ({ item }) => {
  let itemUrl = "";
  if (item.id > 0) itemUrl = `/items/${item.id}.png`;

  const [showToolTip, setShowToolTip] = useState(false);

  function handleMouseOver() {
    setShowToolTip(true);
  }

  function handleMouseOut() {
    setShowToolTip(false);
  }

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="flex relative flex-col justify-between items-center"
    >
      {item.id > 0 && (
        <span className="text-xs text-black pb-1">{item.name}</span>
      )}

      <div>
        {item.id > 0 ? (
          <img src={itemUrl} alt={item.name} />
        ) : (
          <div
            style={{ height: "127px", display: "flex", alignItems: "center" }}
          >
            <p>empty slot</p>
          </div>
        )}

        {item.id > 0 && (
          <div
            className={clsx(
              showToolTip ? "absolute" : "hidden",
              "w-fit bg-white rounded border p-3 left-1/2 -translate-x-1/2 mt-2 top-full z-50 shadow-md",
            )}
          >
            <div className="whitespace-nowrap text-lg">{item.name}</div>
            {Object.keys(statsMap).map((key) => {
              if (item[key] > 0) {
                return (
                  <div key={key} className="whitespace-nowrap capitalize">
                    <span>
                      {item[key]}
                      {statsMap[key].includes("%") && "%"}{" "}
                      <span className="text-gray-600 text-sm">
                        {statsMap[key].replace("%", "")}
                      </span>
                    </span>
                  </div>
                );
              }
            })}
            <div className="tool-cost">
              {item.cost}
              <span className="text-sm text-gray-600"> Gold</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
