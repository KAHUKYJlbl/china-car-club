import { ContactType } from "../types";

export const getPriorityContact = <T extends true | false>(contacts: ContactType[], isPriority: T): T extends true ? ContactType : ContactType[] => {
  return isPriority
  ? (contacts.find(contact => contact.priority) || contacts[0]) as T extends true ? ContactType : ContactType[]
  : contacts.filter(contact => !contact.priority) as T extends true ? ContactType : ContactType[]
};
