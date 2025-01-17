import {expect} from 'chai';
import {BiomassCombustors} from '../../../src/server/cards/base/BiomassCombustors';
import {Game} from '../../../src/server/Game';
import {TestPlayer} from '../../TestPlayer';
import {Resources} from '../../../src/common/Resources';
import {runAllActions, setOxygenLevel} from '../../TestingUtils';
import {testGame} from '../../TestGame';

describe('BiomassCombustors', function() {
  let card: BiomassCombustors;
  let player: TestPlayer;
  let player2: TestPlayer;
  let game: Game;

  beforeEach(function() {
    card = new BiomassCombustors();
    [game, player, player2] = testGame(2);
  });

  it('Cannot play if oxygen requirement not met', function() {
    player2.production.add(Resources.PLANTS, 1);
    expect(player.simpleCanPlay(card)).is.not.true;
  });

  it('Cannot play if no one has plant production', function() {
    setOxygenLevel(game, 6);
    expect(player.simpleCanPlay(card)).is.not.true;
  });

  it('Can play in solo mode if oxygen requirement is met', function() {
    const game = Game.newInstance('gameid', [player], player);
    setOxygenLevel(game, 6);
    expect(player.simpleCanPlay(card)).is.true;
  });

  it('Should play', function() {
    setOxygenLevel(game, 6);
    player2.production.add(Resources.PLANTS, 1);
    expect(player.simpleCanPlay(card)).is.true;

    card.play(player);
    runAllActions(game);
    expect(player.popWaitingFor()).is.undefined;
    expect(player.production.energy).to.eq(2);
    expect(player2.production.plants).to.eq(0);

    expect(card.getVictoryPoints(player)).to.eq(-1);
  });
});
