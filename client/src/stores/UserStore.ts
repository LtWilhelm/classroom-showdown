import { writable } from "svelte/store";
import { User } from "../models/User";

export const USER_STORE = writable<User>(new User());
