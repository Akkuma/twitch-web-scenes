import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.1.0/lib/anime.es.js';

function strokeAnimationData() {
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

  const durations = ogPathLens.map(_ => {
    const perc = _/maxLen;
    const randPerc = Math.random() * Math.min((1-perc)/(perc/1 * 10), perc/2);
    const percOfLongest = Math.min(perc + randPerc, 1);
    return (percOfLongest * longestDuration);
  })

  const delays = durations.map(_ => Math.min(Math.floor(Math.random() * 200), 50));

  return { paths, durations, delays };
}

function showCalligraphy() {
	document.getElementById('calligraphy').classList.remove('hidden');
}

function animateCalligraphy({ paths, durations, delays }) {
  return anime({
		targets: paths,
		direction: 'normal',
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutCubic',
		duration(el, i) {
			return durations[i];
		},
		delay(el, i) {
			return durations.slice(0, i).reduce((acc, i) => acc + i, 0) + delays.slice(0, i).reduce((acc, i) => acc + i, 0);
		}
	});
}

function animateCalligraphyGlow() {
  requestAnimationFrame(_ => {
    document.getElementById('softGlow').classList.add('animate');
    document.getElementById('kanji').classList.add('glow');
  });
}

export default function() {
  const startingSoonAnimationDuration = getComputedStyle(document.documentElement).getPropertyValue('--starting_soon_animation_duration');
  const props = strokeAnimationData();

  setTimeout(async _ => {
    showCalligraphy();
    await animateCalligraphy(props).finished;
    animateCalligraphyGlow();
  }, startingSoonAnimationDuration * 1000);
}