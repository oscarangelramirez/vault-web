import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import User from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {
    adapt(item: any): User {
        let user = new User();
        user.id = item.id;
        user.name = item.name;
        user.lastName = item.lastName;
        user.email = item.email;
        user.lastChangeDate = new Date(item.lastChangeDate);
        user.numberAttemps = item.numberAttemps;
        user.isLocked = item.isLocked;
        user.isActive = item.isActive;
        user.role = item.role;

        return user;
    }
}