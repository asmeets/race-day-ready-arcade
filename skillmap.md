# driven-by-stem
* name: Driven by STEM, enabled by Microsoft
* description: Join the Mercedes-AMG PETRONAS Formula 1 Team as an engineer for the day! Code your own F1 simulator, balance speed against efficiency, and test your decisions on the track. Explore real STEM careers while building systems that perform under pressure.
* primarycolor: #ffd84d
* secondarycolor: #000
* tertiarycolor: #EAF3F8
* highlightcolor: #42cdf4
* completednodecolor: #067d14
* allowcodecarryover: True
* backgroundurl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/background.gif
* bannerurl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/banner.png

## driven-by-stem
* name: Driven by STEM
* description: Move from the Garage to the track and all the way to the winner's circle through one guided path of tutorials, tests, and remix-ready decisions.
* layout: manual

### intro-to-makecode
* name: Intro to MakeCode
* type: tutorial
* description: Learn about MakeCode Arcade and block-based coding that you'll use to build your F1 simulator, and how to get around the editor.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-intro-to-makecode.png
* position: 0 9
* tags: beginner, start-here, introduction, makecode, blocks
* next: garage-activity1
* url: https://github.com/asmeets/driven-by-stem/tutorials/in-the-classroom/activity1

### garage-activity1
* name: Mission Briefing
* type: tutorial
* description: Build your race car, wire up the controls, and choose how your shakedown dashboard reads speed and fuel.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-mission-briefing.png
* position: 0 5
* tags: beginner, kick-off, mission, controls, points
* next: garage-activity2
* url: https://github.com/asmeets/driven-by-stem/tutorials/the-garage/activity1

### garage-activity2
* name: Setup and Tradeoffs
* type: tutorial
* description: Choose your speed setting and discover the tradeoff: higher speed costs more energy.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-setup-tradeoffs.png
* position: 1 5
* tags: beginner, car-setup, choices, tune, strategy
* next: garage-activity3
* url: https://github.com/asmeets/driven-by-stem/tutorials/the-garage/activity2

### garage-activity3
* name: Garage Shakedown
* type: tutorial
* description: Launch the shakedown test track, read fuel, time, and speed, and compare what your setup really does.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-garage-shakedown.png
* position: 3 6
* tags: beginner, test-run, compare, feedback, improve
* next: road-activity1
* url: https://github.com/asmeets/driven-by-stem/tutorials/the-garage/activity3

### road-activity1
* name: Hit the Track
* type: tutorial
* description: Drive a full track session, dodge obstacles, collect boosts, and let the data show how your setup performs.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-hit-the-track.png
* position: 5 7
* tags: beginner, drive, dodge, movement, points
* next: road-activity2
* url: https://github.com/asmeets/driven-by-stem/tutorials/on-the-road/activity1

### road-activity2
* name: Pit Stop Briefings
* type: tutorial
* description: Build a pit stop system that lets you recover energy mid-run and discover how strategy changes results.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-pit-stop-briefings.png
* position: 7 6
* tags: level-up, pit-stop, team-roles, upgrades, strategy
* next: road-activity3
* url: https://github.com/asmeets/driven-by-stem/tutorials/on-the-road/activity2

### road-activity3
* name: Changing Conditions
* type: tutorial
* description: Code a weather shift that changes grip mid-run and rewards drivers who adapt quickly.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-changing-conditions.png
* position: 8 5
* tags: level-up, weather, grip, adapt, track
* next: finish-activity1
* url: https://github.com/asmeets/driven-by-stem/tutorials/on-the-road/activity3

### finish-activity1
* name: Final Challenge
* type: tutorial
* description: Run all your systems together in one integrated challenge where every choice matters.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-final-challenge.png
* position: 8 7
* tags: level-up, final-challenge, best-score, strategy, improve
* next: finish-activity2
* url: https://github.com/asmeets/driven-by-stem/tutorials/the-finish-line/activity1

### finish-activity2
* name: Reflect and Review
* type: tutorial
* description: Turn your saved data into a readable summary and find out what to improve next time.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-reflect-review.png
* position: 9 7
* tags: wrap-up, results, review, compare, next-steps
* next: finish-activity3
* url: https://github.com/asmeets/driven-by-stem/tutorials/the-finish-line/activity2

### finish-activity3
* name: Winners Circle
* type: tutorial
* description: Celebrate your results, explore career connections, and discover where these skills can take you next.
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/skillmap/node-winners-circle.png
* position: 10 7
* tags: celebrate, careers, stem, remix, reflection
* url: https://github.com/asmeets/driven-by-stem/tutorials/the-finish-line/activity3
* next: race-day-finish

### race-day-finish
* name: Stand on the Podium!
* kind: completion
* type: certificate
* url: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/certificates/driven-by-stem.pdf
* imageUrl: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/certificates/driven-by-stem.png
* position: 12 6
* rewards:
    * certificate:
        * url: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/certificates/driven-by-stem.pdf
        * preview: PNG
    * completion-badge:
        * image: https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/badges/badge-driven-by-stem.png
        * name: Driven by STEM