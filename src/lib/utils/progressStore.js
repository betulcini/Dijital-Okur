const STORAGE_KEY = 'dijital-okur-progress';

const emptyProgress = () => ({ completedLessons: [] });

function readProgress() {
	if (typeof localStorage === 'undefined') return emptyProgress();

	try {
		const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
		return Array.isArray(stored?.completedLessons) ? stored : emptyProgress();
	} catch {
		return emptyProgress();
	}
}

function saveProgress(progress) {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
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
		saveProgress(progress);
	}
	return progress;
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
