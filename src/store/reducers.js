import { combineReducers } from 'redux';

// reducers
import Home from '../pages/Home/reducer';

import MyHome from '../pages/PersonalCenter/modules/MyHome/reducer';
import BankCard from '../pages/PersonalCenter/modules/BankCard/reducer';
import Safe from '../pages/PersonalCenter/modules/AccountSafe/reducer';
import Notice from '../pages/Notice/NoticeRedux'

export default combineReducers({ Home, MyHome, BankCard, Safe, Notice });
