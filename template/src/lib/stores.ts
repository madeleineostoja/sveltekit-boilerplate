import watchMedia from 'svelte-media';
import { customMedia } from '$src/styles/breakpoints.json';

export const media = watchMedia(customMedia);
