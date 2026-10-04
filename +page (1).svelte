<script>
	/** 0–100 arası yüzde */
	export let value = 0;
	export let size = 112;
	export let stroke = 9;
	export let label = '';

	$: clamped = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
	$: radius = (size - stroke) / 2;
	$: circumference = 2 * Math.PI * radius;
	$: offset = circumference * (1 - clamped / 100);
</script>

<div
	class="progress-ring"
	style="width: {size}px; height: {size}px"
	role="progressbar"
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={Math.round(clamped)}
	aria-label={label || 'İlerleme'}
>
	<svg width={size} height={size} viewBox="0 0 {size} {size}" aria-hidden="true">
		<circle class="track" cx={size / 2} cy={size / 2} r={radius} stroke-width={stroke} fill="none" />
		<circle
			class="value"
			cx={size / 2}
			cy={size / 2}
			r={radius}
			stroke-width={stroke}
			fill="none"
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset={offset}
			transform="rotate(-90 {size / 2} {size / 2})"
		/>
	</svg>
	<span class="center">{Math.round(clamped)}<small>%</small></span>
</div>

<style>
	.progress-ring {
		position: relative;
		display: inline-grid;
		place-items: center;
	}
	svg {
		position: absolute;
		inset: 0;
	}
	.track {
		stroke: #3a3836;
	}
	.value {
		stroke: #d97757;
		transition: stroke-dashoffset 0.6s ease;
	}
	.center {
		font-size: 1.5rem;
		font-weight: 650;
		color: #f2efea;
		letter-spacing: -0.02em;
	}
	.center small {
		font-size: 0.75rem;
		font-weight: 500;
		color: #a8a39b;
		margin-left: 1px;
	}
	@media (prefers-reduced-motion: reduce) {
		.value {
			transition: none;
		}
	}
</style>
