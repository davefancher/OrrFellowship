# Introduction

Today's project is to build a simple reaction time game using the micro:bit emulator. Through this project we'll introduce several important software development concepts including:

* Variables
* Events
* Looping Constructs
* Branching
* Functions

# Example Project Demo

# Introducing micro:bit

micro:bit is an integrated microcontroller created as a partnership between Microsoft and the BBC. It's used primarily by schools in the UK to teach programming starting with a block interface and allowing students to grow into text-based languages such as JavaScript or Python as their skills and confidence improve. I also have several devices available to the students who attend the Coder Dojo in Fishers.

The device itself runs about $16 at Fry's which is amazing considering how much it can do. For instance, this tiny device has an accelerometer, a compass, multiple output pins, several programmable buttons, and even a bluetooth radio!

# Getting Started

Getting started is easy:

1. Visit https://makecode.microbit.org/
2. Click the big, purple "New Project" button under "My Projects"

# Interface Overview

Once the interface loads you'll be presented with a graphical editor. On the left is an emulator which replicates the device's face including the LED array, pins, and programmable buttons.

Next to that is the toolbox. This is where you select the blocks which you'll combine like LEGO to create your program.

The blocks are divided into categories such as:

* Basic - lets us easily drive the LED array or add delays
* Loops - gives us a way to do tasks repeatedly
* Logic - helps us make decisions in our code
* Variables - defines placeholders for various pieces of information about our program

Finally, on the right is the canvas. In this mode we drag blocks from the toolbox to the canvas and stack them up. You should already see blocks for `on start` and `forever`. These are common to most micro:bit programs so they're added by default.

