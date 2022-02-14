const { uncheckSymbol, checkSymbol } = require("../config/format");

const countUnfinishedLines = (lines : string[]) => lines
	.filter(line => line.includes(uncheckSymbol))
	.length;

/** @param {string[]} lines */
const countFinishedLines = (lines : string[]) => lines
	.filter(line => line.includes(checkSymbol))
	.length;

const countTotalLines = (lines : string[]) => countFinishedLines(lines) + countUnfinishedLines(lines);

module.exports = {
	countFinishedLines, countUnfinishedLines, countTotalLines,
}