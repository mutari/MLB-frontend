import { writable } from 'svelte/store';

export const data = writable({});

export const selectedMenuItem = writable({});

export const state = writable('show');

export const popUpState = writable('none');

export const user = writable({});