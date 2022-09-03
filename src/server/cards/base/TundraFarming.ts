import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card2} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class TundraFarming extends Card2 implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.TUNDRA_FARMING,
      tags: [Tag.PLANT],
      cost: 16,
      victoryPoints: 2,
      productionBox: {plants: 1, megacredits: 2},

      requirements: CardRequirements.builder((b) => b.temperature(-6)),
      metadata: {
        cardNumber: '169',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) =>{
            pb.plants(1).megacredits(2);
          }).plants(1);
        }),
        description: 'Requires -6° C or warmer. Increase your Plant production 1 step and your M€ production 2 steps. Gain 1 Plant.',
      },
    });
  }

  public override bespokePlay(player: Player) {
    player.plants++;
    return undefined;
  }
}