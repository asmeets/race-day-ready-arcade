# Intro to MakeCode Arcade
### @explicitHints true

```template
// Pre-load all assets so they appear in the gallery
let __sprites = [assets.image`playerCar`, assets.image`garageCone`, assets.image`trackObstacle`, assets.image`pitMarker`, assets.image`rainPuddle`, assets.image`telemetryScreen`, assets.image`finishBanner`, assets.image`teamBadge`]
let __backgrounds = [assets.image`garageBg`, assets.image`trackBg`, assets.image`finishBg`, assets.image`weatherBg`]
game.splash("Ready to learn MakeCode Arcade!")
```

## Welcome! Let's Learn the Essentials @showdialog

![Drew - UX/Game Designer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/drew.png)

Hi, I'm Drew, UX and game designer on the team. I got into this field by being the person who always asked "Wait... what am I supposed to do?" I started self-taught, watching tutorials and redesigning menus in my own projects, then added a formal design class and a lot of play testing with friends. 

Before you join Sam in the garage to build your racing simulator, you need to learn the essentials of MakeCode Arcade: following instructions, finding blocks, building code, and testing your work. These are the same skills I use when I test game flow, write clearer prompts, and figure out where players get stuck.

- **Why blocks?** Block-based coding lets you drag and snap together visual pieces instead of typing syntax. It's how I learned — you focus on logic and problem-solving first, then typing comes naturally later. Many professional developers still use visual tools for prototyping because they're fast and clear.

- **Why 8-bit style?** Arcade uses classic pixel art and simple mechanics so you can build complete games quickly. The constraints teach you to solve problems creatively — the same way Formula 1 engineers work within strict regulations to build the fastest cars. Simple foundations, powerful results.

You've already started by reading these instructions — that's the most important step! Let's get you ready to join the team.

## {1. Reading Tutorial Instructions}

**Your First Essential Skill**

---

I'll be guiding you through each step. Reading instructions carefully is actually something I do every single day — if you can't follow instructions, you can't write them either. Game designers and UX designers create the onboarding flows, tutorials, and tooltips that other people have to use. Being good at reading instructions makes you better at writing ones that actually make sense. That is a real career skill.

- :lightbulb: Sometimes you'll need to scroll to read all of the instructions.

- :arrow right: When you're ready to move to the next step, select **Next** to continue.

## {2. Finding Hidden Hints}

**Discovering Tutorial Features**

---

I like to hide extra info in "clue boxes" to keep the main instructions focused. These collapsible hints give you troubleshooting tips, definitions, and extra guidance — the same kind of notes I write when we're playtesting and figuring out where someone got stuck.

- :mouse pointer: Select the clue box below to reveal what's inside.

~hint Select here to reveal a clue 🕵🏽

---

**Congrats!**

You found a clue!

hint~


Sometimes, I like to show you recommended blocks for a step.

- :mouse pointer: Select the round lightbulb button below to reveal an example.




#### ~ tutorialhint
```blocks
game.splash("You found me!")
```



## {3. Using the Workspace}

**Building Your First Code**

---

