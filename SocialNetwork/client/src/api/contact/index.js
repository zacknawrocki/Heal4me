import {fetch} from '../index';
// get friend list
export const reqFriendList = id => fetch('/api/contact/friendList', id, 'GET');
// get user list
export const reqUserList = () => fetch('/api/contact/userList', {}, 'GET');
// remove friend
export const reqDeleteFriend = _id => fetch('/api/contact/deleteFriend', _id, 'POST');
// get notification
export const reqNotification = user_id => fetch('/api/contact/notification', user_id, 'GET');
// get group list
export const reqGroupList = user_id => fetch('/api/contact/group', user_id, 'GET');
// remove group
export const reqDeleteGroup = _id => fetch('/api/contact/deleteGroup', _id, 'POST');
// add group
export const reqAddGroup = group => fetch('/api/contact/addGroup', group, 'POST');
