import {expect} from 'chai';
import {MagneticFieldDome} from '../../../src/server/cards/base/MagneticFieldDome';
import {Resources} from '../../../src/common/Resources';
import {TestPlayer} from '../../TestPlayer';
import {testGame} from '../../TestGame';

describe('MagneticFieldDome', function() {
  let card: MagneticFieldDome;
  let player: TestPlayer;

  beforeEach(function() {
    card = new MagneticFieldDome();
    [/* skipped */, player] = testGame(2);
  });

  it('Can not play', function() {
    expect(player.simpleCanPlay(card)).is.not.true;
  });

  it('Should play', function() {
    player.production.add(Resources.ENERGY, 2);
    expect(player.simpleCanPlay(card)).is.true;

    card.play(player);
    expect(player.production.energy).to.eq(0);
    expect(player.production.plants).to.eq(1);
    expect(player.getTerraformRating()).to.eq(21);
  });
});
