//% block="Reaction Time Game" color=#FF7F00
namespace reactionTimeGame {
    /**
     * Causes the move forward after a specified amount of time
     * @param sprite the active sprite
     * @param delay the length of time to wait before moving the sprite
     */
    //% blockId=rtg_update_display
    //% block="Move sprite %sprite|after %delay (ms) delay"
    //% delay.shadow=timePicker
    export function updateDisplay(sprite: game.LedSprite, delay: number = 200): void {
        if (!sprite) return

        sprite.move(1)
        sprite.ifOnEdgeBounce()
        basic.pause(delay)
    }
    /**
     * Increment the score or end the game based on sprite position
     * @param sprite the active sprite
     */
    //% blockId=rtg_increment_or_end
    //% block="Check sprite %sprite location"
    export function incrementOrEnd(sprite: game.LedSprite): void {
        if (!sprite) return

        if (sprite.get(LedSpriteProperty.X) == 2) {
            game.addScore(1)
        } else {
            game.gameOver()
        }
    }
}