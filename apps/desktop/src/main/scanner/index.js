import { ipcMain, dialog } from 'electron';
import * as fs from 'fs/promises';
import * as path from 'path';
export function setupScannerHandlers() {
    ipcMain.handle('scanner:select-directory', async (event) => {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (canceled)
            return null;
        return filePaths[0];
    });
    ipcMain.handle('scanner:scan-directory', async (event, dirPath) => {
        try {
            const files = await fs.readdir(dirPath);
            const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.arw', '.dng'];
            const photos = [];
            for (const file of files) {
                const ext = path.extname(file).toLowerCase();
                if (supportedExtensions.includes(ext)) {
                    const fullPath = path.join(dirPath, file);
                    const stats = await fs.stat(fullPath);
                    photos.push({
                        id: fullPath,
                        filename: file,
                        path: fullPath,
                        size: stats.size,
                        created: stats.birthtimeMs,
                        modified: stats.mtimeMs,
                        type: ext
                    });
                }
            }
            // Sort by newest first
            return photos.sort((a, b) => b.created - a.created);
        }
        catch (error) {
            console.error('Error scanning directory:', error);
            throw error;
        }
    });
}
