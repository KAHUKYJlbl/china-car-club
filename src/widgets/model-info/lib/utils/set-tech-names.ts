import { TECH_NAMES } from '../const';
import { Entrytype, TechType } from '../types';

const setTechNames = (entries: Entrytype[]): TechType[] => {
  return entries.map((tech) => ({
    name: TECH_NAMES[tech[0]].name,
    value: tech[1],
    measure: TECH_NAMES[tech[0]].measure,
  }));
}

export default setTechNames;
