import React, { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import axios from "axios";
import NotesIcon from "@mui/icons-material/Notes";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const [networkVisible, setNetworkVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);

  const [currentWikiPage, setCurrentWikiPage] = useState("");

  const handleSearchTextChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    fetchWikiPage(search);
    setSearch("");
  };

  const fetchWikiPage = (name) => {
    setCurrentWikiPage(name);

    // fetch(`get_wiki_page.php?search=${name}`)
    fetch(`https://en.wikipedia.org/w/rest.php/v1/page/${name}/html`)
      .then((response) => response.text())
      .then((html) => {
        const wikiPage = document.getElementById("pageDisplay");
        wikiPage.innerHTML = html;

        const anchorTags = document.getElementsByTagName("a");

        const anchorTagsArr = [...anchorTags];

        anchorTagsArr.forEach((tag, i) => {
          const href = anchorTags[i].getAttribute("href");

          tag.addEventListener("click", (e) => {
            e.preventDefault();

            const wikiPage = href.slice(2);

            fetchWikiPage(wikiPage);

            // if (!alreadyFetched(wikiPage)) {
            //   addNode(wikiPage);
            // }
          });
        });
      })
      .catch((e) => console.log(e));
  };

  const toggleNetwork = () => {
    const networkDisplay = document.getElementById("networkDisplay");

    if (networkVisible) {
      networkDisplay.setAttribute("hidden", "hidden");
    } else {
      networkDisplay.removeAttribute("hidden");
    }

    setNetworkVisible(!networkVisible);
  };

  const toggleNotes = () => {
    const notesDisplay = document.getElementById("notesDisplay");

    if (notesVisible) {
      notesDisplay.setAttribute("hidden", "hidden");
    } else {
      notesDisplay.removeAttribute("hidden");
    }

    setNotesVisible(!notesVisible);
  };

  return (
    <div>
      <h1>Wiki-Net</h1>
      <div style={{ background: "skyBlue" }}>
        <TextField
          label="Search Wiki"
          size="small"
          variant="outlined"
          value={search}
          onChange={handleSearchTextChange}
          sx={{ margin: "1% 1% 1%", backgroundColor: "white" }}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={handleSearch}
          sx={{ margin: "1% 0% 1%" }}
        >
          Search
        </Button>
        <IconButton
          color="primary"
          variant="contained"
          onClick={toggleNetwork}
          sx={{ margin: "1% 1% 1% 50%" }}
        >
          <AccountTreeOutlinedIcon />
        </IconButton>
        <IconButton
          color="primary"
          variant="contained"
          onClick={toggleNotes}
          sx={{ margin: "1% 0% 1%" }}
        >
          <NotesIcon />
        </IconButton>
      </div>
      <div>
        <div
          id="networkDisplay"
          style={{
            height: "500px",
            border: "solid black 1px",
            margin: "1% 1% 1% 1%",
          }}
          hidden
        ></div>
        <div id="notesDisplay" style={{ margin: "1% 1% 1% 1%" }} hidden>
          <TextField
            id="notes"
            margin="normal"
            label={`Notes on ${currentWikiPage}`}
            rows={6}
            multiline
            fullWidth
          ></TextField>
        </div>
        <div
          id="pageDisplay"
          style={{
            border: "solid black 1px",
            margin: "1% 1% 1% 1%",
            padding: "1% 1% 1% 1%",
          }}
        ></div>
      </div>
    </div>
  );
}
