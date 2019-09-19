const fs = require('fs');
const nunjucks = require('nunjucks');
const beLoud = (process.argv.indexOf('loud') >= 0);
const path = require('path');
const contrast = require("color-contrast-calc").ContrastChecker;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const palette = JSON.parse(fs.readFileSync(path.join(__dirname, '../palette.json'), 'utf-8'));
const csvWriter = createCsvWriter({
	path: 'contrast-report.csv',
	header: [
		{ id: 'colorA', title: 'colorA' },
		{ id: 'colorB', title: 'colorB' },
		{ id: 'contrastRatio', title: 'contrast ratio' },
		{ id: 'AA', title: 'AA' },
		{ id: 'AAA', title: 'AAA' },
		{ id: 'AALarge', title: 'AA Large' },
		{ id: 'AAALarge', title: 'AAA Large' },
		{ id: 'UIComponents', title: 'UI Components' }
	]
});
const standards = {
	AA: 4.5,
	AALarge: 3,
	AAA: 7,
	AAALarge: 4.5,
	UI: 3
};

const results = [];

Object.keys(palette).forEach(testColorName => {
	const testColor = palette[testColorName];
	const testName = `${testColorName} (${testColor})`;
	const comparisonColors = Object.keys(palette).filter(name => name !== testColorName).map(name => palette[name]);
	const tests = [];

	comparisonColors.forEach(comparison => {
		const comparisonColorName = Object.keys(palette).filter(color => palette[color] === comparison);
		const comparisonName = `${comparisonColorName} (${comparison})`;
		const ratio = contrast.contrastRatio(testColor, comparison);
		comparisonResults = {
			colorA: testName,
			colorB: comparisonName,
			hexA: testColor,
			hexB: comparison,
			contrastRatio: ratio,
			AA: (ratio >= standards.AA ? 'pass' : 'fail'),
			AAA: (ratio >= standards.AAA ? 'pass' : 'fail'),
			AALarge: (ratio >= standards.AALarge ? 'pass' : 'fail'),
			AAALarge: (ratio >= standards.AAALarge ? 'pass' : 'fail'),
			UIComponents: (ratio >= standards.UI ? 'pass' : 'fail')
		};
		results.push(comparisonResults);
	});
});

csvWriter.writeRecords(results).then(() => console.log('Results exported to contrast-report.csv'));

const html = nunjucks.render('src/report-template.html', { reports: results });
fs.writeFileSync('report.html', html);

if (beLoud) console.table(results)
