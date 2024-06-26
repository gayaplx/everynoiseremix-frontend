import React, { useEffect, useState } from "react";

// COMPONENTS
import SearchBar from "./components/searchBar/searchBar";
import Title from "./components/title/title";
import Results from "./components/results/results";
// COMPONENTS

// STYLESHEET
import "./globalStyles.scss";
// STYLESHEET

export default function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; // calling the spotify API parameters
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET; // calling the spotify API parameters
  
  // STATES
  const [isValidated, setIsValidated] = useState(false); // state that will check if the input values are valid (will have to check if the API returns 200);
  const [artistName, setArtistName] = useState(""); // state that stores the name of the artist that we want to find;
  const [accessToken, setAccessToken] = useState(""); // state that store the access token for the spotify API;
  const [genres, setGenres] = useState([]); // state that stores the genres that is given by the API call;
  // STATES

  useEffect(() => {
    // will generate an access token for the Spotify API
    var authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((results) => results.json())
      .then((data) => {
        setAccessToken(data.access_token); // sets the accessToken state with the result of the API call
      });
  }); // runs directly after the launch of the website;

  return (
    <section id="mainContainer">
      <div id="searchBarContainer">
        <Title artistName={artistName} />
        <SearchBar
          setIsValidated={setIsValidated}
          isValidated={isValidated}
          setArtistName={setArtistName}
          artistName={artistName}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          setGenres={setGenres}
        />
      </div>
      <Results accessToken={accessToken} genres={genres} />
    </section>
  );
}
