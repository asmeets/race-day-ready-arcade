# race-day-ready
* name: Race Day Ready
* description: You've been invited to join the Mercedes racing team to design, test, and race an F1 car in Miami. Your mission is to help prepare their vehicle for a high-stakes run on the test track. Along the way, you will balance performance, efficiency, and strategy while exploring real engineering careers. 
* primarycolor: #ffd84d
* secondarycolor: #b40707
* tertiarycolor: #EAF3F8
* highlightcolor: #42cdf4
* completednodecolor: #067d14
* allowcodecarryover: True
* backgroundurl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/background.gif
* bannerurl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/banner.png

## race-day-ready
* name: Race Day Ready
* description: Move from the Garage to the track and all the way to the winner's circle through one guided path of tutorials, tests, and remix-ready decisions.
* layout: manual

### garage-activity1
* name: Mission Briefing
* type: tutorial
* description: Join the junior innovation team, learn the mission, and get ready to make your first engineering decisions.
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/node-mission-briefing.png
* position: 0 9
* tags: beginner, start-here, mission, controls, points
* next: garage-activity2
* url: https://github.com/asmeets/race-day-ready-arcade/tutorials/the-garage/activity1.md

### garage-activity2
* name: Setup and Tradeoffs
* type: tutorial
* description: Tune your setup and make your first tradeoff across performance, efficiency, and strategy.
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/node-setup-tradeoffs.png
* position: 1 5
* tags: beginner, car-setup, choices, tune, strategy
* next: garage-activity3
* url: https://github.com/asmeets/race-day-ready-arcade/tutorials/the-garage/activity2.md

### garage-activity3
* name: Garage Shakedown
* type: tutorial
* description: Run a short shakedown test and see what your setup choices actually changed.
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/node-garage-shakedown.png
* position: 3 6
* tags: beginner, test-run, compare, feedback, improve
* next: road-activity1
* url: https://github.com/asmeets/race-day-ready-arcade/tutorials/the-garage/activity3.md

### road-activity1
* name: Hit the Track
* type: tutorial
* description: Take your car onto the track and feel how your setup behaves under live conditions.
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/node-hit-the-track.png
* position: 5 7
* tags: beginner, drive, dodge, movement, points
* next: road-activity2
* url: https://github.com/asmeets/race-day-ready-arcade/tutorials/on-the-road/activity1.md

### road-activity2
* name: Pit Stop Briefings
* type: tutorial
* description: Pause at pit stops to connect gameplay choices to real team roles, strategy, and upgrades.
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/node-pit-stop-briefings.png
* position: 7 6
* tags: level-up, pit-stop, team-roles, upgrades, strategy
* next: road-activity3
* url: https://github.com/asmeets/race-day-ready-arcade/tutorials/on-the-road/activity2.md

### road-activity3
* name: Changing Conditions
* type: tutorial
* description: Adapt to weather, grip, and changing conditions that force smarter decisions on the move.
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/node-changing-conditions.png
* position: 8 5
* tags: level-up, weather, grip, adapt, track
* next: finish-activity1
* url: https://github.com/asmeets/race-day-ready-arcade/tutorials/on-the-road/activity3.md

### finish-activity1
* name: Final Challenge
* type: tutorial
* description: Use everything you learned to earn the best combined result across performance, efficiency, and strategy.
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/node-final-challenge.png
* position: 8 7
* tags: level-up, final-challenge, best-score, strategy, improve
* next: finish-activity2
* url: https://github.com/asmeets/race-day-ready-arcade/tutorials/the-finish-line/activity1.md

### finish-activity2
* name: Reflect and Review
* type: tutorial
* description: Review your results, connect them to your choices, and decide what you would change next.
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/node-reflect-review.png
* position: 9 7
* tags: wrap-up, results, review, compare, next-steps
* next: finish-activity3
* url: https://github.com/asmeets/race-day-ready-arcade/tutorials/the-finish-line/activity2.md

### finish-activity3
* name: Winners Circle
* type: tutorial
* description: Celebrate what you learned and connect your choices to STEM, careers, and future remixing.
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/node-winners-circle.png
* position: 10 7
* tags: celebrate, careers, stem, remix, reflection
* url: https://github.com/asmeets/race-day-ready-arcade/tutorials/the-finish-line/activity3.md
* next: race-day-finish

### race-day-finish
* name: Stand on the Podium!
* kind: completion
* type: certificate
* url: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/certificates/race-day-ready.pdf
* imageUrl: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/certificates/race-day-ready.png
* position: 12 6
* rewards:
    * certificate:
        * url: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/certificates/race-day-ready.pdf
        * preview: PNG
    * completion-badge:
        * image: https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/badges/badge-race-day-ready.png
        * name: Race Day Ready