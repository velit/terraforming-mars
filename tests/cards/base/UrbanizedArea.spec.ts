import {expect} from 'chai';
import {UrbanizedArea} from '../../../src/server/cards/base/UrbanizedArea';
import {Game} from '../../../src/server/Game';
import {ISpace} from '../../../src/server/boards/ISpace';
import {Resources} from '../../../src/common/Resources';
import {SpaceName} from '../../../src/server/SpaceName';
import {SpaceType} from '../../../src/common/boards/SpaceType';
import {TestPlayer} from '../../TestPlayer';
import {SelectSpace} from '../../../src/server/inputs/SelectSpace';
import {cast} from '../../TestingUtils';
import {testGame} from '../../TestGame';

describe('UrbanizedArea', function() {
  let card: UrbanizedArea;
  let player: TestPlayer;
  let game: Game;
  let lands: ISpace[];

  beforeEach(function() {
    card = new UrbanizedArea();
    [game, player] = testGame(2);

    const tharsisTholus = game.board.getSpace(SpaceName.THARSIS_THOLUS);
    lands = game.board.getAdjacentSpaces(tharsisTholus).filter((space) => space.spaceType === SpaceType.LAND);
  });

  it('Can not play without energy production', function() {
    expect(player.simpleCanPlay(card)).is.not.true;
  });

  it('Can not play without available space between two cities', function() {
    game.addCityTile(player, lands[0]);
    player.production.add(Resources.ENERGY, 1);
    expect(player.simpleCanPlay(card)).is.not.true;
  });

  it('Should play', function() {
    game.addCityTile(player, lands[0]);
    game.addCityTile(player, lands[1]);

    player.production.add(Resources.ENERGY, 1);
    expect(player.simpleCanPlay(card)).is.true;

    const action = cast(card.play(player), SelectSpace);
    expect(action.availableSpaces).has.lengthOf(1);

    action.cb(action.availableSpaces[0]);
    expect(game.getCitiesCount()).to.eq(3);
    expect(player.production.energy).to.eq(0);
    expect(player.production.megacredits).to.eq(2);
  });
});
