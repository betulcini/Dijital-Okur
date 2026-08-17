// Sound manager - Web Audio API ile sesler oluştur
class SoundManager {
	constructor() {
		this.audioContext = null;
		this.isMuted = typeof localStorage !== 'undefined' && localStorage.getItem('soundMuted') === 'true';
		this.lastClickTime = 0;
	}

	getAudioContext() {
		if (!this.audioContext) {
			try {
				const AudioContext = window.AudioContext || window.webkitAudioContext;
				this.audioContext = new AudioContext();
			} catch (e) {
				console.warn('Web Audio API desteklenmiyor');
				return null;
			}
		}
		return this.audioContext;
	}

	// Click sesi - hafif, kısa
	playClick() {
		if (this.isMuted) return;
		const currentTime = Date.now();
		if (currentTime - this.lastClickTime < 80) return;
		this.lastClickTime = currentTime;
		const ctx = this.getAudioContext();
		if (!ctx) return;

		const now = ctx.currentTime;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.frequency.value = 800;
		gain.gain.setValueAtTime(0.3, now);
		gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

		osc.start(now);
		osc.stop(now + 0.1);
	}

	// Başarı sesi - melodili
	playSuccess() {
		if (this.isMuted) return;
		const ctx = this.getAudioContext();
		if (!ctx) return;

		const now = ctx.currentTime;
		const notes = [800, 1000, 1200];
		let time = now;

		notes.forEach((freq, index) => {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.frequency.value = freq;
			gain.gain.setValueAtTime(0.2, time);
			gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

			osc.start(time);
			osc.stop(time + 0.15);

			time += 0.15;
		});
	}

	// Badge/Rozet sesi - çan sesi
	playBadge() {
		if (this.isMuted) return;
		const ctx = this.getAudioContext();
		if (!ctx) return;

		const now = ctx.currentTime;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.frequency.setValueAtTime(1200, now);
		osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);

		gain.gain.setValueAtTime(0.3, now);
		gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

		osc.start(now);
		osc.stop(now + 0.3);
	}

	// Hata sesi
	playError() {
		if (this.isMuted) return;
		const ctx = this.getAudioContext();
		if (!ctx) return;

		const now = ctx.currentTime;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.frequency.value = 300;
		gain.gain.setValueAtTime(0.2, now);
		gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

		osc.start(now);
		osc.stop(now + 0.2);
	}

	toggle() {
		this.isMuted = !this.isMuted;
		localStorage.setItem('soundMuted', this.isMuted.toString());
		return !this.isMuted;
	}

	isSoundEnabled() {
		return !this.isMuted;
	}
}

export const soundManager = new SoundManager();
