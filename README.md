# contrast-reports

This tool reads a JSON color palette file and calculates the WCAG scores for each combination of colors, writing it to a CSV.

## Installation
```
npm install
```

## Usage

1. Add a file named `palette.json` to the root folder (same level as this readme), where each key/value pair is set up like "COLORNAME": "HEX VALUE":
```
{
	"white": "#fff",
	"black": "#111
	...
}
```

2. Run `npm start` in your terminal (or run `npm start loud` if you want to also see the results in your terminal)

3. Open `contrast-report.csv` in your CSV reader of choice, or `report.html` in a browser.

## Output

In `contrast-report.csv`, you'll see the following columns:

- `colorA`: The first of two colors in each comparison
- `colorB`: The second of two colors in each comparison
- `contrast ratio`: The contrast ratio between `colorA` and `colorB`
- `AA`: `pass` if `contrast ratio` is greater than or requal to the WCAG AA threshold for normal text (`4.5:1`), `fail` if not
- `AAA`: `pass` if `contrast ratio` is greater than or requal to the WCAG AAA threshold for normal text (`7:1`), `fail` if not
- `AA Large`: `pass` if `contrast ratio` is greater than or requal to the WCAG AA threshold for large text  (`3:1`), `fail` if not
- `AAA Large`: `pass` if `contrast ratio` is greater than or requal to the WCAG AAA threshold for large text  (`4.5:1`), `fail` if not
- `UI Components`: `pass` if `contrast ratio` is greater than or requal to the WCAG  threshold for UI components  (`3:1`), `fail` if not
