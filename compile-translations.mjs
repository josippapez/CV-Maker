/// <reference types="node" />

import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

/**
 *
 * @param {string} startDir
 * @param {RegExp} regexFilter
 * @param {function} callback
 */
function findTranslations(startDir, regexFilter, callback) {
    console.log(
        chalk.blue('- Finding translation files in directory:'),
        startDir,
    );

    if (!fs.existsSync(startDir)) {
        console.log(chalk.red('- Directory does not exist:'), startDir);
        return;
    }

    const files = fs.readdirSync(startDir);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startDir, files[i]);
        var stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            findTranslations(filename, regexFilter, callback);
        } else if (regexFilter.test(filename)) {
            callback(filename);
        }
    }
}

/**
 *
 * @param {string} filePath
 */
function appendTranslationFile(filePath) {
    console.log(
        chalk.green('- Translation file found:'),
        chalk.yellow(filePath),
    );

    const translationFile = JSON.parse(fs.readFileSync(filePath));
    const language = filePath.split('/').pop().replace('.json', '');
    const componentName = filePath.split('/').slice(-2)[0];
    console.log(componentName, language);

    const translationsFolder = 'public/translations';
    if (!fs.existsSync(translationsFolder)) {
        fs.mkdirSync(translationsFolder, { recursive: true });
    }

    const resultTranslationFilePath = `${translationsFolder}/${language}.json`;
    if (!fs.existsSync(resultTranslationFilePath)) {
        fs.writeFileSync(resultTranslationFilePath, JSON.stringify({}), {
            flag: 'w',
        });
    }

    const resultTranslationFile = JSON.parse(
        fs.readFileSync(resultTranslationFilePath),
    );

    fs.writeFileSync(
        resultTranslationFilePath,
        JSON.stringify({
            ...resultTranslationFile,
            ...translationFile,
        }),
    );
}

['modules', 'ui'].forEach((dir) =>
    findTranslations(dir, /\.json$/, appendTranslationFile),
);
