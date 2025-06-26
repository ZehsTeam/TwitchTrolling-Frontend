// --- ENEMY CARD IMAGES ---
import RandomEnemy from '$lib/assets/cards/random.png';
import AggroBeacon from '$lib/assets/empty.png';
import Animal from '$lib/assets/cards/enemies/Animal.png';
import ApexPredator from '$lib/assets/cards/enemies/Apex Predator.png';
import Banger from '$lib/assets/cards/enemies/Banger.png';
import Bowtie from '$lib/assets/cards/enemies/Bowtie.png';
import Chef from '$lib/assets/cards/enemies/Chef.png';
import Clown from '$lib/assets/cards/enemies/Clown.png';
import Driller from '$lib/assets/cards/enemies/Driller.png';
import FreddyFazbear from '$lib/assets/cards/enemies/Freddy Fazbear.png';
import Gnome from '$lib/assets/cards/enemies/Gnome.png';
import Gusher from '$lib/assets/cards/enemies/Gusher.png';
import Headman from '$lib/assets/cards/enemies/Headman.png';
import Hidden from '$lib/assets/cards/enemies/Hidden.png';
import Huntsman from '$lib/assets/cards/enemies/Huntsman.png';
import Mentalist from '$lib/assets/cards/enemies/Mentalist.png';
import Peeper from '$lib/assets/cards/enemies/Peeper.png';
import Reaper from '$lib/assets/cards/enemies/Reaper.png';
import Robe from '$lib/assets/cards/enemies/Robe.png';
import Rugrat from '$lib/assets/cards/enemies/Rugrat.png';
import ShadowChild from '$lib/assets/cards/enemies/Shadow Child.png';
import Spewer from '$lib/assets/cards/enemies/Spewer.png';
import Trudge from '$lib/assets/cards/enemies/Trudge.png';
import Upscream from '$lib/assets/cards/enemies/Upscream.png';
import Zombie from '$lib/assets/cards/enemies/Zombie.png';
import Puppet from '$lib/assets/cards/enemies/Puppet.png';
import Voodoo from '$lib/assets/cards/enemies/Voodoo.png';
import WeepingAngel from '$lib/assets/cards/enemies/Weeping Angel.png';
import Roaster from '$lib/assets/cards/enemies/Roaster.png';
import LostDroid from '$lib/assets/cards/enemies/Lost droid.gif';
import Soldier from '$lib/assets/cards/enemies/Soldier.png';
import LostDestroyer from '$lib/assets/cards/enemies/Lost Destroyer.gif';

// --- EVENT CARD IMAGES ---
import RandomEvent from '$lib/assets/cards/random.png';
import AnimalCrate from '$lib/assets/cards/events/Animal Crate.png';
import Bottle from '$lib/assets/cards/events/Bottle.png';
import ChompBook from '$lib/assets/cards/events/Chomp Book.png';
import ClownEvent from '$lib/assets/cards/events/Clown.png';
import DuctTapedGrenades from '$lib/assets/cards/events/Duct Taped Grenades.png';
import DumgolfsStaff from '$lib/assets/cards/events/Wizard Dumgolfs Staff.png';
import Fan from '$lib/assets/cards/events/Fan.png';
import Flamethrower from '$lib/assets/cards/events/Arctic Flamethrower.png';
import Frog from '$lib/assets/cards/events/Frog.png';
import IceSaw from '$lib/assets/cards/events/Ice Saw.png';
import Minefield from '$lib/assets/cards/events/Explosive Mine.png';
import PlayerSpeed from '$lib/assets/cards/events/Sprint Speed Upgrade.png';
import PropaneTank from '$lib/assets/cards/events/Arctic Propane Tank.png';
import Psycho from '$lib/assets/cards/events/Psycho.png';
import RollDrone from '$lib/assets/cards/events/Roll Drone.png';
import RubberDuck from '$lib/assets/cards/events/Rubber Duck.png';
import ZeroGravityOrb from '$lib/assets/cards/events/Zero Gravity Orb.png';

// --- IMAGE MAPS ---
export const enemyImageMap: Record<string, string> = {
	'Random Enemy': RandomEnemy,
	Animal: Animal,
	'Apex Predator': ApexPredator,
	Banger: Banger,
	Bowtie: Bowtie,
	Chef: Chef,
	Clown: Clown,
	Driller: Driller,
	'Freddy Fazbear': FreddyFazbear,
	Gnome: Gnome,
	Gusher: Gusher,
	Headman: Headman,
	Hidden: Hidden,
	Huntsman: Huntsman,
	Mentalist: Mentalist,
	Peeper: Peeper,
	Reaper: Reaper,
	Robe: Robe,
	Rugrat: Rugrat,
	'Shadow Child': ShadowChild,
	Spewer: Spewer,
	Trudge: Trudge,
	Upscream: Upscream,
	Zombie: Zombie,
	Puppet: Puppet,
	Voodoo: Voodoo,
	'Weeping Angel': WeepingAngel,
	Roaster: Roaster,
	'Lost droid': LostDroid,
	Soldier: Soldier,
	'Lost Destroyer': LostDestroyer
};

export const eventImageMap: Record<string, string> = {
	'Random Event': RandomEvent,
	'Aggro Beacon': AggroBeacon,
	'Animal Crate': AnimalCrate,
	Bottle: Bottle,
	'Chomp Book': ChompBook,
	Clown: ClownEvent,
	'Duct Taped Grenades': DuctTapedGrenades,
	'Dumgolfs Staff': DumgolfsStaff,
	Fan: Fan,
	Flamethrower: Flamethrower,
	Frog: Frog,
	'Ice Saw': IceSaw,
	Minefield: Minefield,
	'Player Speed': PlayerSpeed,
	'Propane Tank': PropaneTank,
	Psycho: Psycho,
	'Roll Drone': RollDrone,
	'Rubber Duck': RubberDuck,
	'Zero Gravity Orb': ZeroGravityOrb
};
