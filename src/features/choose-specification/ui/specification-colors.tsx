import cn from "classnames";

import classes from "./specification-colors.module.sass";

type SpecificationColorsProps = {};

export const SpecificationColors = ({}: SpecificationColorsProps) => {
  return (
    <>
      <div className={classes.wrapper}>
        <h3 className={cn(classes.header, classes.bold)}>
          Выберите предпочтительные
          <br />
          цвета кузова и салона
        </h3>

        <p>Показаны только те цвета, которые доступны для вашего автомобиля и комплектации</p>
      </div>

      <div className={classes.wrapper}>
        <p className={classes.header}>Доступные цвета кузова:</p>
        <ul className={classes.radio}>
          <li>
            <label>
              <div className={classes.checkbox}>
                <input
                  type="radio"
                  className="visually-hidden"
                  value="1"
                  name="bodyColor"
                />
              </div>

              <div className={classes.colorInfo}>
                <p className={classes.colorName}>Космический черный метеорит металлик глосс</p>
                <div className={classes.color}>
                  <div style={{ backgroundColor: "#000000" }}></div>
                  <div style={{ backgroundColor: "#000000" }}></div>
                </div>
                <p className={classes.colorPrice}>10 196 ¥ • 112 615 ₽</p>
              </div>

              <img
                src="images/car.jpg"
                alt="Car"
                width="60"
                height="60"
              />
            </label>
          </li>
          <li>
            <label>
              <div className={classes.checkbox}>
                <input
                  type="radio"
                  className="visually-hidden"
                  value="1"
                  name="bodyColor"
                />
              </div>

              <div className={classes.colorInfo}>
                <p className={classes.colorName}>Белая буря</p>
                <div className={classes.color}>
                  <div style={{ backgroundColor: "#ffffff" }}></div>
                  <div style={{ backgroundColor: "#ffffff" }}></div>
                </div>
                <p className={classes.colorPrice}>Бесплатно</p>
              </div>

              <img
                src="images/2.jpg"
                alt="Car"
                width="60"
                height="60"
              />
            </label>
          </li>
          <li>
            <label className={classes.checked}>
              <div className={classes.checked}>
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#checked" />
                </svg>

                <input
                  type="radio"
                  className="visually-hidden"
                  value="1"
                  name="bodyColor"
                />
              </div>

              <div className={classes.colorInfo}>
                <p className={classes.colorName}>Зелено-серый</p>
                <div className={classes.color}>
                  <div style={{ backgroundColor: "#185454" }}></div>
                  <div style={{ backgroundColor: "#9CA3AC" }}></div>
                </div>
                <p className={classes.colorPrice}>10 196 ¥ • 112 615 ₽</p>
              </div>

              <img
                src="images/car.jpg"
                alt="Car"
                width="60"
                height="60"
              />
            </label>
          </li>
          <li>
            <label>
              <div className={classes.checkbox}>
                <input
                  type="radio"
                  className="visually-hidden"
                  value="1"
                  name="bodyColor"
                />
              </div>

              <div className={classes.colorInfo}>
                <p className={classes.colorName}>藍色</p>
                <div className={classes.color}>
                  <div style={{ backgroundColor: "#49749C" }}></div>
                  <div style={{ backgroundColor: "#49749C" }}></div>
                </div>
                <p className={classes.colorPrice}>10 196 ¥ • 112 615 ₽</p>
              </div>

              <img
                src="images/car.jpg"
                alt="Car"
                width="60"
                height="60"
              />
            </label>
          </li>
          <li>
            <label>
              <div className={classes.checkbox}>
                <input
                  type="radio"
                  className="visually-hidden"
                  value="1"
                  name="bodyColor"
                />
              </div>

              <div className={classes.colorInfo}>
                <p className={classes.colorName}>孔雀石</p>
                <div className={classes.color}>
                  <div style={{ backgroundColor: "#DB2121" }}></div>
                  <div style={{ backgroundColor: "#DB2121" }}></div>
                </div>
                <p className={classes.colorPrice}>10 196 ¥ • 112 615 ₽</p>
              </div>

              <img
                src="images/2.jpg"
                alt="Car"
                width="60"
                height="60"
              />
            </label>
          </li>
        </ul>
      </div>

      <div className={classes.wrapper}>
        <p className={classes.subheader}>Доступные цвета салона:</p>
        <ul className={classes.radio}>
          <li>
            <label>
              <div className={classes.checkbox}>
                <input
                  type="radio"
                  className="visually-hidden"
                  value="1"
                  name="bodyColor"
                />
              </div>

              <div className={classes.colorInfo}>
                <p className={classes.colorName}>棕 / 黑</p>
                <div className={classes.color}>
                  <div style={{ backgroundColor: "#787173" }}></div>
                  <div style={{ backgroundColor: "#ffffff" }}></div>
                </div>
                <p className={classes.colorPrice}>Бесплатно</p>
              </div>

              <img
                src="images/car.jpg"
                alt="Car"
                width="60"
                height="60"
              />
            </label>
          </li>
          <li>
            <label className={classes.checked}>
              <div className={cn(classes.checked)}>
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#checked" />
                </svg>

                <input
                  type="radio"
                  className="visually-hidden"
                  value="1"
                  name="bodyColor"
                />
              </div>

              <div className={classes.colorInfo}>
                <p className={classes.colorName}>Черный</p>
                <div className={classes.color}>
                  <div style={{ backgroundColor: "#000000" }}></div>
                  <div style={{ backgroundColor: "#000000" }}></div>
                </div>
                <p className={classes.colorPrice}>10 196 ¥ • 112 615 ₽</p>
              </div>

              <img
                src="images/2.jpg"
                alt="Car"
                width="60"
                height="60"
              />
            </label>
          </li>
        </ul>
      </div>
    </>
  );
};
