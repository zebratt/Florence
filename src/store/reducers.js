import { combineReducers } from 'redux';

// reducers
import Home from '../pages/Home/reducer';

import MyHome from '../pages/PersonalCenter/modules/MyHome/reducer';
import BankCard from '../pages/PersonalCenter/modules/BankCard/reducer';

export default combineReducers({ Home,  MyHome, BankCard });
