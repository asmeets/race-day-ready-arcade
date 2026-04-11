const TITLE_BACKGROUND_COLOR = 1
const RACE_BACKGROUND_COLOR = 7
const STARTING_SCORE = 0
const STARTING_LIVES = 3
const ROUND_LENGTH_SECONDS = 45

function showTitleScreen() {
	scene.setBackgroundColor(TITLE_BACKGROUND_COLOR)
	game.splash("Race Day Ready", "Press A to race")
	game.showLongText("Build fast. Tune smart.", DialogLayout.Bottom)
}

function setupHud() {
	info.setScore(STARTING_SCORE)
	info.setLife(STARTING_LIVES)
	info.startCountdown(ROUND_LENGTH_SECONDS)
}

function showRoundPrompt() {
	game.showLongText("Watch speed, handling, and efficiency.", DialogLayout.Bottom)
}

showTitleScreen()
scene.setBackgroundColor(RACE_BACKGROUND_COLOR)
setupHud()
showRoundPrompt()

