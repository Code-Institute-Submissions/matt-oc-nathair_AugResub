# Nathair (snake in Irish)
Javascript game for playing online with cloud score storage.

Published: [Nathair](https://matt-oc.github.io/nathair/)
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

small touches like appropriate title and favicon add a more polished look.

#### Wireframes
![Mobile](/assets/readme-assets/mobile.png)
![Tablet](/assets/readme-assets/ipad.png)
![Computer](/assets/readme-assets/computer.png)

## Technologies Used

html
css
javascript
bootstrap
json
Node.js
git and github
[Formspree](https://formspree.io/)


## Testing
Testing was conducted manually using Chrome, Safari and Firefox to check compatibility at all screen sizes.
Tests were also performed using the responsive tools to check how the site responds at various breakpoints.

As the site was being built it was tested along the way to make sure new features were working as intended such as the contact form, contact form validation, the main gameplay and the modals.

The main difficulty was the fact the canvas size must be specified within the html for scaling to work properly. It was not possible to set the size using css so some javascript has to be used to handle page resizing.

The API initially was not working until the correct syntax was used setting the data type to JSON for the post req.

Lighthouse used to test page performance.

Css and Html Validated using the check on [w3](https://validator.w3.org/)

In addition there were minor layout bugs when testing for mobile view sizes.

## Deployment

The site is hosted on the gh-pages branch of the github repository.
To deploy it is recommended that a pull request is made from the main branch to the gh-pages branch as this allows for code review before any changes go live.


## Credits

[Animation timing](https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe)<br />
[Inspiration](https://levelup.gitconnected.com/building-a-snake-game-using-canvas-260a738edcec)<br />
[Bootstrap docs](https://getbootstrap.com/) <br />
[Background image](https://unsplash.com/photos/p1SKuYXxqec?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)<br />
[Javascript API](https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/)<br />
[Overlay adapted from stackoverflow](https://stackoverflow.com/questions/61297397/position-absolute-top0-bottom-0-right0-left0-and-parent-paddings)<br />
[Formspree was used for the form](https://formspree.i)<br />
All images and music used are under creative commons license.
