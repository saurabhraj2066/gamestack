import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import ExpandableText from "./ExpandableText";
import DefinitionItem from "./DefinitionItem";
import GameTrailer from "./GameTrailer";
import GameScreenShots from "./GameScreenShots";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GameDisplay = ({ darkTheme }) => {
  const data = useParams();
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const gameData = useGame(data.slug, setLoading);

  if (loading) {
    // Render loading skeleton while data is being fetched
    return (
      <SkeletonTheme
        color={darkTheme ? "#282c36" : "#f2f2f2"}
        highlightColor={darkTheme ? "#3a3f4e" : "#f5f5f5"}
      >
        <div className={darkTheme ? "game-display" : "light-game-display"}>
          <div>
            <Skeleton height={30} width={300} />
            <Skeleton height={200} />
            <div className={darkTheme ? "df-items" : "light-df-items"}>
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={100} />
            </div>
          </div>
          <div className="game-visuals">
            <div className={"game-trailer"}>
              <Skeleton height={200} width={300} />
            </div>
            <div className={"game-ss"}>
              <Skeleton height={200} width={300} />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  // Once data is loaded, render the actual content
  const platforms = gameData.parent_platforms.map((item) => item.platform.name);
  const genres = gameData.genres.map((item) => item.name);

  return (
    <div className={darkTheme ? "game-display" : "light-game-display"}>
      <div>
        <h1>{gameData.name}</h1>
        <ExpandableText description={gameData.description_raw} />
        <div className={darkTheme ? "df-items" : "light-df-items"}>
          <DefinitionItem term="Platform" items={platforms} />
          <DefinitionItem term="Genres" items={genres} />
          <DefinitionItem term="Metascore" items={[gameData.metacritic]} />
          <DefinitionItem
            term="Publishers"
            items={[gameData.publishers[0].name]}
          />
        </div>
      </div>
      <div className="game-visuals">
        <div className={"game-trailer"}>
          <GameTrailer slug={data.slug} />
        </div>
        <div className={"game-ss"}>
          <GameScreenShots slug={data.slug} />
        </div>
      </div>
    </div>
  );
};

export default GameDisplay;
