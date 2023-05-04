async function signUp(Username, password, name){
const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/signup', {user: {name, Username, password}})
console.log(res);
};
signUp('J', 'j', 'mrj');
