# Nathair (snake in Irish)
Javascript game for playing online with cloud score storage.

Published here: [Nathair](https://matt-oc.github.io/nathair/)


Although outside of the main remit of the project a node.js server was set up that exposes an api and Nathair makes full use of it, getting and posting high scores and names.
[Link to node repo ](https://github.com/matt-oc/node-storage-API)

## UX

### Project Goals

The goal of Nathair is to have a fun and engaging game that is suitable for all ages and has a re-playability factor. The game should be easy to understand and play but be satisfying at the same time and also sufficiently challenging

There are 2 main roles involved, the goals of the user using the site and the goals of the creator.

#### User Goals

* To have fun.
* To improve dexterity.
* To relax and de-stress.
* Play with friends and family.
* Attain a high score.

#### Designer Goals

* To provide a fun experience to all ages.
* Challenge people.
* Bring friends closer together.
* Be contactable in case of an issue.

#### User Stories

As a user of Nathair I want to:

* Easily find contact information.
* Start my game quickly.
* Clearly understand what the goal of the game is.
* Be able to view high scores.
* Be able to use WASD keys and arrow keys.
* Be able to easily navigate the site.
* Not be bugged by popups or ads.

### Design Choices

The decision was made to have the site as a single scrolling page with separate content areas and modals were heavily used to provide an "all in one" feeling. This gives the website a fuller look while also making it easy to navigate.

A leaderboard obtained from an api call is updated each time it is opened so it always has the freshest data.

A fully working contact form is also included allowing users to email directly. Feedback is provided to the user in the form of an alert so that they know if they were successful.

Feedback is also provided in the way of alerts, sounds or hover effects for various elements.
Sound is disabled by default and must be turned on manually.

The main layout is done with bootstrap and minimal css has been added to make the site truly custom.

Speed of the game can be changed using a slider to provide an easier or more challenging game.

Small touches like appropriate title and favicon add a more polished look.

For added ergonomic on-screen buttons appear to control the snake on devices with a touchscreen. These are opaque so as not to obscure the play area but provide and nice method of control on devices without a keyboard.

#### Wireframes
- Mobile wireframe - [View](/assets/readme-assets/mobile.png)

- Tablet wireframe - [View](/assets/readme-assets/ipad.png)

- Computer wireframe - [View](/assets/readme-assets/computer.png)

#### Screenshots
-   Browser Homepage - [View](/assets/readme-assets/home.png)

-   Contact form - [View](/assets/readme-assets/contact.png)

-   Game - [View](/assets/readme-assets/game.png)

-   Leaderboard - [View](/assets/readme-assets/leaderboard.png)

-   Mobile gameplay - [View](/assets/readme-assets/mobile-game.png)

-   Mobile homepage view - [View](/assets/readme-assets/mobile-home.png)


## Technologies Used

html
css
javascript
bootstrap
json
Node.js
git and github


## Testing
Testing was conducted manually using Chrome, Safari and Firefox to check compatibility at all screen sizes.
Tests were also performed using the responsive tools to check how the site responds at various breakpoints.

As the site was being built it was tested along the way to make sure new features were working as intended such as the contact form, contact form validation, the main gameplay and the modals.

The main difficulty was the fact the canvas size must be specified within the html for scaling to work properly. It was not possible to set the size using css so some javascript has to be used to handle page resizing.

The API initially was not working until the correct syntax was used setting the data type to JSON for the post req.

Lighthouse used to test page performance.

The results were excellent as can be seen here:
-   Lighthouse Desktop Results - [View](/assets/readme-assets/lighthouse-desktop.png)
-   Lighthouse Mobile Results - [View](/assets/readme-assets/lighthouse-mobile.png)


Css and Html validated using the check on W3. Results for html can be seen here: [Results](https://validator.w3.org/nu/?doc=https%3A%2F%2Fmatt-oc.github.io%2Fnathair%2F)

CSS results available here: [Results](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fmatt-oc.github.io%2Fnathair%2Fassets%2Fcss%2Fstyles.css&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)


### Further Testing

-   The website was viewed on a variety of devices such as Desktop, Laptop, iPhone7, iPhone 8 & Android.
-   Friends and family members were asked to review the site and documentation to point out any bugs and/or user experience issues.
-   The site was used as all users and from all perspectives to ensure good performance and no bugs.


In addition there were minor layout bugs found when testing for mobile view sizes, these were fixed during development.

It was found that initially the snake was able to turn back on itself which removed from the overall user experience of the game. This was improved by only allowing a turn once the snake had moved enough to not overlap.

There was a bug discovered that when quitting a game your score was submitted but once the timer (that was still running in the background) ran out the score and alert box would be shown again. This was solved by resetting the timer on gameover or quit.

Upon final testing it was found that moving the initialisation of the snake variable into the startGame() function led to the color selection in the game setup modal not working. The fix for this was to put the color into a variable instead of directly access the snake.color method itself.


### User Testing

The site was tested from the perspective of a user new to the game.

Instructions were found to be clear and intuitive and it was easy to both start a new game or view the leaderboard form the home page.

The purpose and objective of the game was clear from the outset and it was easy to both quit the game and restart once you had finished without having to reset your username, difficulty and colour.

It was found to be easy to set player name, colour and difficulty level and WASD keys in addition to arrow keys were found to work flawlessly.
On screen keys showed to the user when testing on mobile and were found to be very effective and ergonomic.

The small question mark in the top right corner was found to be visual and subtle to provide a way for users to communicate with the site owner.
Overall it was felt that the site provided a good and fun user experience.

### Owner Testing

From the perspective of the site owner the site was found to be easy to navigate and operate. A clear are for contact in the form of a contact modal was present.
The game itself was found to be suitably challenging on the higher levels to suit skilled players but not so difficult as to put people off.
The game had a good replay-ability factor and favoured those with good dexterity, thus providing some basic hand eye co ordination training.

The leaderboard provided a target for friends and family members to achieve, with the highest scores being recorded persistently for everyone to see.

## Deployment

The site is hosted on the gh-pages branch of the github repository.
To deploy it is recommended that a pull request is made from the main branch to the gh-pages branch as this allows for code review before any changes go live.

A local copy of the repository should be cloned and edited on your local machine. You can then add you changes with "git add .", commit them with "git commit -m ''" and push them with "git push". If you are working on the main branch your changes will be automatically deployed to the live site. If you are working on a branch you should create a pull request from your branch to main.


## Credits

[Animation timing](https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe)<br />
[Inspiration](https://levelup.gitconnected.com/building-a-snake-game-using-canvas-260a738edcec)<br />
[Bootstrap docs](https://getbootstrap.com/) <br />
[Background image](https://unsplash.com/photos/p1SKuYXxqec?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)<br />
[Javascript API](https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/)<br />
[Overlay adapted from stackoverflow](https://stackoverflow.com/questions/61297397/position-absolute-top0-bottom-0-right0-left0-and-parent-paddings)<br />
[Formspree was used for the form](https://formspree.i)<br /><br>

All images and music used are under creative commons license.
