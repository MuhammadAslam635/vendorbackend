"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoStorage = exports.profileStorage = void 0;
const multer_1 = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = path.resolve(process.cwd(), 'public/uploads');
const createUploadDirs = () => {
    const dirs = ['profiles', 'logos'];
    dirs.forEach(dir => {
        const dirPath = path.join(uploadDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
};
createUploadDirs();
exports.profileStorage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, path.join(uploadDir, 'profiles'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `profile_${uniqueSuffix}${ext}`);
    }
});
exports.logoStorage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, path.join(uploadDir, 'logos'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `logo_${uniqueSuffix}${ext}`);
    }
});
//# sourceMappingURL=storage.config.js.map