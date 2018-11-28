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

1. Visit [https://makecode.microbit.org/][2]
2. Click the big, purple "New Project" button under "My Projects"

# Interface Overview

Once the interface loads you'll be presented with a graphical editor. On the left is an emulator which replicates the device's face including the LED array, pins, and programmable buttons.

Next to that is the toolbox. This is where you select the blocks which you'll combine like LEGO to create your program.

The blocks are divided into categories such as:

* Basic - lets us easily drive the LED array or add delays
* Loops - gives us a way to do tasks repeatedly
* Logic - helps us make decisions in our code
* Variables - defines placeholders for various pieces of information about our program

Under the Advanced heading are even more groups which allow us to perform more complex actions. We'll be coming back to the Game group throughout this project.

Finally, on the right is the canvas. In this mode we drag blocks from the toolbox to the canvas and stack them up. You should already see blocks for `on start` and `forever`. These are common to most micro:bit programs so they're added by default.

Removing code is simply a matter of dragging blocks from the canvas back to the toolbox. You may also delete blocks from the context (right-click) menu.

As you might have guessed, what we put in the `on start` block will happen as soon as we start the program by clicking the "play" button under the emulator. (Yours may already be running so you'd see a stop button instead). Similarly, whatever we put in the forever block will run as long as the micro:bit program is running. This is really a special case of an infinite loop which, in this context, we'll call the *game loop*.

The remaining items in the editor let us download our code to a micro:bit device (Sorry, I don't have enough for this group so we're sticking with the emulator.), undo or redo code changes, or change the canvas zoom level. We can also toggle between `blocks` and `JavaScript` here but we'll discuss that piece later.

# Initializing the Program

Virtually every program you'll encounter be it this game, your word processor, or your company's product requires some degree of initialization. *[Thinking back to the example, what do you suspect we need to do to initialize our game?]*

If you recall the earlier demo of the finished game, we saw that there's a single light that bounces back and forth across the LED array. What we need to do first is give the program a way to track which light is on. We do that by defining a variable and setting that variable to something. Let's do that now.

1. Click the `Variables` toolbox item, then click the `Make a Variable` button.
2. Enter the name `sprite` in the dialog box.
3. Click "OK" or press enter/return

This adds a few blocks to the Variables section. First is a box with rounded corners that simply says `sprite` and has a dropdown arrow. Next are two interlocking rectangles that allow us to either set `sprite` to a specific value or change it by some value.

Note the difference in the shapes. The rounded box indicates a value whereas the interlocking rectangles denote an action. This is a very important distinction in how these blocks are used.

Moving on, drag the `set sprite to ...` box into the `on start` container on the canvas. (Don't worry if the toolbox is covering that container, it'll disappear when you start dragging the box.)

Now we've told the program that we want to set `sprite` to something but the value `0` doesn't seem particularly useful. Let's choose another value. [Any guesses what we should set it to?]

micro:bit gives us a really convenient way to turn on a single LED. Not coincidentally micro:bit refers to this as a *Sprite* and we can find options for controlling *Sprite*s in the `Game` section under `Advanced`.

After you click on the `Game` section pay attention to the block shapes and think about how they relate to the blocks already on the canvas. The same rules as before apply here: rounded rectangles are values while interlocking rectangles are actions. Interestingly there's one block that sounds like an action but is depicted as a value: `create sprite at...`.

This block is particularly useful for initializing a variable! Let's drag it into the rounded slot on the `set sprite...` block. When it snaps in place you should see `set sprite to create sprite at x: 2 y: 2`. This statement does several things:

1. Initializes a `Sprite`
2. Turns on the LED at 2, 2
3. Assigns the `Sprite` to the `sprite` variable

*[Note the case differences between `Sprite` and `sprite`]*

Your program may already be running but if not, click the play button under the emulator. You should now see the middle LED light up!

# Making the LED bounce

Now that we have the `Sprite` initialized we can make it bounce back and forth across the screen. Because this is something that should happen throughout the lifetime of the game so the next blocks we add will go into the existing `forever` block. Let's do it the hard way first.

That we're going to be making the light bounce gives us a hint that we need to do things that affect the `sprite` variable. Let's increment the `x` value so it can change which LED is active.

In the Game group find the block labelled `sprite move by 1` and drag it into the `forever` block then run your program. You should see the light move to the right edge then stop but we want it to go back and forth. What we need now is a way to make the light go the other direction.

Again, we'll do this the hard way to start. Let's add an `if true then` block from the Logic group into the `forever` block, after the `sprite change...` block. This is an example of a decision statement.

The blocks within will execute only if and only if some condition evaluates to `true`. As it stands now the inner code will *always* execute because the condition is `true`. We want to have something happen only if the LED on the edge is on so let's drag in an expression from the Game category to test for this condition. The obvious candidate here is the `sprite touching edge` block. We'll drag that to replace the `true` block that's currently in place.

We're now detecting whether `sprite` is touching the edge but so we now need to tell the `sprite` to turn around. `Sprites` operate as if they're facing in a particular direction so to change which way the `Sprite` moves we need to tell it to turn by dragging the `sprite turn right by...` block also from the Game category into the `if/then` block.

Now run the program again and observe the behavior. It should look like it's moving in a circle! That's not what we want! *[How should we go about fixing the problem?]*

Notice how the `sprite turn...` block shows `45 degees` as a white rounded rectangle. This indicates that we can change the value to something else and is a fantastic example of parameterization. Turning a `Sprite` is a common task but rather than having specific blocks for each way we might want to turn it, micro:bit standardized the common parts into a function and lets us inject a value indicating how much to turn. For our purposes we need to change the parameter from `45 degrees` to `180 degrees` such that it basically just turns around. Better?

Now the light is bouncing properly but our player is going to need some really good reflexes to ever score a point by clicking when the light is in the middle! This wouldn't be a particularly good user experience so we should probably slow down the motion a bit.

We can do that by introducing a pause at the end of the loop. Let's drag a `pause` block from the Basic category into the `forever` block. By default this will add a delay of `100 milliseconds` to the loop which is probably still too fast. Go ahead and select another value from the list and see what you like best. I think `200 milliseconds` is a good amount.

# Refactoring

Remember from earlier I said that we were going to start by doing something the hard way. Ok, so it really wasn't that hard but we added the `if/then` block to illustrate a point that there are often times when we solve a problem and realize that we need to do the same thing in another place. Rather than writing the same code again we standardize it into a function. Doing so helps make our code less complex and restructuring it generally makes the code easier to read. This process belongs to a category of tasks collectively known as *"refactoring"*.

Our `if/then` is one such place. The micro:bit designers realized that people would often want to detect if a `Sprite` was on the edge and turn around so they provided that functionality for us in the form of another block. Let's refactor our code to use the provided block and simplify our code.

We'll begin by right-clicking on the `if/then` block and selecting the `Delete Blocks` option. This will leave us with only the `sprite move...` and `pause...` blocks within the `forever` block.

Now we'll return to the Game category and drag the `sprite if on edge, bounce` block to where the deleted blocks used to be.

When we run our refactored code we should observe that the program behaves exactly the same as it did before but with less code. Less code means less for us to maintain. It also makes the system less fragile.

This particular program is simple but refactoring is a common activity for programmers and is something we should all be comfortable doing.

# Keeping Score

Our program is off to a good start. We have it:

* initializing a `Sprite` in the middle of the grid
* Assigning that `Sprite` to a variable called `sprite`
* Bouncing the `Sprite` back and forth across the grid

What we're not yet doing is keeping score or ending the game by capturing when the user presses the button! Our example game used the `A` button so we'll do that here, too.

One way we could accomplish this is to add an `if/then` block into the `forever` loop and set the condition to `button A is pressed` but that would unnecessarily restrict when we respond to the button press; we'd be entirely dependent upon what part of the loop code was running when the button is pressed.

Instead, we'll drag the `on button A pressed` block from the Input group. This is like the `if/then` block except that instead of being inside of the for loop, it registers an *event handler* that runs independently of the main loop. This means that we're not dependent upon what part of the loop is executing when the button is pressed.

With the event handler wired up we now need to say what to do when that button is pressed. If you again recall from the example we do either of two things:

1. Increment the score when the middle LED is lit
2. End the game

*[How do you suppose we can do one thing if a condition is met or another if it isn't?]*

Let's turn our attention back to the Logic group. In there is a variant of the `if/then` block we used earlier called `if/then/else`. This block does exactly what it sounds like; when a condition is true the first part runs otherwise the other part runs. Go ahead and drag the block into our `on button A pressed` handler block.

Just as before, we need to specify what condition we're looking for. If the middle LED is on we want to increment the score so we'll express that in code with a comparison expression which we can find in the Logic group.

Drag the `0 = 0` block into the `if/then/else` expression slot. This block has slots for two values. One of them should be set to `2` which indicates the middle just like we said in the initialization. *[What should the other value be?]*

For the other value we need to find the `sprite`'s `x` (horizontal) value so we can compare it to the other value in the expression block. Drag the `sprite x` value block from the Game group into the other value slot. Your expression should now read `if sprite x = 2`.

This means that when the `sprite`'s `x` value is equal to `2` one thing (not yet defined) will happen otherwise something else will happen.

As we've already said, when the condition is met we want to increment the score otherwise we'll end the game. Let's go ahead and drag the `change score by 1` and `game over` blocks from the Game group into the corresponding spots.

# Testing our Program

All of the code for our game is now in place so when we run it we should see our game behave just like the example! Try it!

If everything is correct the light should bounce back and forth across the screen and if we press `A` (on the emulator) when the middle LED is on the lights should display a pattern. Otherwise we'll see a different pattern followed by a game over message and our score.

Some interesting things to note here are that we can restart the game by pressing `A` and `B` at the same time. (A "fake" button will appear in the emulator on game over.) Starting a new game also resets the score. *[How does it reset if we didn't initialize it?]*

The reason we get a new score without explicitly initializing it in `on start` is that the micro:bit's Game functionality handles that for us! We could track it separately but there's no need. Managing it ourselves would unnecessarily add complexity and result in additional work.

# Below the Surface

Remember earlier on when I said we'd come back to the JavaScript tab at the top of the window? Now it's time to click it.

All of the blocks we've dragged to the canvas are merely graphical representations of text-based code! In this case our blocks are building JavaScript. (Kind of - there are differences in here from "real" JavaScript, it's actually another language, TypeScript, which is a superset of JavaScript.)

Let's look at the lines of code shown in the editor and see how they related back to the blocks.

Line 1 tells the program to create a variable named `sprite` of type `game.LedSprite` and initializes it to `null`. This makes the name `sprite` available for use later in the program.

Lines 2 - 8 wire up the `onButtonPressed` event handler. `onButtonPressed` is a function on the micro:bit `input` object which accepts two parameters - the first indicating which button to respond to, and the second being a function for what to do when that button is pressed. The inner code should look very familiar since it reads almost identical to the blocks we dropped on the canvas.

Line 9 is responsible for initializing the `Sprite` object by creating it at location `2, 2` and assigning it to the `sprite` variable declared on line 1.

Finally we see the `forever` loop on lines 10 - 14. This should also look very familiar since it's responsible for moving the sprite, bouncing, and pausing.

# Customizing the JavaScript

Most programmers work this way - with text-based languages in specialized text editors such as Visual Studio, Visual Studio Code, Sublime, or a plethora of others. We learn the data structures and behaviors provided by the libraries we use and connect them by hand. Trust me, typing `if (sprite.get(LedSpriteProperty.X) == 2)...` is far preferrable to digging through menus to drag and drop blocks onto a canvas. Block-languages are a great way to learn, though!

One of the great things about micro:bits is how they let us transition from block-based programming to text-based programming. We've just seen how our blocks are represented in TypeScript, err... JavaScript but we can do more than that by editing the code. For micro:bit we can even define our own blocks! Let's do another refactoring of our code and move some of the logic to custom blocks but by actually writing the code to do it!

When we changed over to JavaScript view you may have noticed a button labeled "Explorer" appear under the emulator. Clicking this button expands a menu which shows the files required for our program to work.

Currently all of our code (the code we've "written") is stored in the file named `main.ts`. To prevent the block editor from treating our custom code as JavaScript blocks (and making the canvas really ugly) we'll work in a separate file.

To create the new file click the `+` button on the `Explorer` line. This will first tell you that a file named `custom.ts` is going to be added to the project. Go ahead and confirm the action and observe the new file now exists. micro:bit uses this name internally so it can't be changed nor can we add other files. *[Feel free to browse some of the other files to get a feel for the program structure]*

The `custom.ts` file that was added already contains some custom code from a template. This shows some samples for defining your own blocks but they're not really all that useful to us so we can simply clear out the contents of the file.

Now we're ready to add some custom code! Rather than making you type it all go ahead and copy the contents of [custom.ts][1] and paste it into the file in the browser. Note that while this code is very similar to what we've already seen it has been modified to behave better as custom micro:bit code.

Without going into too much detail over the code, it defines a namespace (*custom group*) that *exports* (*makes available*) two custom functions. The first function, `bounceSprite` encapsulates the logic for the bouncing LED and delay. The second function, `incrementOrEnd` handles the decision for what to do when `A` is pressed. All of the other (green) text are metadata and micro:bit directives that control how the items are displayed in the block editor.

Pay attention to how we've named these functions. Both names describe what the functions do. Choosing names for code elements is often difficult and stressful for inexperienced programmers. Naming things to describe what they do makes the program significantly easier to understand and maintain. As a general rule, if you can't think of a good name for something it's probably doing to much. Split it up and name the parts.

# Using the Custom Code

We pasted in the custom code but haven't yet updated our original code. We now need to go back and update that to use the new blocks. Click back to the blocks tab. This should take you back to the block editor, and, if all is correct you should now see an orange group named "Reaction Time Game" at the bottom of the toolbox. Click on that and you should see our two custom functions listed with descriptive text! (The editor sometimes has trouble picking up changes to custom code go ahead and refresh the page if you don't see the group right away.)

To use the blocks we need to clear out what's currently in the `forever` and `on button A...` blocks. We can then drag the custom `Move sprite...` and `Check sprite...` blocks into their respective container blocks. The program won't work until you tell the new block which `Sprite` to manage so drag the `sprite` block from the Variables group to both blocks as well.

Finally, run (or restart) the program and see how it still behaves exactly as before! Compare the code as it is now to what we've been working with. Notice how by dividing the problem into smaller chunks we were able to isolate individual pieces into custom functions named for what they do. With that in place, our block code is now more descriptive and better communicates what it does.

# Wrapping Up

This project was created to introduce you to many common programming concepts. Although we've hardly scratched the surface of programming we've still managed to build a simple reaction time game. Through this process you learned about variables, loops, program logic, event handling, functions, and even did some refactoring!

I hope that you had fun working through this exercise and that it helped develop a foundational understanding of and appreciation for the complexity often involved in developing software solutions.

# Next Steps

If you had fun with this and would like to continue with the project here are a few ideas to challenge yourself:

* Change the speed at which the sprite moves
* Make the sprite move to random positions
* Multiplayer (hint: Use the radio features)

Good luck!

[1]: custom.ts
[2]: https://makecode.microbit.org/