Your [__*workspace*__](#workIt "The area where you build code") is where you'll connect code blocks to build your program. I spend a lot of my day in a workspace like this, building and testing interactions so the next step feels clear. Only blocks connected in the workspace will run when your game starts.

- :mouse pointer: Select inside the ``||game(noclick):splash " "||`` block that's already in the workspace and **change the message** to something you'd like to say.

~hint What's a workspace? 🕵🏽

---

![The Workspace](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/intro/workspace.png " " )

The **workspace** is the area to the right of the toolbox where you build your program.

Only blocks connected in the workspace will be run by the computer.

hint~


#### ~ tutorialhint
```blocks
game.splash("Let's start coding!")
```


## Meet the Blocks  @showdialog

Blocks can be dragged out from the  [__*toolbox*__](#tools "The strip to the left of your workspace that lists block categories."), connected, duplicated, and deleted.

Keep going to learn more about blocks.

![Block Animation](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/intro/use_blocks.gif "Blocks appear, duplicate, and delete." )



## {4. Finding Blocks in the Toolbox}

**Navigating Your Block Categories**

---

Blocks don't always start in the workspace. The toolbox is your component library — it organizes every building block by category, the same way a designer organizes a UI kit. You can't design a great experience with tools you don't know exist. When I join a new platform or engine, the first thing I do is explore what's in the toolbox. That habit is how UX and game designers get fast on new tools quickly — and it's how you will too.

When you need to add a block, I'll either suggest it using an image like this:
```block
game.splash(" ")
```
or with highlighted text, like this:
 ``||game:splash " "||``



~hint Want to discover something cool? 🕵🏽

---

When you need to find a block in the toolbox and we use highlighted text in the instruction, you can select the colored section of text and it will automatically open the toolbox category you need.

Try it now by selecting the block below!<br/>

``||game:splash " "||``

hint~



## {5. Setting the Scene}

**Creating Your Game Environment**

---

Let's see how this works. Every game needs a visual environment, and setting the background color is often the first step. When I'm building a dashboard or simulator, I start with the basics like this. Simple choices like color set the mood and make your work instantly recognizable.

- :tree: Find the ``||scene:set background color to [ ]||`` block and snap it in **at the top of**
the ``||loops(noclick):on start||`` container already in the workspace.

- :paint brush:  Select the empty square to set the background to your favorite color.

#### ~ tutorialhint
```blocks
scene.setBackgroundColor(7)
game.splash("Let's start coding!")
```

```ghost
scene.setBackgroundColor(7)
```



## {6. Creating Your First Sprite}

**Adding a Character to Your Game**

---

If you can't find the block you need, select the highlighted text and the correct category will open for you. Now let's add a character! In game development, any character or moving object is called a sprite. When I prototype a game, I use objects with properties like position, speed, and state to test how the experience feels. Sprites work the same way, and they're the foundation of almost every game you'll build.

- :paper plane: Snap ``||variables(sprites):set [my sprite] to sprite [ ] of kind [Player]||`` into **the end** of the ``||loops(noclick):on start||`` container.


- :paint brush:  Select the empty box to draw a [__*sprite*__](#sprote "A 2-D image that moves on the screen")
 or switch to the **Gallery** to pick one of ours.


 ~hint What's a sprite? 🕵🏽

---

In Arcade, each character or image that does something is called a **SPRITE**.

Sprites have properties that you can use and change — things like scale, position, and lifespan are all properties of sprites.

hint~


#### ~ tutorialhint

```blocks
scene.setBackgroundColor(5)
game.splash("Let's start coding!")
let mySprite = sprites.create(img`
. . . . . f f f f f . . . . . .
. . . . f e e e e e f . . . . .
. . . f d d d d d d e f . . . .
. . f d f f d d f f d f f . . .
. c d d d e e d d d d e d f . .
. c d c d d d d c d d e f f . .
. c d d c c c c d d d e f f f f
. . c d d d d d d d e f f b d f
. . . c d d d d e e f f f d d f
. . . . f f f e e f e e e f f f
. . . . f e e e e e e e f f f .
. . . f e e e e e e f f f e f .
. . f f e e e e f f f f f e f .
. f b d f e e f b b f f f e f .
. f d d f f f f d d b f f f f .
. f f f f f f f f f f f f f . .
`, SpriteKind.Player)


```

```ghost
let mySprite = sprites.create(assets.image`playerCar`, SpriteKind.Player)
```




## {7. Testing in the Simulator}

**Seeing Your Code in Action**

---

Make sure to keep checking your [__*simulator*__](#gamez "simulator that shows the result of the code you have written") as you go. As a game designer I call this **playtesting**, and it is not optional — it is the job. The moment you stop checking the simulator, small bugs quietly pile into confusing ones. I run the game after every change, even tiny ones. That habit is exactly what game designers, software engineers, and QA testers use to catch problems before players ever see them.

- :binoculars: Check the simulator. <br/>
Is there a message that needs to be cleared? Then check if the sprite you chose is present.


![Find the simulator in the lower right](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/intro/game-window.png "Select the mini simulator to open the bigger view.")






## Container Blocks  @showdialog

This is a [__*container block*__](#blockIt "Block that holds other blocks").


Container blocks have a flat edge at the the top and bottom with an open space
in the middle where other blocks connect. Container blocks control when the code inside runs.

Here is an example:

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {})
```

_(This block runs code when the A button is pressed.)_





## {8. Adding Player Controls}

**Responding to Button Presses**

---

**A button press that produces nothing is the number one friction point in any interactive system.** Container blocks like this one run code when specific events happen — a button pressed, a timer fires, a sprite collides. From a design perspective, this is how you build the feedback loop: something happens, the game responds. Event-driven programming is the foundation of every app, dashboard, and game that actually feels alive. When I playtest, the first question I ask every time is: "did something happen when I pressed that?"

- :game pad: Find the ``||controller:on [A] button pressed||`` container and drag it into **an empty area of** the workspace.



#### ~ tutorialhint

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
})
```

```ghost
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {})
```



## Standard Blocks  @showdialog

Next, there are [__*standard blocks*__](#sBlockIt "Single line blocks that make up the majority of most programs").

Standard blocks are single-line blocks with notches at the top and bottom that
allow them to attach to other pieces. These blocks run in order from top
to bottom in the container where they're placed.

Here is an example of a standard block:

```block
let mySprite: Sprite = null;
mySprite.startEffect(effects.spray)
```

_(This block sends water spraying from the center of your sprite.)_




## {9. Adding Visual Effects}

**Making Your Game More Engaging**

---

**Effects are communication, not decoration.** When a player presses a button and something bursts on screen, they instantly know: that action worked. That moment — you acted, the game responded — is called the **feedback loop**, and it is the most important concept in interactive design. I study these moments every time I playtest: does the effect feel satisfying? Does it make sense? Is it too distracting? Every visual choice you make is a design decision. Designing clear, readable feedback is a skill used in game development, app UX, product design, and any career that involves building things people interact with.

- :paper plane: Find a ``||sprites:[mySprite] start [spray] effect ⊕||`` block and snap it into the ``||controller(noclick):on [A] button pressed||`` container that's already in your workspace...then choose a new effect!

- :mouse pointer: Select the **+** to the right of the new block to reveal an extra option.



#### ~ tutorialhint
```blocks
let mySprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.startEffect(effects.confetti, 500)
})
```
```ghost
let mySprite: Sprite = null
mySprite.startEffect(effects.confetti, 500)
```


## Value Blocks  @showdialog

Finally, we have [__*value blocks*__](#aBlockIt "special pieces that provide values for other blocks").
Value blocks are special pieces that add information to other
blocks. Sometimes they're pointy, sometimes they're rounded,
but they always need another block to snap into. Value blocks look something like this:

![Value Blocks](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/intro/parameter-blocks.png "This is what the shape of an value block looks like" )

_💡 Value blocks have different shapes
depending on what kind of information they add. Each value will only
fit in certain types of spaces._




## {10. Adding Randomness}

**Making Your Game More Dynamic**

---

Randomness makes games unpredictable and replayable — two things every game designer wants. When I'm running a playtest, one thing I watch for is whether players get bored because the outcome is always the same. A random range means each button press feels slightly different, which keeps the interaction alive. It is also a sustainable design principle: a mechanic that stays interesting over many sessions means you don't have to constantly add new content just to hold attention.

- :calculator: From the ``||math:Math||`` category, grab a ``||math: pick random [0] to [10]||`` value block and snap it in to replace **500**.

- :mouse pointer: Update the random range to pick between **100** and **600**.



#### ~ tutorialhint
```blocks
let mySprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.startEffect(effects.confetti, randint(100, 600))
})
```

```ghost
let mySprite: Sprite = null
mySprite.startEffect(effects.confetti, randint(100, 600))
```






## {11. Testing Your Interactive Game}

**Playing What You Built**

---

**Time to test!** This is how I work every day — build something, then immediately check whether it behaves the way I intended. Right now you are both the designer and the player, which is actually the best position for catching bugs. When I playtest my own work, I try to forget I built it and experience it the way a stranger would. If something feels wrong, unexpected, or confusing, write it down. That observation is the designer's eye at work, and noticing it is more than half of what the job actually is.

- :binoculars: Check the simulator and press the **Ⓐ** button (or space bar) to clear your splash screen message.

- :game pad: Now press **Ⓐ** over and over again to activate your effects!

## {Finale @unplugged}

**Congratulations!**

You've completed the Intro to MakeCode Arcade tutorial!

You now know how to:
- ✅ Follow tutorial instructions
- ✅ Find blocks in the toolbox
- ✅ Build code in the workspace
- ✅ Test your work in the simulator

**Ready for the next challenge?**

Now you're ready to head into the **Garage** and meet **Sam**, the software engineer on the team. You'll build your own racing simulator, make real engineering decisions about speed and efficiency, and test your code on the track. Sam will guide you through that next stage.

One last thing from me before you go: the skills you just practiced — reading instructions, exploring tools, testing your work, building feedback loops — connect directly to careers in game design, UX research, software development, educational technology, and product design. Any field where people interact with computers needs someone who asks "does this make sense?" That person is often a designer. **Let's go!** 🏎️

```ghost
let mySprite: Sprite = null;
scene.setBackgroundColor(9)
scene.setBackgroundImage()
mySprite.startEffect(effects.spray)
mySprite.startEffect(effects.confetti)
mySprite.x += 0
mySprite.y += 0
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {})
controller.moveSprite(mySprite)
game.splash("")
randint(0, 10)
```