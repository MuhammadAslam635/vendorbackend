import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const uploadDir = path.resolve(process.cwd(), 'public/uploads');

// Create upload directories if they don't exist
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

export const profileStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(uploadDir, 'profiles'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `profile_${uniqueSuffix}${ext}`);
  }
});

export const logoStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(uploadDir, 'logos'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `logo_${uniqueSuffix}${ext}`);
  }
});