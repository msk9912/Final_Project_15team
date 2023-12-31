import React, { useState, useEffect } from "react";
import { Paper, InputBase, IconButton, Button } from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

export default function MusicSearch(props) {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);

  const searchCall = () => {
    axios
      .get("http://localhost:8080/youtube/search", {
        params: { word: search },
      })
      .then((res) => {
        console.log("musicsearch, useEffect");
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/youtube/search", {
  //       params: { word: search },
  //     })
  //     .then((res) => {
  //       console.log("musicsearch, useEffect");
  //       console.log(res.data);
  //       setData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [search]);

  const changeVideoId = (data) => {
    let tempVideoId = "";
    console.log("changeVideoId");
    console.log(data);
    tempVideoId = data.videoId;
    let [a, b] = tempVideoId.split("=");
    console.log(a);
    if (b) {
      props.setVideoId(b);
    }
    props.setCoverImg(data.imageUrlPath);
  };

  const getValue = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const searched = data.filter((item) =>
    item.title.toLowerCase().includes(search)
  );
  return (
    <div style={{ margin: "1rem" }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 200,
          margin: "auto",
          marginBottom: "0.4rem",
        }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색어를 입력해주세요"
          inputProps={{ "aria-label": "search google maps" }}
          value={search}
          onChange={getValue}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon onClick={searchCall} />
        </IconButton>
      </Paper>
      <Paper
        sx={{
          alignItems: "center",
          margin: "auto",
          marginTop: "0.4rem",
          marginBottom: "0.4rem",
        }}>
        {search
          ? searched.map((i) => {
              return (
                <Button
                  style={{ display: "block", margin: "auto" }}
                  onClick={() => changeVideoId(i)}>
                  <Paper
                    sx={{
                      p: "2px 4px",
                      alignItems: "center",
                      margin: "auto",
                      marginTop: "0.4rem",
                      padding: 1,
                      background: "#dfe9f5",
                    }}>
                    {i.title}
                  </Paper>
                </Button>
              );
            })
          : null}
      </Paper>
    </div>
  );
}
