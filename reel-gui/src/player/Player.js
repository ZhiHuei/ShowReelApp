import React from 'react';
import Stacked from '../stacked/Stacked';
import {
  CardContent,
  IconButton,
  Typography,
  TextField
} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

import './Player.scss';

function Player(props) {
  const { selectedClips } = props;

  return (
    <div>
      <CardContent>
        <TextField id="outlined-basic" label="Reel Name" variant="outlined" className="textfield" inputProps={{className:"input"}}/>
        <div className="info">
          <Typography variant="body1" color="textSecondary">
            Standard: {selectedClips[0]?.standard}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Definition: {selectedClips[0]?.definition}
          </Typography>
        </div>
        <iframe
          title="placeholder"
          id="video"
          width="700"
          height="600"
          src={"https://www.youtube.com/embed/"}
          frameBorder="0"
          allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </CardContent>
      <div>
        <IconButton aria-label="Previous">
          <SkipPreviousIcon />
        </IconButton>
        <IconButton aria-label="Play/pause">
          <PlayArrowIcon />
        </IconButton>
        <IconButton aria-label="Next">
          <SkipNextIcon />
        </IconButton>
      </div>
      <Stacked selectedClips={selectedClips}></Stacked>
    </div>
  )
}

export default Player;