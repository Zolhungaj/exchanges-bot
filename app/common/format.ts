const config = require('../config/format');


const unchecked = (line : string) => `${config.uncheckSymbol} ${line}`;

const checked = (line : string) => `${config.checkSymbol} ${line}`;

const scored = (line : string, score : string) => `${line} ${config.scoreFormat.replace(config.scoreToken, score)}`;

const completed = (line : string, score : string) : string => scored(checked(line), score);

const group = (number : string | number) => config.groupFormat.replace(config.groupToken, number.toString())

const listTitle = (groupNumber : string|number,
				   member : string,
				   total : string|number,
				   finished : string | number = 0) : string => {
	return [group(groupNumber), member, `**(${finished}/${total})**`].join(' ')
};

const markdownTokens = [
	'||',
	'__',
	'~~',
	'***',
	'**',
	'`',
]

const stripMarkdown = (line : string) : string => {
	return markdownTokens.reduce(
		(line : string, token : string) =>
			line.replaceAll(token, ''),
		line)
}

const formatMessageUnchecked = (content : string) => {
	return content.split('\n')
		.map(unchecked)
		.join('\n')
		+ '\n';
};

module.exports = {
	group, listTitle,
	completed, scored, checked, unchecked,
	stripMarkdown, formatMessageUnchecked,
	config,
};
