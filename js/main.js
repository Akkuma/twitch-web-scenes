import scenes from './scenes.js'

const url = new URL(location.href);

const toShow = url.searchParams.get('show') || getComputedStyle(document.documentElement).getPropertyValue('--view');
if (toShow) {
	[...document.getElementsByClassName(toShow)]
		.forEach(_ => _.classList.add('show'));
}

const camelShow = toShow.split('_').map((_, i) => {
	if (i === 0) return _;
	else return `${_[0].toUpperCase()}${_.substring(1, _.length)}`;
}).join('');

scenes[camelShow]();

const hypeVid = document.getElementById('hype');
document.getElementById('unmute').addEventListener('click', function() {
	hypeVid.muted = !hypeVid.muted;
	hypeVid.removeAttribute('muted');
});

/*
anime({
	targets: document.getElementById('hype_container'),
	translateX: ['-50%', '-50%'],
	translateY: ['-50%', '-50%'],
	scale: [5,1],
	direction: 'normal',
	duration: 180 * 1000,
	delay: 10 * 1000,
})
*/
/* Based on https://codepen.io/petebarr/pen/ALwKxW */
/*
var alphaEffect = false;
var alphaStart = 1;
var scaleFactor = 2.83*2 // by volume with 8 circs at 32px rad
var initialScale = 0.6;
var finalScale = initialScale*scaleFactor*1.1;
var offset = 1/10;
var travel = 50;

if(alphaEffect) {
	alphaStart = 0;
}

TweenMax.set('svg', {
	visibility: 'visible'
});

//TweenMax.set('.ellipse', { transformOrigin: "50% 50%" });

var tl = new TimelineMax({ repeat: -1 });

	tl.fromTo('.ellipses', 3.5, { x: 0 }, { x: 1082, ease:  SlowMo.ease.config(0.1, 0.9, false) })
	 .staggerFromTo('.ellipse', 2.5, { x: -350, autoAlpha: alphaStart }, { x: 350, autoAlpha: 1, ease: SlowMo.ease.config(0.25, 1.0, false), transformOrigin: "50% 50%"}, offset, "-=3.4")
	 .staggerFromTo('.ellipse', 1.75, { scale: initialScale }, { scale: finalScale, ease: SlowMo.ease.config(0, 1, true), yoyo: true}, offset, "-=3.0")
*//*
async function getLoyalUsers() { 
  const res = await fetch('https://api.streamelements.com/kappa/v2/points/5beb38cfa66a375d58520fd5/top?limit=5');
	const json = await res.json();
	return json.users;
}
const loyalUsers = getLoyalUsers();
const staticTips = [
	'Always make sure each of your waifus believes they are best.',
	'Beer is best when it is good beer.',
	'Patience is a virtue. Watching Akkuma stream a blessing.',
	'A man and a bear once fought. They gave birth to Akkuma.',
	`The Free World's Hobo Army wants you to join the cause! The benefits include cardboard boxes!`,
	'A man with one waifu is a man who knows not how to juggle.',
	`Make sure to get a towel & pants. This stream can induce spontaneous <img class="flip" src="https://cdn.frankerfacez.com/emoticon/386573/4">`,
	'Riding a T-Rex naked is the quickest way to get to work.',
	`I'm currently ensuring my handlebars are curled to a perfect circumference.`,
	'Tell my loved ones I died in a coordinated cat assault!',
	'For a few dollars a month you too can get the glory of being in a tip',
	`We got low prices on all of our memes <img src="https://cdn.frankerfacez.com/emoticon/229760/4">, <img src="https://cdn.frankerfacez.com/emoticon/29990/4">, <img src="https://cdn.frankerfacez.com/emoticon/381875/4">, <img src="https://cdn.frankerfacez.com/emoticon/262458/4">, <img src="https://cdn.frankerfacez.com/emoticon/298485/4">, and more! Get them while they're hot!`
];

const wrapUserText = fn => user => fn(`<span class="user">${user}</span>`) 
const dynamicTips = [
	wrapUserText(user => `I hear ${user}'s beard is such an aphrodisiac that one hair will guarantee herculean strength in bed`),
	wrapUserText(user => `A long time ago, ${user} came down from the heavens and blessed us with their presence`),
	wrapUserText(user => `Legend has it that ${user} taught Putin how to ride and tame bears.`),
	wrapUserText(user => `There was going to be a movie based on ${user}'s life, but it was so incredible no one would believe it.`),
	wrapUserText(user => `In the beginning there was ${user} and then they made God in their image.`),
	wrapUserText(user => `Vegeta's scouter was mistakingly picking up ${user}'s over 9000 power level.`),
	wrapUserText(user => `Dragon Ball Super's next story arc will feature ${user} as the new protagonist.`),
	wrapUserText(user => `${user} gives the best hugs. Especially while naked <img class="flip" src="https://static-cdn.jtvnw.net/emoticons/v1/55338/3.0">`),
]

const allTips = [
	...dynamicTips,
	...staticTips
]

const tipContent = document.getElementById('tip-content');

function randomFromArr(arr) {
	return arr[Math.floor(Math.random()* arr.length)];
}

function randomIndex(arr) {
	return Math.floor(Math.random()* arr.length);
}

function updateTip(tip) {
	tipContent.innerHTML = tip;
}

(async function loop(prevTips, prevUsers) {
	const users = await Promise.race([loyalUsers, []]);
	let tips = staticTips;
	let user = '';
	if (users.length) {
		tips = allTips;
		if (prevUsers.length === users.length) prevUsers = [];
		while ((user = randomFromArr(users).username) && prevUsers.includes(user)){};
	}

	if (prevTips.length === tips.length) prevTips = [];

	let tip = '';
	while ((tip = randomFromArr(tips)) && prevTips.includes(tip)){};
	prevTips.push(tip);

	if (typeof tip === 'function') {
		prevUsers.push(user);
		tip = tip(user);
	}

	updateTip(tip);
	setTimeout(_ => loop(prevTips, prevUsers), 9900);
})([], []);

const paths = [...document.querySelectorAll('path[id*="__brush"]')].reverse();

const pathLens = paths.map(_ => {
  const len = _.getTotalLength();
  _.style.strokeDasharray = len;
  return len;
})

const ogPathLens = [...pathLens];

pathLens.sort((a, b) => a - b);

const maxLen = pathLens[pathLens.length - 1];
const longestDuration = 1000;

durations = ogPathLens.map(_ => {
  const perc = _/maxLen;
  const randPerc = Math.random() * Math.min((1-perc)/(perc/1 * 10), perc/2);
  const percOfLongest = Math.min(perc + randPerc, 1);
  return (percOfLongest * longestDuration);
})

randDelays = durations.map(_ => Math.min(Math.floor(Math.random() * 200), 50));

setTimeout(async _ => {
	document.getElementById('calligraphy').classList.remove('hidden');

	await anime({
		targets: paths,
		direction: 'normal',
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutCubic',
		duration(el, i) {
			return durations[i];
		},
		delay(el, i) {
			return durations.slice(0, i).reduce((acc, i) => acc + i, 0) + randDelays.slice(0, i).reduce((acc, i) => acc + i, 0);
		}
	}).finished;

	document.getElementById('softGlow').classList.add('animate');
	document.getElementById('kanji').classList.add('glow');
}, startingSoonAnimationDuration * 1000);*/