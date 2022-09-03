import {CardName} from '../../../common/cards/CardName';
import {Player} from '../../Player';
import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {MoonExpansion} from '../../moon/MoonExpansion';
import {CardRenderer} from '../render/CardRenderer';
import {TileType} from '../../../common/TileType';
import {Card2} from '../Card';

export class LunarDustProcessingPlant extends Card2 implements IProjectCard {
  constructor() {
    super({
      name: CardName.LUNAR_DUST_PROCESSING_PLANT,
      cardType: CardType.ACTIVE,
      tags: [Tag.BUILDING],
      cost: 6,
      reserveUnits: {titanium: 1},
      tr: {moonLogistics: 1},

      metadata: {
        description: 'Spend 1 titanium. Raise the Logistic Rate 1 step.',
        cardNumber: 'M17',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you place a road tile on the Moon, you spend no steel on it.', (eb) => {
            eb.startEffect.tile(TileType.MOON_ROAD, false).colon().text('0').steel(1);
          }).br;
          b.minus().titanium(1).moonLogisticsRate();
        }),
      },
    });
  }

  public override bespokePlay(player: Player) {
    MoonExpansion.raiseLogisticRate(player);
    return undefined;
  }
}