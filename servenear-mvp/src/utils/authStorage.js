const USERS_KEY = "servenear_users";
const CURRENT_USER_KEY = "servenear_current_user";

export function getUsers() {
  const storedUsers = localStorage.getItem(USERS_KEY);

  if (!storedUsers) {
    return [];
  }

  try {
    return JSON.parse(storedUsers);
  } catch (error) {
    console.error("Failed to parse users:", error);
    return [];
  }
}

export function getCurrentUser() {
  const storedUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse current user:", error);
    return null;
  }
}

export function registerMockUser({ fullName, email, password, role }) {
  const existingUsers = getUsers();

  const userAlreadyExists = existingUsers.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (userAlreadyExists) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: crypto.randomUUID(),
    fullName,
    email,
    password,
    role,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...existingUsers, newUser];

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return newUser;
}

export function loginMockUser({ email, password }) {
  const existingUsers = getUsers();

  const foundUser = existingUsers.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (!foundUser) {
    throw new Error("Invalid email or password.");
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));

  return foundUser;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getDashboardPath(role) {
  if (role === "provider") {
    return "/provider/dashboard";
  }

  if (role === "admin") {
    return "/admin/dashboard";
  }

  return "/customer/home";
}