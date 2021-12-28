import React, { useState, useEffect } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

import './Sidebar.scss'

function Sidebar(props) {
  const { clips } = props;
  
  const [toCheck, setToCheckItems] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([false]);

  
  useEffect(() => {
    // initialise checkboxes initialState
    const initialState = clips.map(o => false);
    setCheckboxStates(initialState);
  }, [clips]);

  const handleChange = (param, index) => (event) => {
    const checked =  event.target.checked;
    const clipType = toCheck[0];
    const states = [...checkboxStates];
    if (clipType && (param.standard !== clipType.standard || param.definition !== clipType.definition)) {
      // unselect checkbox
      states[index] = false;
      setCheckboxStates(states);

      return;
    }
    
    
    if (!checked) {
      setToCheckItems(
        toCheck.filter(item => item.name !== param.name)
      );
    } else {
      setToCheckItems([
        ...toCheck,
        param
      ]);
    }

    states[index] = checked;
    setCheckboxStates(states);

    props.selectClip({
      selected: checked, name: param.name, standard: param.standard,
      definition: param.definition, startTimecode: param.startTimecode, endTimecode: param.endTimecode
    });
  }

  return (
    <div className="sidebar">
      {clips.map((clip, index) => {
        if (clip) {
          return (
            <div key={index}>
              <div className="clip-container">
                <p>
                  <span className="name">{clip.name}</span>
                  <span className="description">{clip.description}</span>
                  <span className="standard">Standard: {clip.standard}</span>
                  <span className="definition">Definition: {clip.definition}</span>
                </p>
                <Checkbox
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  onChange={handleChange(clip, index)}
                  checked={checkboxStates[index] ? checkboxStates[index] : false}
                />
              </div>
              <Divider />
            </div>
          )
        }
        return (null);
      })}
    </div>
  )
}

export default Sidebar;