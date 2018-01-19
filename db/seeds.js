const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const List = require('../models/list');
const User = require('../models/user');

List.collection.drop();
User.collection.drop();


User
  .create([{
    username: 'bobthebuilder',
    email: 'bob@bob.bob',
    password: 'bob',
    passwordConfirmation: 'bob'
  }, {
    username: 'philtastic',
    email: 'phil@phil.phil',
    password: 'phil',
    passwordConfirmation: 'phil'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return List
      .create([{
        title: 'Bobs favorite Premier league grounds',
        items: [{
          name: 'Old Trafford',
          latitude: 53.457831502,
          longitude: -2.288165514,
          teamname: 'Manchester United, Manchester',
          description: 'Theatre of Dreams, with a capacity of almost 76 000 people, making it the second largest in England, only behind Wembley Stadium. First built in 1909.',
          experience: 'Manchester United - Stoke City, 3-0, 17/18 season. The game itself was pretty good, with a quality effort from the United players, creating lots in the second half. The stadium was great, with a lot of history created within it for nearly a century. Atmosphere could have been a bit better, but the stadium erupted several times throughout the match. Quality matchday burgers aswell. I would recommend everyone to go to this historic ground at least once in their lifetime.',
          image: 'http://therepublikofmancunia.com/wp-content/uploads/2017/10/old-trafford-manchester-united-fc-view-from-away-section-1472138341.jpg',
          createdBy: users[0]},
        {
          name: 'Stamford Bridge',
          latitude: 51.475664764,
          longitude: -0.187999248,
          teamname: 'Chelsea FC, London',
          description: 'Capacity of almost 42 000 people, opened in 1877, and homefield for Chelsea since it was founded in 1905.',
          experience: 'Chelsea - Barcelona, 1-1, 08/09 season. One of the greatest matches I have ever seen, due to amazing footballers and a horrible referee. A late goal by Barcelona saw them going through to the final of the Champions League over Chelsea, much to the dismay of the home crowd. The atmosphere on the stadium was amazing, where almost 40 000 people screamed in agony several times during the game, most of the time due the horrendous refereeing. The over one hundred year old ground was fantastic, and the reputation of the fans on The Bridge will not disappoint in making a matchexperience here very good.',
          image: 'http://assets.bwbx.io/images/iWqdoqGLByME/v1/1200x-1.jpg',
          createdBy: users[0]
        }],
        createdBy: users[0]
      }, {
        title: 'My visits to PL grounds',
        items: [{
          name: 'St. James Park',
          latitude: 51.50246,
          longitude: -0.134811,
          teamname: 'Newcastle United FC, Newcastle upon Tyne',
          description: 'Opened in 1891, with a complete renovation in 2001, making the capacity of the stadium 52 387 people. Sold the rights to the name in 2011, and was renamed Sports Direct Arena, to the fans horror. Sold on to Wonga in 2012, who demanded the old name to be reinstated.',
          experience: 'Newcastle - Wigan, 2-1, 16/18 season. The stadium was packed this day, like almost every home match for Newcastle. The atmosphere of 50 000 northeners was great, people shouting toon, toon, blakc-white-army all over the place. The ground itself is nice, even though they have tried to put an ad for Sports Direct anywhere physically possible. Game was alright, and had a decent game-day burger between the halves. Glad to have put this one on the list!',
          image: 'http://www.stadiumguide.com/wp-content/uploads/stjamespark_top.jpg',
          createdBy: users[1]},
        {
          name: 'Stamford Bridge',
          latitude: 51.475664764,
          longitude: -0.187999248,
          teamname: 'Chelsea F. C., London',
          description: 'Capacity of almost 42 000 people, opened in 1877, and homefield for Chelsea since it was founded in 1905.',
          experience: 'Chelsea - Sunderland, 2-0. This was a few years back, and I was really excited going all the way from Norway to London to watch a PL game! This was the first PL game I went to, and I loved everything before the match, with all the supporters walking towards the ground before kick-off. Being ushered into the correct entrance and all that. Grabbing a burger before taking our seats, to then witness the teams coming out on the pitch. I was really enjoying the day, and was excited for the game to begin, along with 40 000 other people. What then came was a complete shitshow of a game, with Chelsea taking an early lead and just controlled the game until the end, going down as one of the most boring games of my life. The ground was nice thou!',
          image: 'http://assets.bwbx.io/images/iWqdoqGLByME/v1/1200x-1.jpg',
          createdBy: users[1]
        }],
        createdBy: users[1]
      }]);
  })
  .then((lists) => console.log(`${lists.length} lists created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
