import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(filename: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, filename),
      path.resolve(uploadConfig.uploadsFolder, filename),
    );

    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    try {
      fs.promises.stat(path.resolve(uploadConfig.uploadsFolder, filename));
    } catch {
      return;
    }

    fs.promises.unlink(path.resolve(uploadConfig.uploadsFolder, filename));
  }
}

export default DiskStorageProvider;
