export type UserType = {
  hash: string;
}

export type SmsFormType = {
  msisdn: string;
}

export type SmsType = SmsFormType & {
  provider: string,
	hash: string,
}

export type ConfirmFormType = {
  pin: string,
}

export type ConfirmType = ConfirmFormType & {
  hash: string,
}

export type TokenType = {
  token: string;
}
