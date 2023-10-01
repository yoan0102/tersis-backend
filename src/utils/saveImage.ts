import fs from 'node:fs'

export const saveImage = (file: any) => {
    const newPath = `./uploads/tracks/${file.originalname}`
    fs.renameSync(file.path, newPath)
    return newPath
}
