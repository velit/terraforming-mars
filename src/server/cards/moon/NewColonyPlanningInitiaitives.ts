import {CardName} from '../../../common/cards/CardName';
import {Player} from '../../Player';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {MoonExpansion} from '../../moon/MoonExpansion';
import {CardRequirements} from '../CardRequirements';
import {Card2} from '../Card';
import {IProjectCard} from '../IProjectCard';

export class NewColonyPlanningInitiaitives extends Card2 implements IProjectCard {
  constructor() {
    super({
      name: CardName.NEW_COLONY_PLANNING_INITIAITIVES,
      cardType: CardType.AUTOMATED,
      cost: 6,
      tr: {moonColony: 1},

      requirements: CardRequirements.builder((b) => b.colonyRate(2)),
      metadata: {
        description: 'Requires Colony Rate to be 2 or higher. Raise the Colony Rate 1 step.',
        cardNumber: 'M31',
        renderData: CardRenderer.builder((b) => {
          b.moonColonyRate();
        }),
      },
    });
  }

  public override bespokePlay(player: Player) {
    MoonExpansion.raiseColonyRate(player);
    return undefined;
  }
}