---
title : "TerminalTextEffects (TTE)"
# pre : ' '
description : "TerminalTextEffects (TTE) is a terminal visual effects engine, application, and Python library."
date : 2025-01-03T19:49:02+01:00
# hidden : true
# draft : true
weight : 1951
# tags : ['']
---

---

A terminal visual effects engine, application, and library.

## Installation

```plain
python3 -m pip install terminaltexteffects

OR

```plain
pipx install terminaltexteffects
```

## Usage

```plain
tte [-h] [--input-file INPUT_FILE] [--version] [--tab-width (int > 0)] [--xterm-colors] [--no-color] [--wrap-text] [--frame-rate FRAME_RATE] [--canvas-width WIDTH]     [--canvas-height WIDTH]
    [--anchor-canvas {sw,s,se,e,ne,n,nw,w,c}] [--anchor-text {n,ne,e,se,s,sw,w,nw,c}] [--ignore-terminal-dimensions]
    {beams,binarypath,blackhole,bouncyballs,bubbles,burn,colorshift,crumble,decrypt,errorcorrect,expand,fireworks,matrix,middleout,orbittingvolley,overflow,pour,print,rain,randomsequence,rings,scattered,slice,slide,spotlights,spray,swarm,synthgrid,unstable,vhstape,waves,wipe} ...
```

## Flags

```plain
  -h, --help            show this help message and exit
  --input-file, -i INPUT_FILE
                        File to read input from (default: None)
  --version, -v         show program's version number and exit
  --tab-width (int > 0)
                        Number of spaces to use for a tab character. (default: 4)
  --xterm-colors        Convert any colors specified in RBG hex to the closest XTerm-256 color. (default: False)
  --no-color            Disable all colors in the effect. (default: False)
  --wrap-text           Wrap text wider than the canvas width. (default: False)
  --frame-rate FRAME_RATE
                        Target frame rate for the animation. (default: 100)
  --canvas-width WIDTH  Canvas width, set to an integer > 0 to use a specific dimension, or use 0, or -1 to set the dimension based off the input data or the terminal device, respectively. (default: -1)
  --canvas-height WIDTH
                        Canvas height, set to an integer > 0 to use a specific dimension, or use 0, or -1 to set the dimension based off the input data or the terminal device, respectively. (default: -1)
  --anchor-canvas {sw,s,se,e,ne,n,nw,w,c}
                        Anchor point for the canvas. The canvas will be anchored in the terminal to the location corresponding to the cardinal/diagonal direction. (default: sw)
  --anchor-text {n,ne,e,se,s,sw,w,nw,c}
                        Anchor point for the text within the Canvas. Input text will anchored in the Canvas to the location corresponding to the cardinal/diagonal direction. (default: sw)
  --ignore-terminal-dimensions
                        Ignore the terminal dimensions and utilize the full Canvas beyond the extents of the terminal. Useful for sending frames to another output handler. (default: False)

Effect:
  Name of the effect to apply. Use <effect> -h for effect specific help.

  {beams,binarypath,blackhole,bouncyballs,bubbles,burn,colorshift,crumble,decrypt,errorcorrect,expand,fireworks,matrix,middleout,orbittingvolley,overflow,pour,print,rain,randomsequence,rings,scattered,slice,slide,spotlights,spray,swarm,synthgrid,unstable,vhstape,waves,wipe}
                        Available Effects
    beams               Create beams which travel over the canvas illuminating the characters behind them.
    binarypath          Binary representations of each character move through the terminal towards the home coordinate of the character.
    blackhole           Characters are consumed by a black hole and explode outwards.
    bouncyballs         Characters are bouncy balls falling from the top of the canvas.
    bubbles             Characters are formed into bubbles that float down and pop.
    burn                Burns vertically in the canvas.
    colorshift          Display a gradient that shifts colors across the terminal.
    crumble             Characters lose color and crumble into dust, vacuumed up, and reformed.
    decrypt             Display a movie style decryption effect.
    errorcorrect        Some characters start in the wrong position and are corrected in sequence.
    expand              Expands the text from a single point.
    fireworks           Characters launch and explode like fireworks and fall into place.
    matrix              Matrix digital rain effect.
    middleout           Text expands in a single row or column in the middle of the canvas then out.
    orbittingvolley     Four launchers orbit the canvas firing volleys of characters inward to build the input text from the center out.
    overflow            Input text overflows and scrolls the terminal in a random order until eventually appearing ordered.
    pour                Pours the characters into position from the given direction.
    print               Lines are printed one at a time following a print head. Print head performs line feed, carriage return.
    rain                Rain characters from the top of the canvas.
    randomsequence      Prints the input data in a random sequence.
    rings               Characters are dispersed and form into spinning rings.
    scattered           Text is scattered across the canvas and moves into position.
    slice               Slices the input in half and slides it into place from opposite directions.
    slide               Slide characters into view from outside the terminal.
    spotlights          Spotlights search the text area, illuminating characters, before converging in the center and expanding.
    spray               Draws the characters spawning at varying rates from a single point.
    swarm               Characters are grouped into swarms and move around the terminal before settling into position.
    synthgrid           Create a grid which fills with characters dissolving into the final text.
    unstable            Spawn characters jumbled, explode them to the edge of the canvas, then reassemble them in the correct layout.
    vhstape             Lines of characters glitch left and right and lose detail like an old VHS tape.
    waves               Waves travel across the terminal leaving behind the characters.
    wipe                Wipes the text across the terminal to reveal characters.

Ex: ls -a | tte decrypt --typing-speed 2 --ciphertext-colors 008000 00cb00 00ff00 --final-gradient-stops eda000 --final-gradient-steps 12 --final-gradient-direction vertical
```

## Examples

### Decrypt

![decrypt](images/decrypt.gif)

### Fireworks

![fireworks](images/fireworks.gif)

### Pour

![pour](images/pour.gif)

## URL list

- [Github.com - Terminal Text Effects](https://github.com/ChrisBuilds/terminaltexteffects)
