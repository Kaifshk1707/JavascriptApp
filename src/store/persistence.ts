import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from './store';

const APP_STATE_STORAGE_KEY = '@codepath/app-state/v1';

type PersistedState = Pick<RootState, 'cameraGallery' | 'learningProgress'>;

const pickPersistedState = (state: RootState): PersistedState => ({
  cameraGallery: state.cameraGallery,
  learningProgress: state.learningProgress,
});

export const loadPersistedState = async (): Promise<Partial<RootState> | undefined> => {
  const rawState = await AsyncStorage.getItem(APP_STATE_STORAGE_KEY);

  if (!rawState) {
    return undefined;
  }

  return JSON.parse(rawState) as Partial<RootState>;
};

export const savePersistedState = async (state: RootState) => {
  await AsyncStorage.setItem(
    APP_STATE_STORAGE_KEY,
    JSON.stringify(pickPersistedState(state)),
  );
};
