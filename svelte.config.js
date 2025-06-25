import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.args.includes('dev');

const config = {
	preprocess: vitePreprocess(),
	kit: {
        adapter: adapter(),
        paths: {
            base: dev ? '' : process.evn.BASE_PATH,
        }
    }
};

export default config;
