export default class User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    lastChangeDate: Date;
    numberAttemps: number;
    isLocked: boolean;
    isActive: boolean;
    role: string;

    constructor() {
    }
}