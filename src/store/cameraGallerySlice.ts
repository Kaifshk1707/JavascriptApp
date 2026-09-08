import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CapturedPhoto = {
  id: string;
  uri: string;
  path: string;
  width: number;
  height: number;
  capturedAt: string;
};

export type CameraGalleryState = {
  photos: CapturedPhoto[];
};

const initialState: CameraGalleryState = {
  photos: [],
};

const cameraGallerySlice = createSlice({
  name: 'cameraGallery',
  initialState,
  reducers: {
    hydrateCameraGallery: (
      state,
      action: PayloadAction<Partial<CameraGalleryState> | undefined>,
    ) => {
      state.photos = action.payload?.photos ?? [];
    },
    addCapturedPhoto: (state, action: PayloadAction<CapturedPhoto>) => {
      state.photos.unshift(action.payload);
    },
    removeCapturedPhoto: (state, action: PayloadAction<string>) => {
      state.photos = state.photos.filter((photo) => photo.id !== action.payload);
    },
    clearCapturedPhotos: (state) => {
      state.photos = [];
    },
  },
});

export const {
  addCapturedPhoto,
  clearCapturedPhotos,
  hydrateCameraGallery,
  removeCapturedPhoto,
} = cameraGallerySlice.actions;

export const cameraGalleryReducer = cameraGallerySlice.reducer;
