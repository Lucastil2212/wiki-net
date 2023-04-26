import React, { useState, useEffect } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import axios from "axios";
import NotesIcon from "@mui/icons-material/Notes";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import NetworkGraph from "../components/NetworkGraph";
import Login from "../components/loginModal";
import SignUp from "../components/signUpModal";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const [networkVisible, setNetworkVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);

  const [currentWikiPage, setCurrentWikiPage] = useState("");

  const [currentUser, setCurrentUser] = useState("");

  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [currentNetworkName, setCurrentNetworkName] = useState("");

  const [nodeData, setNodeData] = useState([]);
  const [edgeData, setEdgeData] = useState([]);
  const [noteData, setNoteData] = useState([]);

  const [notes, setNotes] = useState("");
  const [nodeIndex, setNodeIndex] = useState(0);

  const handleSearchTextChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    createNetwork(search);
    fetchWikiPage(search);
    setSearch("");
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const createNetwork = (name) => {
    setNotes("");

    setNodeData([]);
    setEdgeData([]);

    setNoteData([]);
    setCurrentNetworkName(name);

    const newNodeData = [{ id: 0, label: name }];

    setNodeData(newNodeData);

    console.log(newNodeData);
    console.log(edgeData);

    axios
      .post("http://localhost:3001/createNetwork", {
        networkName: name,
        userName: currentUser,
        data: {
          nodeData: JSON.stringify(newNodeData),
          edgeData: JSON.stringify(edgeData),
          notes: JSON.stringify(noteData),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const expandNetwork = async (page) => {
    let newNodeData = [...nodeData];
    let newEdgeData = [...edgeData];

    let index = nodeData.length + 1;

    newNodeData.push({
      id: index,
      label: page,
    });

    newEdgeData.push({ to: index, from: nodeIndex });

    setNodeIndex(index);

    const newCleanEdgeData = newEdgeData.map((edge) => {
      const { id, ...otherProps } = edge;
      return otherProps;
    });

    setNodeData([...newNodeData]);
    setEdgeData([...newCleanEdgeData]);

    setNotes("");

    axios
      .post("http://localhost:3001/updateNetwork", {
        networkName: currentNetworkName,
        userName: currentUser,
        data: {
          nodes: JSON.stringify(newNodeData),
          edges: JSON.stringify(newCleanEdgeData),
          notes: JSON.stringify(noteData),
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchWikiPage(page);
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

            expandNetwork(wikiPage);
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

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const saveNotes = () => {
    const newNoteData = [...noteData];

    newNoteData[nodeIndex] = notes;

    setNoteData(newNoteData);

    axios
      .post("http://localhost:3001/updateNetwork", {
        networkName: currentNetworkName,
        userName: currentUser,
        data: {
          nodes: JSON.stringify(nodeData),
          edges: JSON.stringify(edgeData),
          notes: JSON.stringify(newNoteData),
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
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
          sx={{ margin: "1% 2% 1% 1%" }}
        >
          <NotesIcon />
        </IconButton>
        {currentUser === "" ? (
          <Button
            variant="contained"
            color="primary"
            id="login"
            onClick={() => handleOpenLogin()}
          >
            Login
          </Button>
        ) : (
          `Welcome ${currentUser}`
        )}
        {currentUser === "" ? (
          <Button
            sx={{ marginLeft: "1%" }}
            variant="contained"
            color="primary"
            id="signup"
            onClick={() => handleOpenSignUp()}
          >
            Sign Up
          </Button>
        ) : (
          ""
        )}
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
        >
          <NetworkGraph
            edgeData={edgeData}
            nodeData={nodeData}
            currentWikiPage={currentWikiPage}
            setCurrentWikiPage={setCurrentWikiPage}
          />
        </div>
        <div id="notesDisplay" style={{ margin: "1% 1% 1% 1%" }} hidden>
          <TextField
            id="notes"
            margin="normal"
            label={`Notes on ${currentWikiPage}`}
            rows={6}
            value={notes}
            onChange={handleNotesChange}
            multiline
            fullWidth
          ></TextField>
          <Button
            id="saveNotes"
            variant="contained"
            color="primary"
            onClick={() => saveNotes()}
          >
            Save notes
          </Button>
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
      <SignUp
        open={openSignUp}
        handleClose={handleCloseSignUp}
        setCurrentUser={setCurrentUser}
      />
      <Login
        open={openLogin}
        handleClose={handleCloseLogin}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}
