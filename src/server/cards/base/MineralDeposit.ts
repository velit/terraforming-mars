import {IProjectCard} from '../IProjectCard';
import {Card2} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class MineralDeposit extends Card2 implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.MINERAL_DEPOSIT,
      cost: 5,

      metadata: {
        cardNumber: '062',
        renderData: CardRenderer.builder((b) => b.steel(5, {digit})),
        description: 'Gain 5 steel.',
      },
    });
  }

  public override bespokePlay(player: Player) {
    player.steel += 5;
    return undefined;
  }
}