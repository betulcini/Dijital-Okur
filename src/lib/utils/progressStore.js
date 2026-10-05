const STORAGE_KEY = 'dijital-okur-progress';

function getStorageKey() {
	if (typeof localStorage === 'undefined') return STORAGE_KEY;
	const sessionId = localStorage.getItem('dijital-okur-session');
	return sessionId ? `${STORAGE_KEY}:${sessionId}` : STORAGE_KEY;
}

const emptyProgress = () => ({
	completedLessons: [],
	completedScenarios: [],
	weeklyGoal: 2,
	readingPosition: null
});

function readProgress() {
	if (typeof localStorage === 'undefined') return emptyProgress();

	try {
		const stored = JSON.parse(localStorage.getItem(getStorageKey()));
		return Array.isArray(stored?.completedLessons)
			? { ...emptyProgress(), ...stored }
			: emptyProgress();
	} catch {
		return emptyProgress();
	}
}

function saveProgress(progress) {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(getStorageKey(), JSON.stringify(progress));
	}
}

export function getProgress() {
	return readProgress();
}

export function isLessonCompleted(id) {
	return readProgress().completedLessons.some((lesson) => lesson.id === id);
}

export function completeLesson({ id, title, xp = 100 }) {
	const progress = readProgress();
	if (!progress.completedLessons.some((lesson) => lesson.id === id)) {
		progress.completedLessons.push({ id, title, xp, completedAt: new Date().toISOString() });
	}
	progress.readingPosition = null;
	saveProgress(progress);
	return progress;
}

export function saveLessonPosition({ id, title, section = 0 }) {
	const progress = readProgress();
	if (progress.completedLessons.some((lesson) => lesson.id === id)) return progress;
	progress.readingPosition = { id, title, section, updatedAt: new Date().toISOString() };
	saveProgress(progress);
	return progress;
}

export function getLessonPosition() {
	return readProgress().readingPosition;
}

export function setWeeklyGoal(goal) {
	const progress = readProgress();
	progress.weeklyGoal = Math.min(7, Math.max(1, Math.round(Number(goal) || 2)));
	saveProgress(progress);
	return progress.weeklyGoal;
}

function getWeekStart(date = new Date()) {
	const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	const daysSinceMonday = (start.getDay() + 6) % 7;
	start.setDate(start.getDate() - daysSinceMonday);
	return start;
}

export function getWeeklyGoalSummary() {
	const progress = readProgress();
	const weekStart = getWeekStart();
	const completedThisWeek = progress.completedLessons.filter((lesson) => {
		const completedAt = new Date(lesson.completedAt);
		return !Number.isNaN(completedAt.getTime()) && completedAt >= weekStart;
	}).length;
	const goal = Math.min(7, Math.max(1, Number(progress.weeklyGoal) || 2));

	return {
		goal,
		completed: completedThisWeek,
		remaining: Math.max(0, goal - completedThisWeek),
		weekStart: weekStart.toISOString().slice(0, 10)
	};
}

export function completeScenario(id) {
	const progress = readProgress();
	if (!progress.completedScenarios.some((scenario) => scenario.id === id)) {
		progress.completedScenarios.push({ id, completedAt: new Date().toISOString() });
		saveProgress(progress);
	}
	return progress.completedScenarios;
}

export function resetProgress() {
	saveProgress(emptyProgress());
	return emptyProgress();
}

export function getProgressSummary(totalLessons) {
	const progress = readProgress();
	const completed = progress.completedLessons;
	return {
		completedLessons: completed.length,
		totalLessons,
		xp: completed.reduce((total, lesson) => total + lesson.xp, 0),
		badges: completed.length
	};
}
