const svgContents = require('eleventy-plugin-svg-contents');
const { DateTime } = require("luxon");
require('dotenv').config()



module.exports = function (eleventyConfig) {
	eleventyConfig.setBrowserSyncConfig({
		files: '../css/**/*.css',
	});
	eleventyConfig.setLiquidOptions({
		dynamicPartials: true,
	});
	eleventyConfig.addFilter("postDate", (dateString) => {
		return DateTime.fromSQL(dateString).toFormat("d MMMM yyyy");
	});
	eleventyConfig.addPlugin(svgContents);
	eleventyConfig.addPassthroughCopy('src/css');
	eleventyConfig.addPassthroughCopy('src/assets');
	return {
		dir: { input: 'src', output: '../web_tmp/' },
		passthroughFileCopy: true,
	};
};
