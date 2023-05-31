"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm = exports.emptyNullUndefined = exports.checkYes = exports.input = exports.writeJson = exports.readJson = void 0;
const fs_1 = require("fs");
const readline = __importStar(require("readline"));
const readJson = async (filepath) => {
    return (0, fs_1.readFileSync)(filepath, { encoding: 'utf8' });
};
exports.readJson = readJson;
const writeJson = async (data, filepath) => {
    (0, fs_1.writeFileSync)(filepath, JSON.stringify(data));
};
exports.writeJson = writeJson;
const input = (prompt) => {
    const r = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        r.question(prompt, (choice) => {
            resolve(choice);
            r.close();
        });
    });
};
exports.input = input;
const checkYes = async (optionText) => {
    const response = await (0, exports.input)(`${optionText} [Y/n]: `);
    if (response === '' || response[0]?.toLowerCase() === 'y') {
        return true;
    }
    return false;
};
exports.checkYes = checkYes;
const emptyNullUndefined = (value) => {
    switch (value) {
        case null:
        case undefined:
        case '':
            return true;
        default:
            return false;
    }
};
exports.emptyNullUndefined = emptyNullUndefined;
const confirm = async (confirmText) => {
    const response = await (0, exports.input)(`${confirmText} [Y/n]: `);
    if (response[0]?.toLowerCase() === 'q') {
        quitSetup();
    }
    if (response === '' || response[0]?.toLowerCase() === 'y') {
        return true;
    }
    return false;
};
exports.confirm = confirm;
const quitSetup = () => {
    console.log('\nExiting setup...');
    process.exit();
};
