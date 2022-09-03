import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card2} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class Algae extends Card2 implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.ALGAE,
      tags: [Tag.PLANT],
      cost: 10,
      productionBox: {plants: 2},

      requirements: CardRequirements.builder((b) => b.oceans(5)),
      metadata: {
        description: 'Requires 5 ocean tiles. Gain 1 Plant and increase your Plant production 2 steps.',
        cardNumber: '047',
        renderData: CardRenderer.builder((b) => b.production((pb) => pb.plants(2)).plants(1)),
      },
    });
  }
  public override bespokePlay(player: Player) {
    player.plants++;
    return undefined;
  }
}