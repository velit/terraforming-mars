import {expect} from 'chai';
import {VoteOfNoConfidence} from '../../../src/server/cards/turmoil/VoteOfNoConfidence';
import {PartyName} from '../../../src/common/turmoil/PartyName';
import {runAllActions, testGameOptions} from '../../TestingUtils';
import {isPlayerId, PlayerId} from '../../../src/common/Types';
import {testGame} from '../../TestGame';

describe('VoteOfNoConfidence', function() {
  it('Should play', function() {
    const card = new VoteOfNoConfidence();
    const [game, player] = testGame(1, testGameOptions({turmoilExtension: true}));
    const turmoil = game.turmoil!;
    expect(player.simpleCanPlay(card)).is.not.true;

    turmoil.chairman = 'NEUTRAL';
    expect(player.simpleCanPlay(card)).is.not.true;

    const greens = game.turmoil!.getPartyByName(PartyName.GREENS);
    greens.partyLeader = player.id;
    expect(player.simpleCanPlay(card)).is.true;

    card.play(player);
    expect(isPlayerId(turmoil.chairman)).is.true;
    expect(game.getPlayerById(turmoil.chairman as PlayerId)).to.eq(player);
    runAllActions(game);
    expect(player.getTerraformRating()).to.eq(15);
  });

  it('Neutral Delegate returns to Reserve', function() {
    const card = new VoteOfNoConfidence();
    const [game, player] = testGame(1, testGameOptions({turmoilExtension: true}));
    const turmoil = game.turmoil!;
    const neutralReserve = turmoil.getAvailableDelegateCount('NEUTRAL');
    turmoil.chairman = 'NEUTRAL';
    const greens = game.turmoil!.getPartyByName(PartyName.GREENS);
    greens.partyLeader = player.id;
    card.play(player);
    runAllActions(game);
    expect(turmoil.getAvailableDelegateCount('NEUTRAL')).to.eq(neutralReserve+1);
  });
});
