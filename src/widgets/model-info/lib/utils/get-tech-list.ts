import { SpecsType } from '../../../../entities/model';

import { ELECTRO, HYBRID, ICE, TECHS_BY_TYPES } from '../const';
import { Entrytype } from '../types';
import setTechNames from './set-tech-names';


const getTechList = (techs: SpecsType) => {
  if ( ELECTRO.includes(techs.engineType) ) {
    return setTechNames(Object.entries(techs)
      .filter((tech) => TECHS_BY_TYPES[tech[0]] && TECHS_BY_TYPES[tech[0] as string].electro)
      .filter((tech) => !!tech[1]) as Entrytype[]
    );
  }

  if ( HYBRID.includes(techs.engineType) ) {
    return setTechNames(Object.entries(techs)
      .filter((tech) => TECHS_BY_TYPES[tech[0]] && TECHS_BY_TYPES[tech[0] as string].hybrid)
      .filter((tech) => !!tech[1]) as Entrytype[]
    );
  }

  if ( ICE.includes(techs.engineType) ) {
    return setTechNames(Object.entries(techs)
      .filter((tech) => TECHS_BY_TYPES[tech[0]] && TECHS_BY_TYPES[tech[0] as string].ice)
      .filter((tech) => !!tech[1]) as Entrytype[]
    );
  }

  return null;
}

export default getTechList;
