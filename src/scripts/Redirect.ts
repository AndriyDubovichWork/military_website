import { Behaviour } from '@needle-tools/engine';

export class Redirect extends Behaviour {
	redirect() {
		window.open('https://fightforua.org/');
	}
}
