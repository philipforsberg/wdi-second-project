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
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return List
      .create([{
        title: 'Bobs favorite Premier league grounds',
        items: [{
          name: 'Old Trafford',
          teamname: 'Manchester United, Manchester',
          description: 'Theatre of Dreams, with a capacity of almost 76 000 people, making it the second largest in England, only behind Wembley Stadium. First built in 1909.',
          experience: 'Manchester United - Stoke City, 3-0. The game itself was pretty good, with a quality effort from the United players, creating lots in the second half. The stadium was great, with a lot of history created within it for nearly a century. Atmosphere could have been a bit better, but the stadium erupted several times throughout the match. Quality matchday burgers aswell. I would recommend everyone to at least go this historic ground at least once in their lifetime.',
          image: 'http://therepublikofmancunia.com/wp-content/uploads/2017/10/old-trafford-manchester-united-fc-view-from-away-section-1472138341.jpg',
          createdBy: users[0]}],
        createdBy: users[0]
      }]);
  })
  .then((lists) => console.log(`${lists.length} lists created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
