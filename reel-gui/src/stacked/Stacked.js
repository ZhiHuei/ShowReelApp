import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Helper from '../utils/helper';

import './Stacked.scss';

function Stacked(props) {
  const { selectedClips } = props;
  const colors = ['#4BCBE2', '#742478', '#FEB000', '#FF7200', '#224396', '#59C458'];

  let finalDurationHMS = 0;

  const generateReel = () => {
    const steps = [];
    let duration = 0;
    for (var i = 1; i <= selectedClips.length; i++) {
      const selectedClip = selectedClips[i - 1];
      const current = Number(Helper.parseTimecodeToSeconds(selectedClip.endTimecode, selectedClip.standard));
      duration = Number(duration) + current;
      steps.push(
        <ProgressBar
          striped
          label={selectedClip.name}
          now={current / duration * 100}
          key={i}
          style={{ backgroundColor: colors[i - 1] }}>
        </ProgressBar>
      );
    }
    finalDurationHMS = Helper.convertSecondsToHMS(duration, selectedClips[0]?.standard);
    return steps;
  }


  return (
    <div className="stacked-container">
      <ProgressBar>
        {generateReel()}
      </ProgressBar>
      <span className="duration">
        Duration: {finalDurationHMS}
      </span>
    </div>
  )
}

export default Stacked;