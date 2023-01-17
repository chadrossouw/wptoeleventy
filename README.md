# WP to Eleventy

This converts a standard WP install into a static site. It saves WP post data as JSON files and rebuilds the static when post status changes WP side. This means we change the data incrementally rather than pulling everything from the WP REST API

## Install

Run `npm install` in the build folder.

Add a full install of WP into the CMS folder, keeping the plugins folder. Normal WP install, and activate the two plugins. There's a bare bones theme as well.

Domain should point to the web folder.

There is some basic webpack and sass stuff setup for eleventy, and some templates. Chop and change as needed.









