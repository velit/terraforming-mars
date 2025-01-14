import {expect} from 'chai';
import {VenusMagnetizer} from '../../../src/server/cards/venusNext/VenusMagnetizer';
import {Game} from '../../../src/server/Game';
import {Resources} from '../../../src/common/Resources';
import {TestPlayer} from '../../TestPlayer';
import {setVenusScaleLevel} from '../../TestingUtils';
import {testGame} from '../../TestGame';

describe('VenusMagnetizer', function() {
  let card: VenusMagnetizer;
  let player: TestPlayer;
  let game: Game;

  beforeEach(function() {
    card = new VenusMagnetizer();
    [game, player] = testGame(2);
  });

  it('Can not play', function() {
    setVenusScaleLevel(game, 8);
    expect(player.simpleCanPlay(card)).is.not.true;
  });

  it('Should play', function() {
    setVenusScaleLevel(game, 10);
    expect(player.simpleCanPlay(card)).is.true;
    expect(card.play(player)).is.undefined;
  });

  it('Should act', function() {
    player.production.add(Resources.ENERGY, 2);
    player.playedCards.push(card);

    card.action(player);
    expect(player.production.energy).to.eq(1);
    expect(game.getVenusScaleLevel()).to.eq(2);
  });
});
