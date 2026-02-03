// In-memory user storage
class UserStorage {
  constructor() {
    this.users = new Map();
  }

  register(username, password) {
    if (this.users.has(username)) {
      return { success: false, message: 'Username already exists' };
    }
    
    this.users.set(username, { username, password });
    return { success: true, message: 'User registered successfully' };
  }

  login(username, password) {
    const user = this.users.get(username);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    if (user.password !== password) {
      return { success: false, message: 'Incorrect password' };
    }
    
    return { success: true, message: 'Login successful', user: { username } };
  }

  getUser(username) {
    return this.users.get(username);
  }
}

module.exports = new UserStorage();
