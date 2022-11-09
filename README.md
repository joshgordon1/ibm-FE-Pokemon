# ibm-FE-Pokemon
A sample application for IBM coding challenge

## Project Notes
For this Project, I decided to use Nuxt, since that is what most of my professional experience is in.

I did want to try something different though, so I the Single Page App setup for this project. This removes server-side rendering, which I didn't think was important for this project since there are no SEO/performance restrictions. I also used SCSS/SASS for the style so I could utilize mixins and I prefer the look and feel of how SCSS is written compared to vanilla CSS.

I tried tailwindcss for out of the box style, I wanted to try one of these types of libraries since I have only used custom styles in my professional projects. After trying it out, I found it to be convenient for a few things, but the benefits didn't outweigh the customization and control I usually have just writing it myself.

I wanted to utilize a Vuex store for this app, I thought it made the most sense to control the data/functions in one place. I think this also made the code much more concise and reduced the instances of repeated code across the app.

This was actually the first time I had to write Unit tests for Vue Components, I used jest because I know it is popular (usually means above average documentation) and because Vue CLI can generate the Nuxt app with Jest installed and setup out of the box. I was able to implement a few tests and do some experimentation but due to time limitations I wasn't able to be as thorough as I would have liked. This is definitely a skill that I would like to improve on.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).