<svelte:options tag="surfboard-markdown" />

<script lang="ts">
    import type { Tile } from '../models/tile';
    import type { Markdown } from '../models/tiles/markdown';
    import type { NetworkService } from '../services/networkService';

    export let tile: Tile;
    export let networkService: NetworkService;

    $: config = tile?.config as Markdown;
    $: textPromise = config?.source
        ? networkService.getText(config.source)
        : Promise.resolve(config?.text);
</script>

{#if tile}
    <h1>{tile?.title}</h1>
    {#await textPromise}
        Loading content...
    {:then text}
        <p style="white-space: pre-line;">{text}</p>
    {/await}
{:else}
    Loading...
{/if}
