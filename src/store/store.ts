import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  cameraGalleryReducer,
  hydrateCameraGallery,
} from './cameraGallerySlice';
import {
  hydrateLearningProgress,
  learningProgressReducer,
} from './learningProgressSlice';

export const store = configureStore({
  reducer: {
    cameraGallery: cameraGalleryReducer,
    learningProgress: learningProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const hydrateStore = (state?: Partial<RootState>) => {
  store.dispatch(hydrateCameraGallery(state?.cameraGallery));
  store.dispatch(hydrateLearningProgress(state?.learningProgress));
};
