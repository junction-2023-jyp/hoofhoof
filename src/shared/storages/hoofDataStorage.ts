import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

export type HoofData = {
  deletedMailCount: number;
};

type HoofStorage = BaseStorage<HoofData> & {
  increaseDeletedMailCount: (count: number) => void;
};

const storage = createStorage<HoofData>(
  'hoof-data-storage-key',
  { deletedMailCount: 0 },
  {
    storageType: StorageType.Local,
  },
);

const hoofDataStorage: HoofStorage = {
  ...storage,

  increaseDeletedMailCount: (count: number) => {
    storage.set(currentData => {
      return {
        ...currentData,
        deletedMailCount: currentData.deletedMailCount + count,
      };
    });
  },
};

export default hoofDataStorage;
