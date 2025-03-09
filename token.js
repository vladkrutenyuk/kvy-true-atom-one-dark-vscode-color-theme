const fs = require('node:fs');
const path = require('path');

const absPath = '/themes/kvy-true-atom-onedark-color-theme.json';
const filePath = path.join(__dirname, absPath);

try {
	const data = fs.readFileSync(filePath, 'utf8');

	// Парсим JSON
	const jsonData = JSON.parse(data);
	handleJsonData(jsonData);
} catch (err) {
	console.error(err);
}

function save(content, name) {
	try {
		const resPath = path.join(__dirname, name);
		fs.writeFileSync(resPath, content);
		// file written successfully
	} catch (err) {
		console.error(err);
	}
}

/**
 * 
 * @param {Array<{name?: string,scope:string|string[],settings:{foreground?:string,fontStyle?:string}}>} jsonData 
 */
function handleJsonData(jsonData) {
	const scopesByColors = {};
	for (const rule of jsonData.tokenColors) {
		const color = rule.settings.foreground?.toUpperCase();
		if (!color) continue;
		const scopes = scopesByColors[color] ?? [];
		scopesByColors[color] = scopes;
		
		const ruleScope = rule.scope;
		scopes.push(...(Array.isArray(ruleScope) ? ruleScope : [ruleScope]))
	}
	const colors = {};
	for (const color in scopesByColors) {
		colors[color] = color;
	}
	const data = {
		scopesByColors,
		colors, 
		rules: {}
	}
	save(JSON.stringify(data), "res.json")
}
