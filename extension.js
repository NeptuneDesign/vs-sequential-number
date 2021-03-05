const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('vs-sequential-number.generate', sequentialNumberGenerate));
}
exports.activate = activate;

function sequentialNumberGenerate() {
	if (vscode.window.activeTextEditor) {

		let input = vscode.window.showInputBox({
			'value': '1',
			'placeHolder': '1 + 1',
			'prompt' : '<start> <operator?> <step?>'
		});

		input.then((value) => {
			if (value) {
				let options = [];

				value.split(' ').forEach((element) => {
					if (element) {
						options.push(element);
					}
				});

				let start = options[0] ? options[0] : '1';
				let operator = '+';
				let step = '1';

				if (options[1]) {
					if (['+', '-', '*', '/'].includes(options[1])) {
						operator = options[1];
						step = options[2] ? options[2] : '1';
					} else {
						step = options[1];
					}
				}

				let result = start;

				vscode.window.activeTextEditor.edit((editBuilder) => {
					vscode.window.activeTextEditor.selections.forEach((element, index) => {
						if (index != 0) {
							result = eval(parseInt(result) + operator + parseInt(step));
						}

						editBuilder.replace(element, result.toString());
					});
				});
			}
		});
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
