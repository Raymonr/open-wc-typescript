import { createDefaultConfig } from '@open-wc/building-rollup';
import typescript from 'rollup-plugin-typescript2';
import litcss from 'rollup-plugin-lit-css';
import copy from 'rollup-plugin-cpy';

// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

const config = createDefaultConfig({
  input: './index.html',
  extensions: ['.js', '.mjs', '.ts'],
});

// if you use an array of configs, you don't need the copy task to be executed for both builds.
// we can add the plugin only to the first rollup config:
export default [
  // add plugin to the first config
  {
    ...config[0],
    plugins: [
      ...config[0].plugins,
      typescript(),
      // eslint-disable-next-line no-undef
      litcss({ include, exclude, uglify }),
      copy({
        // copy over all images files
        files: ['**/*.png'],
        dest: 'src',
        options: {
          // parents makes sure to preserve the original folder structure
          parents: true,
        },
      }),
    ],
  },

  // leave the second config untouched
  config[1],
];
