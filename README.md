

<div  align="center">
<a  href="https://github.com/MemeeMaster/connect-four">
<img  src="/src/assets/images/logo.png"  alt="Logo"  width="66"  height="66">
</a>
<h2>connect-four 🔴🟡</h2>
<p>
Web game in which whoever connects <strong>four</strong> tiles first wins.<br/>
<a href="https://memeemaster.github.io/connect-four/" target="_blank">Live page</a>
</div>

## Installation
To install this application you'll need [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). 
Once you have them, do the following in your command line:
```bash
# Clone the repository
$ git clone https://github.com/MemeeMaster/connect-four

# Open repository
$ cd connect-four

# Install essential dependencies
$ npm install

# Run project with Vite script
$ npm run dev
```
## Game rules
- Be the first player to connect four discs of the same color in a row vertically, horizontally or diagonally,
- Players must take alternating turns, and only one disk can be dropped in each turn,
- On your turn, drop one of the colored disks from above onto any of the seven slots,
- The game ends when there are <strong>4+</strong> discs in a row or a draw,
- The starter from the previous game goes second to the next game.
- Have fun! :sunglasses:

## Features to do in future
- add tests,
- split contexts to separate files,
- add real tile falling animation,
- player vs CPU mode,
- online mode.

## Credits
Packages used to complete this project:
- [Vite](https://vitejs.dev/)
- [react-router-dom](https://github.com/remix-run/react-router)
- [styled-components](https://styled-components.com/)
