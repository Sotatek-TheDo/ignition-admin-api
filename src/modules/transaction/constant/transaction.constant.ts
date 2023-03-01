export enum ETransactionStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum ETransactionType {
  APPROVE = 'approve',
  NFT_SALE = 'nft_sale',
  NTF_FARM = 'ntf_farm',
  CREATE_COLLECTION = 'create_collection',
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}
