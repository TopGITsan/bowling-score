# BowlingScore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Bowling-Scoring Basics

Bowling-Scoring Basics One game of bowling consists of 10 frames, with a minimum score of zero and a maximum of 300. Each frame consists of two chances to knock down ten pins. Instead of “points” in football or “runs” in baseball, we use “pins” in bowling.

Strikes and Spares Knocking down all ten pins on your first ball is called a strike, denoted by an X on the score sheet. If it takes two shots to knock down all ten pins, it’s called a spare, denoted by a (/).

Open Frames If, after two shots, at least one pin is still standing, it’s called an open frame. Whereas open frames are taken at face value, strikes and spares can be worth more—but not less—than face value.

How to Score a Strike A strike is worth 10, plus the value of your next two rolls. At a minimum, your score for a frame in which you throw a strike will be 10 (10+0+0). At best, your next two shots will be strikes, and the frame will be worth 30 (10+10+10). Say you throw a strike in the first frame. Technically, you don’t have a score yet. You need to throw two more balls to figure out your total score for the frame. In the second frame, you throw a 6 on your first ball and a 2 on your second ball. Your score for the first frame will be 18 (10+6+2).

How to Score a Spare A spare is worth 10, plus the value of your next roll. Say you throw a spare in your first frame. Then, in your first ball of the second frame, you throw a 7. Your score for the first frame will be 17 (10+7). The maximum score for a frame in which you get a spare is 20 (a spare followed by a strike) and the minimum is 10 (a spare followed by a gutter ball).

How to Score an Open Frame If you don’t get a strike or a spare in a frame, your score is the total number of pins you knock down. If you knock down five pins on your first ball and two on your second, your score for that frame is 7.

Explanation from [Milford public library](https://milford.lib.de.us/2020/09/28/calculate-your-score-during-bowling/)

More info on [wikipedia](https://en.wikipedia.org/wiki/Ten-pin_bowling)
