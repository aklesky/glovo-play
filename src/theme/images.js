import restaurantsOpen  from 'media/restaurants-open.png';
import restaurantsSleep from 'media/restaurants-sleep.png';

import giftsOpen  from 'media/gifts-open.png';
import giftsSleep  from 'media/gifts-sleep.png';

import snacksOpen from 'media/snacks-open.png';
import snacksSleep  from 'media/snacks-sleep.png';
import wondersOpen  from 'media/wonders-open.png';
import wondersSleep  from 'media/wonders-sleep.png';


export const media = {
  restaurants: {
    active: restaurantsOpen,
    closed:  restaurantsSleep,
  },
  snacks: {
    active: snacksOpen,
    closed: snacksSleep,
  },
  wonders: {
    active: wondersOpen,
    closed: wondersSleep,
  },
  gifts: {
    active: giftsOpen,
    closed: giftsSleep,
  },
}
