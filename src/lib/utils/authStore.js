const USERS_KEY = 'dijital-okur-users';
const SESSION_KEY = 'dijital-okur-session';

function notifyAuthChange() {
	if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('auth-changed'));
}

function readUsers() {
	if (typeof localStorage === 'undefined') return [];
	try {
		const users = JSON.parse(localStorage.getItem(USERS_KEY));
		return Array.isArray(users) ? users : [];
	} catch {
		return [];
	}
}

function saveUsers(users) {
	localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
	if (typeof localStorage === 'undefined') return null;
	const sessionId = localStorage.getItem(SESSION_KEY);
	return readUsers().find((user) => user.id === sessionId) || null;
}

export function registerUser({ name, email, password }) {
	const normalizedEmail = email.trim().toLowerCase();
	const users = readUsers();
	if (users.some((user) => user.email === normalizedEmail)) {
		throw new Error('Bu e-posta adresiyle zaten kayıt var.');
	}
	if (password.length < 6) {
		throw new Error('Şifre en az 6 karakter olmalıdır.');
	}

	const user = {
		id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
		name: name.trim(),
		email: normalizedEmail,
		password
	};
	users.push(user);
	saveUsers(users);
	localStorage.setItem(SESSION_KEY, user.id);
	notifyAuthChange();
	return user;
}

export function loginUser({ email, password }) {
	const normalizedEmail = email.trim().toLowerCase();
	const user = readUsers().find((item) => item.email === normalizedEmail && item.password === password);
	if (!user) throw new Error('E-posta veya şifre hatalı.');
	localStorage.setItem(SESSION_KEY, user.id);
	notifyAuthChange();
	return user;
}

export function resetPassword({ email, password }) {
	const normalizedEmail = email.trim().toLowerCase();
	const users = readUsers();
	const userIndex = users.findIndex((user) => user.email === normalizedEmail);
	if (userIndex === -1) throw new Error('Bu e-posta adresiyle kayıt bulunamadı.');
	if (password.length < 6) throw new Error('Şifre en az 6 karakter olmalıdır.');

	users[userIndex] = { ...users[userIndex], password };
	saveUsers(users);
	localStorage.setItem(SESSION_KEY, users[userIndex].id);
	notifyAuthChange();
	return users[userIndex];
}

export function logoutUser() {
	if (typeof localStorage !== 'undefined') localStorage.removeItem(SESSION_KEY);
	notifyAuthChange();
}

export function isLoggedIn() {
	return Boolean(getCurrentUser());
}
