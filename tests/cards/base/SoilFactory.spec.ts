import {expect} from 'chai';
import {SoilFactory} from '../../../src/server/cards/base/SoilFactory';
import {TestPlayer} from '../../TestPlayer';
import {Resources} from '../../../src/common/Resources';
import {testGame} from '../../TestGame';

describe('SoilFactory', function() {
  let card: SoilFactory;
  let player: TestPlayer;

  beforeEach(function() {
    card = new SoilFactory();
    [/* skipped */, player] = testGame(1);
  });

  it('Can not play', function() {
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', function() {
    player.production.add(Resources.ENERGY, 1);
    expect(card.canPlay(player)).is.true;

    card.play(player);
    expect(player.production.energy).to.eq(0);
    expect(player.production.plants).to.eq(1);

    expect(card.getVictoryPoints(player)).to.eq(1);
  });
});
