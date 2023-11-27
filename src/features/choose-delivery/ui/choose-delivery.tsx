import { Dropdown } from '../../../shared/ui/dropdown';
import classes from './choose-delivery.module.sass';

export const ChooseDelivery = (): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <p>
        <span className={classes.bold}>
          Рассчитайте цену под заказ из Китая
        </span>

        <br/>и сравните условия «под ключ» по каждой комплектации автомобиля
      </p>

      <div className={classes.controls}>
        <Dropdown current={undefined} placeholder='Страна получения авто' list={['Россия']} />
        <Dropdown current={undefined} placeholder='Город получения авто' list={['Москва']} />
      </div>

      <button className={classes.button}>Быстрый онлайн-расчет под ключ</button>

      <p className={classes.small}>
        Нажимая кнопку, даю согласие на обработку моих персональных данных в соответствии с политикой конфиденциальности
      </p>
    </div>
  )
}
