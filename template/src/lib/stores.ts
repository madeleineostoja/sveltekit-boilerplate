import watchMedia from 'svelte-media';
import { customMedia } from '../styles/breakpoints.json';

export const media = watchMedia(customMedia);
