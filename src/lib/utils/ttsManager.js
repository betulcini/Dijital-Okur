// Text-to-Speech Manager
class TTSManager {
	constructor() {
		this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
		this.isSupported = !!this.synthesis;
		this.currentUtterance = null;
		this.isReading = false;
	}

	speak(text, options = {}) {
		if (!this.isSupported) {
			console.warn('Text-to-Speech desteklenmiyor');
			return;
		}

		// Devam eden konuşmayı durdur
		this.stop();

		const utterance = new window.SpeechSynthesisUtterance(text);

		// Seçenekleri ayarla
		utterance.lang = options.lang || 'tr-TR';
		utterance.rate = options.rate || 1;
		utterance.pitch = options.pitch || 1;
		utterance.volume = options.volume || 1;

		// Event listeners
		utterance.onstart = () => {
			this.isReading = true;
			if (options.onStart) options.onStart();
		};

		utterance.onend = () => {
			this.isReading = false;
			if (options.onEnd) options.onEnd();
		};

		utterance.onerror = (event) => {
			this.isReading = false;
			console.error('TTS Hatası:', event.error);
			if (options.onError) options.onError(event.error);
		};

		this.currentUtterance = utterance;
		this.synthesis.speak(utterance);
	}

	stop() {
		if (this.isSupported && this.isReading) {
			this.synthesis.cancel();
			this.isReading = false;
		}
	}

	pause() {
		if (this.isSupported && this.isReading) {
			this.synthesis.pause();
		}
	}

	resume() {
		if (this.isSupported && this.synthesis.paused) {
			this.synthesis.resume();
		}
	}

	isReading() {
		return this.isReading;
	}

	// HTML metnini temizle ve oku
	speakHTML(htmlText, options = {}) {
		// HTML taglarını kaldır
		const text = typeof document !== 'undefined'
			? (() => {
					const div = document.createElement('div');
					div.innerHTML = htmlText;
					return div.textContent || div.innerText || '';
				})()
			: htmlText.replace(/<[^>]*>/g, ' ');

		// Boşlukları temizle
		const cleanText = text.replace(/\s+/g, ' ').trim();

		this.speak(cleanText, options);
	}
}

export const ttsManager = new TTSManager();