As you might have guessed, what we put in the `on start` block will happen as soon as we start the program by clicking the "play" button under the emulator. (Yours may already be running so you'd see a stop button instead). Similarly, whatever we put in the forever block will run as long as the micro:bit program is running. This is really a special case of an infinite loop which, in this context, we call the *game loop*.

The remaining items in the editor let us download our code to a micro:bit device (Sorry, I don't have enough for this group so we're sticking with the emulator.), undo or redo code changes, or change the canvas zoom level. We can also toggle between `blocks` and `JavaScript` here but we'll discuss that piece a bit later.

# Initializing the Program

Virtually every program you'll encounter requires some degree of initialization and this reaction time game is no different. *[What do you suspect we need to do to initialize our game?]*

If you recall the earlier demo of the finished game, we saw that there's a single light that bounces back and forth across the LED array. What we need to do first is give the program a way to track which light is on. We do that by defining a variable and setting that variable to something. Let's do that now.

1. Click the `Variables` toolbox item, then click the `Make a Variable` button.
2. Enter the name `sprite` in the dialog box.

This adds a few blocks to the Variables section. First is a box with rounded corners that simply says `sprite` and has a dropdown arrow. Next are two interlocking rectangles that allow us to either set `sprite` to a specific value or change it by some value.

Note the difference in the shapes. The rounded box indicates a value whereas the interlocking rectangles denote an action. This is a very important distinction in how these blocks are used.

Moving on, drag the `set sprite to ...` box into the `on start` container on the canvas. (Don't worry if the toolbox is covering that container, it'll disappear when you start dragging the box.)

Now we've told the program that we want to set `sprite` to something but the value `0` doesn't seem particularly useful. Let's choose another value. [Any guesses what we should set it to?]

micro:bit gives us a really convenient way to turn on a single LED. Not coincidentally micro:bit refers to this as a *sprite* and we can find options for controlling *sprites* in the `Game` section under `Advanced`.

After you click on the `Game` section pay attention to the block shapes and think about how they relate to the blocks already on the canvas. The same rules a before apply here: rounded rectangles are values while interlocking rectangles are actions. Interestingly there's one block that sounds like an action but is depicted as a value: `create sprite at...`.

This block is particularly useful for initializing a variable! Let's drag it into the rounded slot on the `set sprite...` block. When it snaps in place you should see `set sprite to create sprite at x: 2 y: 2`. This statement does several things:

1. Initialize a `Sprite`
2. Turn on the LED at 2, 2
3. Assign the Sprite to the `sprite` variable

*[Note the case differences between `Sprite` and `sprite`]*

Your program may already be running but if not, click the play button under the emulator. You should now see the middle LED light up!

# Making the LED bounce

Now that we have the `Sprite` initialized we need to make it bounce back and forth across the screen. Let's do it the hard way first. This is something that should happen throughout the lifetime of the game so the next blocks we add will go into the  existing `forever` block.

Since we're going to be making the light bounce that gives us a hint that we need to do things that affect the `sprite` variable. Let's increment the `x` value so it can change which LED is active.

In the Game group find the block labelled `sprite move by 1` and drag it into the `forever` block then run your program. You should see the light move to the right edge and stop but we want it to go back and forth. What we need is a way to make the light go the other direction.

Again, we'll do this the hard way to start. Let's add an `if true then` block from the Logic group into the `forever` block, after the `sprite change...` block. This is an example of a decision statement. The blocks within will execute only if some condition evaluates to `true`. As it stands now the inner code will *always* execute because the condition is `true`. We want to have something happen only if the LED on the edge is on so let's drag in an expression from the Game category to test for this condition. The obvious candidate here is the `sprite touching edge` block. We'll drag that to replace the `true` block that's currently in place.

With that out of the way we now need to tell the `sprite` to turn around. `Sprites` operate as if they're facing in a particular direction so to change which way the `Sprite` moves we need to tell it to turn by dragging the `sprite turn right by...` block also from the Game category into the `if/then` block.

Now run the program again and observe the behavior. It should look like it's moving in a circle! That's not what we want. *[How would we go about fixing it?]*

Notice how the `sprite turn...` block shows `45 degees` as a white rounded rectangle. This indicates that we can change the value to something else and is a fantastic example of parameterization. Turning a `Sprite` is a common task but rather than having specific blocks for each way we might want to turn it, we standardize the common parts into a function and inject a value indicating how much. For our purposes we need to change the parameter from `45 degrees` to `180 degrees` such that it basically just turns around. Better?

Now the light is bouncing properly but our player is going to need some really good reflexes to ever score a point by clicking when the light is in the middle! This wouldn't be a particularly good user experience so we should probably slow down the motion a bit.

We can do that by introducing a pause at the end of the loop. Let's drag a `pause` block from the Basic category into the `forever` block. By default this will add a delay of `100 milliseconds` to the loop which is probably still too fast. Go ahead and select another value from the list and see what you like best. I think `200 milliseconds` is a good amount.

# Refactoring

Remember from earlier I said that we were going to start by doing something the hard way. It really wasn't that hard but we added the `if/then` block to illustrate a point that there are often times when we solve a problem and realize that we need to do the same thing in another place or our code gets complex and we restructure it to make it easier to read. This process is called *"refactoring"*.

Our `if/then` is one such place. The micro:bit designers realized that people would often want to detect if a `Sprite` was on the edge and turn around so they provided that functionality for us in the form of another block. Let's refactor our code to use the provided block and simplify our code.

We'll begin by right-clicking on the `if/then` block and selecting the `Delete Blocks` option. This will leave us with only the `sprite move...` and `pause...` blocks within the `forever` block.

Now we'll return to the Game category and drag the `sprite if on edge, bounce` block to where the deleted blocks used to be.

When we run our refactored code we should observe that the program behaves exactly the same as it did before but with less code. Our program is simple but refactoring is a common activity for programmers and is something we should all be comfortable doing.

# Keeping Score

Our program is off to a good start. We have it:

* initializing a `Sprite` in the middle of the grid
* Assigning that `Sprite` to a variable called `sprite`
* Bouncing the `Sprite` back and forth across the grid

What we're not yet doing is keeping score or ending the game by capturing when the user presses the button! Our example game used the `A` button so we'll do that here, too.

One way we could accomplish this is to add an `if/then` block into the `forever` loop and set the condition to `button A is pressed` but that would unnecessarily restrict when we respond to the button press; we'd be entirely dependent upon what part of the loop code was running when the button is pressed.

Instead, we drag the `on button A pressed` block from the Input group. This is like the `if/then` block except that instead of being inside of the for loop, it registers an *event handler* that runs independently of the main loop. This means that we're not dependent upon what part of the loop is executing when the button is pressed.

With the event handler wired up we now need to say what to do when that button is pressed. If you again recall from the example we do either of two things:

1. Increment the score when the middle LED is lit
2. End the game

