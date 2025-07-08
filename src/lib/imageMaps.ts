// --- ENEMY CARD IMAGES ---
import RandomEnemy from '$lib/media/cards/random.png';
import AggroBeacon from '$lib/media/empty.png';
import Animal from '$lib/media/cards/enemies/Animal.png';
import ApexPredator from '$lib/media/cards/enemies/Apex Predator.png';
import Banger from '$lib/media/cards/enemies/Banger.png';
import Bowtie from '$lib/media/cards/enemies/Bowtie.png';
import Chef from '$lib/media/cards/enemies/Chef.png';
import Clown from '$lib/media/cards/enemies/Clown.png';
import Driller from '$lib/media/cards/enemies/Driller.png';
import FreddyFazbear from '$lib/media/cards/enemies/Freddy Fazbear.png';
import Gnome from '$lib/media/cards/enemies/Gnome.png';
import Gusher from '$lib/media/cards/enemies/Gusher.png';
import Headman from '$lib/media/cards/enemies/Headman.png';
import Hidden from '$lib/media/cards/enemies/Hidden.png';
import Huntsman from '$lib/media/cards/enemies/Huntsman.png';
import Mentalist from '$lib/media/cards/enemies/Mentalist.png';
import Peeper from '$lib/media/cards/enemies/Peeper.png';
import Reaper from '$lib/media/cards/enemies/Reaper.png';
import Robe from '$lib/media/cards/enemies/Robe.png';
import Rugrat from '$lib/media/cards/enemies/Rugrat.png';
import ShadowChild from '$lib/media/cards/enemies/Shadow Child.png';
import Spewer from '$lib/media/cards/enemies/Spewer.png';
import Trudge from '$lib/media/cards/enemies/Trudge.png';
import Upscream from '$lib/media/cards/enemies/Upscream.png';
import Zombie from '$lib/media/cards/enemies/Zombie.png';
import Puppet from '$lib/media/cards/enemies/Puppet.png';
import Voodoo from '$lib/media/cards/enemies/Voodoo.png';
import WeepingAngel from '$lib/media/cards/enemies/Weeping Angel.png';
import Roaster from '$lib/media/cards/enemies/Roaster.png';
import LostDroid from '$lib/media/cards/enemies/Lost droid.gif';
import Soldier from '$lib/media/cards/enemies/Soldier.png';
import LostDestroyer from '$lib/media/cards/enemies/Lost Destroyer.gif';

// --- EVENT CARD IMAGES ---
import RandomEvent from '$lib/media/cards/random.png';
import AnimalCrate from '$lib/media/cards/events/Animal Crate.png';
import Bottle from '$lib/media/cards/events/Bottle.png';
import ChompBook from '$lib/media/cards/events/Chomp Book.png';
import ClownEvent from '$lib/media/cards/events/Clown.png';
import DuctTapedGrenades from '$lib/media/cards/events/Duct Taped Grenades.png';
import DumgolfsStaff from '$lib/media/cards/events/Wizard Dumgolfs Staff.png';
import Fan from '$lib/media/cards/events/Fan.png';
import Flamethrower from '$lib/media/cards/events/Arctic Flamethrower.png';
import Frog from '$lib/media/cards/events/Frog.png';
import IceSaw from '$lib/media/cards/events/Ice Saw.png';
import Minefield from '$lib/media/cards/events/Explosive Mine.png';
import PlayerSpeed from '$lib/media/cards/events/Sprint Speed Upgrade.png';
import PropaneTank from '$lib/media/cards/events/Arctic Propane Tank.png';
import Psycho from '$lib/media/cards/events/Psycho.png';
import RollDrone from '$lib/media/cards/events/Roll Drone.png';
import RubberDuck from '$lib/media/cards/events/Rubber Duck.png';
import ZeroGravityOrb from '$lib/media/cards/events/Zero Gravity Orb.png';

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
