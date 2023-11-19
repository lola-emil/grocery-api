import bcrypt from "bcrypt";


export async function encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, encrypted) => {
            if (err) reject(err);
            resolve(encrypted);
        });
    });
}

export async function comparePassword(hashedPassword: string, password: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, same) => {
            if (err) reject(err);
            resolve(same);
        });
    });
}