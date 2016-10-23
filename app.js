'use strict';

/* Constants for required node modules, app is the name of the express router*/
const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const levelAmounts = fs.readFileSync('levelAmounts.json', 'utf8');

var BASE_SKILLS = [
	'overall', 'attack', 'defence', 'strength', 'hitpoints', 'ranged',
	'prayer', 'magic', 'cooking', 'woodcutting', 'fletching', 'fishing',
	'firemaking', 'crafting', 'smithing', 'mining', 'herblore', 'agility',
	'thieving', 'slayer', 'farming', 'runecraft', 'hunter', 'construction'
];

var urls = {
	'osrs': 'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=',
	'rs3': 'http://hiscore.runescape.com/index_lite.ws?player='
};

var skills = {
	'osrs': BASE_SKILLS,
	'rs3': BASE_SKILLS.concat('summoning', 'dungeoneering', 'divination')
};

let lookup = (player, game, callback) => {
	if (!urls.hasOwnProperty(game)) {
		game = 'rs3';
	}
	var url = urls[game].concat(encodeURIComponent(player));
	request(url, function(err, res, body) {
		if (err) {
			return callback(err);
		}
		var statusCode = res.statusCode;
		switch(statusCode) {
			case 200:
				return callback(null, parseStats(body,skills[game]));
			case 404:
				return callback(new Error('Player not found'));
			default:
				return callback(new Error(statusCode));
		}
	});
};

function parseStats(raw, skillsList) {
	var stats = raw.split('\n').slice(0, skillsList.length);
	var statsObj = { };
	stats.forEach(function(stat, index) {
		var chunk = stat.split(',');
		statsObj[skillsList[index]] = {
			rank: +chunk[0],
			level: +chunk[1],
			xp: +chunk[2]
		};
	});
	return statsObj;
}

/* Serve files out of the public directory, not the root directory */
app.use(express.static(__dirname + '/public'));

// handler for GET requests for hiscores
app.get('/hiscores', (req, res) => {
  let player = req.query.username;
  let game = req.query.game || 'osrs';
  lookup(player, game, (err, stats) => {
    if (err) {
      console.log(`failed to retrieve scores for user ${player} - ${err}`);
      res.send(err);
    } else {
			if (player === 'Nihilus RS') {
				stats.magic.xp = '0 (botted)';
				stats.strength.xp = '0 (botted)';
				stats.attack.xp = '0 (botted)';
				stats.fishing.xp = '0 (botted)';
			}
			res.send({status: 200, response: stats});
    }
  });
  // let url = `http://hiscore.runescape.com/index_lite.ws?player=${player}`; //rs3 hiscores
  // if (req.query.oldschool) {
  //   url = `http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${player}`; //osrs hiscores
  // }
  // request.get(url, (err, response, body) => {
  //   if (err) {
  //     console.log(`failed to retrieve scores for user ${player} - ${err}`);
  //     res.send(err);
  //   } else {
  //     // console.log(Object.keys(response));
  //     // console.log(response.statusCode);
  //     res.send({status: response.statusCode, response: body});
  //   }
  // });
});

app.get('/xp', (req, res) => {
  res.send(levelAmounts);
});

/* listen on localhost:3000
  TODO: Implement a way to listen dynamically based on app environment (e.g. cfenv module)
*/
app.listen(3000, function () {
  console.log('go http://localhost:3000/ to view the Calculator');
});
