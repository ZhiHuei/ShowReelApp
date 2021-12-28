import React, { useState, useEffect } from "react";
import config from './config.json';
import axios from 'axios';

import Sidebar from './sidebar/Sidebar';
import Player from './player/Player';

import './App.scss';

function App() {
  const [clips, setClips] = useState([]);
  const [selectedClips, setSelectedClips] = useState([]);

  useEffect(() => {
    const fetchClips = async () => {
      console.log('Fetching clips....');
      var query = `query Query {\
                clips {\
                    name,\
                    description,\
                    standard,\
                    definition, \
                    startTimecode,\
                    endTimecode\
                }\
            }`
      const result = await axios.post(config.serverUrl + '/graphql', { query },
        {
          headers:
          {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
      setClips(result.data.data.clips);
    }
    fetchClips();
  }, []);

  const onSidebarChanged = (param) => {
    let updatedClips = [];
    if (param.selected) {
      updatedClips = [
        ...selectedClips,
        param
      ];
    } else {
      updatedClips = selectedClips.filter(item => item.name !== param.name);
    }
    setSelectedClips(updatedClips);
  }

  return (
    <div className="App">
      <div className="App-header">
        <span className="logo">
          <div className="vl">
            <span>Show Reel Application</span>
          </div>
        </span>
      </div>

      <div className="App-body">
        <Sidebar selectClip={onSidebarChanged} clips={clips}></Sidebar>
        <Player selectedClips={selectedClips}></Player>
      </div>
    </div>
  );
}

export default App;
