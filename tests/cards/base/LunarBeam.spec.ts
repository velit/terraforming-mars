import {expect} from 'chai';
import {LunarBeam} from '../../../src/server/cards/base/LunarBeam';
import {Resources} from '../../../src/common/Resources';
import {TestPlayer} from '../../TestPlayer';
import {testGame} from '../../TestGame';

describe('LunarBeam', function() {
  let card: LunarBeam;
  let player: TestPlayer;

  beforeEach(function() {
    card = new LunarBeam();
    [/* skipped */, player] = testGame(1);
  });

  it('Can play', function() {
    player.production.add(Resources.MEGACREDITS, -4);
    expect(card.canPlay(player)).is.not.true;

    player.production.add(Resources.MEGACREDITS, 1);
    expect(card.canPlay(player)).is.true;
  });

  it('Should play', function() {
    card.play(player);
    expect(player.production.megacredits).to.eq(-2);
    expect(player.production.heat).to.eq(2);
    expect(player.production.energy).to.eq(2);
  });
});
