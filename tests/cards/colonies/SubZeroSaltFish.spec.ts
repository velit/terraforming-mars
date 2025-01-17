import {expect} from 'chai';
import {SubZeroSaltFish} from '../../../src/server/cards/colonies/SubZeroSaltFish';
import {Game} from '../../../src/server/Game';
import {Resources} from '../../../src/common/Resources';
import {TestPlayer} from '../../TestPlayer';
import {runAllActions, setTemperature} from '../../TestingUtils';
import {testGame} from '../../TestGame';

describe('SubZeroSaltFish', function() {
  let card: SubZeroSaltFish;
  let player: TestPlayer;
  let player2: TestPlayer;
  let game: Game;

  beforeEach(function() {
    card = new SubZeroSaltFish();
    [game, player, player2] = testGame(2);
  });

  it('Can not play if no one has plant production', function() {
    setTemperature(game, 2);
    expect(player.simpleCanPlay(card)).is.not.true;
  });

  it('Can not play if temperature requirement not met', function() {
    player2.production.add(Resources.PLANTS, 1);
    expect(player.simpleCanPlay(card)).is.not.true;
  });

  it('Should play', function() {
    setTemperature(game, 2);
    player2.production.add(Resources.PLANTS, 1);
    expect(player.simpleCanPlay(card)).is.true;

    card.play(player);
    player.addResourceTo(card, 5);
    expect(card.getVictoryPoints(player)).to.eq(2);
  });

  it('Should act', function() {
    card.action(player);
    runAllActions(game);
    expect(card.resourceCount).to.eq(1);
  });
});
