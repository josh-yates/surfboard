<svelte:options tag="surfboard-container" />

<script lang="ts">
	import { LogLevel, parseLogLevel } from './models/logLevels';
	import { LogService } from './services/logService';
	import { NetworkService } from './services/networkService';
	import type { Surfboard } from './models/surfboard';
	import type { TileType } from './models/tileType';
	import MarkdownTile from './components/MarkdownTile.svelte';

	export let config: string;
	export let loglevel: string;
	export let disabledefaultlogging: boolean;

	const componentLookup = (type: TileType): any => {
		switch (type) {
			case 'Markdown':
				return MarkdownTile;
			case 'Data':
			default:
				return null;
		}
	};

	const parsedLogLevel = parseLogLevel(loglevel) ?? LogLevel.Warn;
	const logger = new LogService(
		parsedLogLevel,
		disabledefaultlogging ?? false
	);
	const networkService = new NetworkService(logger);

	const surfboadPromise = networkService.getJson<Surfboard>(config);
</script>

{#await surfboadPromise}
	Loading surfboard
{:then surfboard}
	{#if surfboard}
		{#each surfboard.tiles as tile}
			<svelte:component
				this={componentLookup(tile.type)}
				{tile}
				{networkService}
			/>
		{/each}
	{:else}
		Failed to load Surfboard. Check the logs for more details.
	{/if}
{:catch error}
	{logger.writeError('Error during surfboard parsing', error)}
{/await}
