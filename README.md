# Puzzle-Solver
cse30151 - Computing Project 1

### Authors
Patrick Drumm, Nick Lombardo, Ryan McMullen, Kris Thieneman

# Description
Puzzle-Solver is an interactive app in Javascript that runs in a web browser. (At least we hope it will be...)

# Application Instructions
The user opens the application in a local host by running index.html. The user then has the option to enter a string which specifies each tile used
in the puzzle, and a string to specify the frame of the puzzle. The form of the "Tile String" is any number of [c1, c2, c3, c4]
where c1 is the left color of a tile, c2 is the top color, c3 is the right color, and c4 is the bottom color. The form of
the "Frame String" is any number of colors, where the first color is the left-most segment of the frame, and then each consecutive
color in the string is the next clockwise segment in the frame.

If the user enters a valid entry for each string, and
does not check either checkbox option, then the program will test to see whether the entered frame and tiles form a
solvable puzzle. When the "Generate" button is pressed, the application will display a solvable puzzle, and will clear the screen
on an unsolvable puzzle. If the user chooses the "Show Solution" checkbox, then the next puzzle generated will be displayed
in its correct layout, inside of the user-specified frame, in addition to the possible tiles and empty frame.
If the user chooses the "Use Puzzle Size" checkbox, then the program will construct a random, and solvable puzzle with
a number of tiles equal to the number specified in the "Puzzle Size" field.