import classes from './supplier.module.sass';

type SupplierProps = {};

export const Supplier = ({}: SupplierProps) => {
  return (
    <div className={classes.wrapper}>
      <div>
        <p className={classes.header}>
          Уже готовы выбрать поставщика автомобиля или пока думаете?
        </p>

        <p className={classes.subheader}>
          Выберите наиболее близкий вариант
        </p>
      </div>

      <ul>
        <li>
          <label className={classes.checked}>
            <div className={classes.checked}>
              <svg
                width='20'
                height='20'
                aria-hidden="true"
              >
                <use xlinkHref="#checked" />
              </svg>

              <input type='radio' className='visually-hidden'/>
            </div>

            Знаю какую машину хочу, выбираю поставщика
          </label>
        </li>

        <li>
          <label>
            <div>
              <input type='radio' className='visually-hidden'/>
            </div>

            Ещё думаю, есть вопросы по&nbsp;выбору машины
          </label>
        </li>

        <li>
          <label>
            <div>
              <input type='radio' className='visually-hidden'/>
            </div>

            Ещё думаю, посмотрю предложения и&nbsp;решу
          </label>
        </li>

        <li>
          <label>
            <div>
              <input type='radio' className='visually-hidden'/>
            </div>

            Сейчас не&nbsp;ищу поставщика, но&nbsp;прицениваюсь на&nbsp;будущее
          </label>
        </li>

        <li>
          <label>
            <div>
              <input type='radio' className='visually-hidden'/>
            </div>

            Просто смотрю, покупать не&nbsp;планирую
          </label>
        </li>

        <li>
          <label>
            <div>
              <input type='radio' className='visually-hidden'/>
            </div>

            Я перепродаю машины, хочу сравнить цены
          </label>
        </li>
      </ul>
    </div>
  );
};
