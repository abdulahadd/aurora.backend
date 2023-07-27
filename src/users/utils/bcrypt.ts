import * as bcrypt from 'bcrypt'

export function encodePassword(rawpPassword: string){
    const SALT= bcrypt.genSaltSync();
    return bcrypt.hashSync(rawpPassword,SALT);
}

export function comparePasswords(rawpPassword: string, hash:string){
    return bcrypt.compareSync(rawpPassword, hash);
}