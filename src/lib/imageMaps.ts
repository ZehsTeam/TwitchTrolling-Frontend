// --- ENEMY CARD IMAGES ---
import RandomEnemy from '$lib/media/repo/cards/random.png';
import AggroBeacon from '$lib/media/empty.png';
import Animal from '$lib/media/repo/cards/enemies/Animal.png';
import ApexPredator from '$lib/media/repo/cards/enemies/Apex Predator.png';
import Banger from '$lib/media/repo/cards/enemies/Banger.png';
import Bowtie from '$lib/media/repo/cards/enemies/Bowtie.png';
import Chef from '$lib/media/repo/cards/enemies/Chef.png';
import Clown from '$lib/media/repo/cards/enemies/Clown.png';
import Driller from '$lib/media/repo/cards/enemies/Driller.png';
import FreddyFazbear from '$lib/media/repo/cards/enemies/Freddy Fazbear.png';
import Gnome from '$lib/media/repo/cards/enemies/Gnome.png';
import Gusher from '$lib/media/repo/cards/enemies/Gusher.png';
import Headman from '$lib/media/repo/cards/enemies/Headman.png';
import Hidden from '$lib/media/repo/cards/enemies/Hidden.png';
import Huntsman from '$lib/media/repo/cards/enemies/Huntsman.png';
import Mentalist from '$lib/media/repo/cards/enemies/Mentalist.png';
import Peeper from '$lib/media/repo/cards/enemies/Peeper.png';
import Reaper from '$lib/media/repo/cards/enemies/Reaper.png';
import Robe from '$lib/media/repo/cards/enemies/Robe.png';
import Rugrat from '$lib/media/repo/cards/enemies/Rugrat.png';
import ShadowChild from '$lib/media/repo/cards/enemies/Shadow Child.png';
import Spewer from '$lib/media/repo/cards/enemies/Spewer.png';
import Trudge from '$lib/media/repo/cards/enemies/Trudge.png';
import Upscream from '$lib/media/repo/cards/enemies/Upscream.png';
import Zombie from '$lib/media/repo/cards/enemies/Zombie.png';
import Puppet from '$lib/media/repo/cards/enemies/Puppet.png';
import Voodoo from '$lib/media/repo/cards/enemies/Voodoo.png';
import WeepingAngel from '$lib/media/repo/cards/enemies/Weeping Angel.png';
import Roaster from '$lib/media/repo/cards/enemies/Roaster.png';
import LostDroid from '$lib/media/repo/cards/enemies/Lost droid.gif';
import Soldier from '$lib/media/repo/cards/enemies/Soldier.png';
import LostDestroyer from '$lib/media/repo/cards/enemies/Lost Destroyer.gif';

// --- EVENT CARD IMAGES ---
import RandomEvent from '$lib/media/repo/cards/random.png';
import AnimalCrate from '$lib/media/repo/cards/events/Animal Crate.png';
import Bottle from '$lib/media/repo/cards/events/Bottle.png';
import ChompBook from '$lib/media/repo/cards/events/Chomp Book.png';
import ClownEvent from '$lib/media/repo/cards/events/Clown.png';
import DuctTapedGrenades from '$lib/media/repo/cards/events/Duct Taped Grenades.png';
import DumgolfsStaff from '$lib/media/repo/cards/events/Wizard Dumgolfs Staff.png';
import Fan from '$lib/media/repo/cards/events/Fan.png';
import Flamethrower from '$lib/media/repo/cards/events/Arctic Flamethrower.png';
import Frog from '$lib/media/repo/cards/events/Frog.png';
import IceSaw from '$lib/media/repo/cards/events/Ice Saw.png';
import Minefield from '$lib/media/repo/cards/events/Explosive Mine.png';
import PlayerSpeed from '$lib/media/repo/cards/events/Sprint Speed Upgrade.png';
import PropaneTank from '$lib/media/repo/cards/events/Arctic Propane Tank.png';
import Psycho from '$lib/media/repo/cards/events/Psycho.png';
import RollDrone from '$lib/media/repo/cards/events/Roll Drone.png';
import RubberDuck from '$lib/media/repo/cards/events/Rubber Duck.png';
import ZeroGravityOrb from '$lib/media/repo/cards/events/Zero Gravity Orb.png';

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
