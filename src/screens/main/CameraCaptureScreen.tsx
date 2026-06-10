import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  addCapturedPhoto,
  clearCapturedPhotos,
  removeCapturedPhoto,
} from '../../store/cameraGallerySlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

type VisionCameraModule = typeof import('react-native-vision-camera');

type CameraCaptureScreenState = {
  error?: Error;
};

class CameraErrorBoundary extends React.Component<
  { children: React.ReactNode },
  CameraCaptureScreenState
> {
  state: CameraCaptureScreenState = {};

  static getDerivedStateFromError(error: Error): CameraCaptureScreenState {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <UnavailableState
          title="Camera unavailable"
          message="Rebuild the app with VisionCamera native modules enabled."
        />
      );
    }

    return this.props.children;
  }
}

const getVisionCamera = (): VisionCameraModule | undefined => {
  try {
    return require('react-native-vision-camera') as VisionCameraModule;
  } catch {
    return undefined;
  }
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const padTime = (value: number) => String(value).padStart(2, '0');

const formatCaptureTime = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Saved';
  }

  return `${padTime(date.getDate())} ${MONTHS[date.getMonth()]} ${padTime(
    date.getHours(),
  )}:${padTime(date.getMinutes())}`;
};

const UnavailableState = ({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <View style={styles.emptyState}>
    <View style={styles.emptyIcon}>
      <Icon name="camera-outline" size={28} color="#8ECBFF" />
    </View>
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyText}>{message}</Text>
    {actionLabel && onAction ? (
      <TouchableOpacity
        style={styles.permissionButton}
        onPress={onAction}
        activeOpacity={0.9}
      >
        <Icon name="shield-checkmark-outline" size={18} color="#FFFFFF" />
        <Text style={styles.permissionButtonText}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const CameraContent = ({ vision }: { vision: VisionCameraModule }) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const photos = useAppSelector((state) => state.cameraGallery.photos);
  const [isCapturing, setIsCapturing] = React.useState(false);
  const [statusText, setStatusText] = React.useState('Ready');

  const CameraView = vision.Camera;
  const device = vision.useCameraDevice('back');
  const photoOutput = vision.usePhotoOutput({ quality: 0.9 });
  const { canRequestPermission, hasPermission, requestPermission } =
    vision.useCameraPermission();

  React.useEffect(() => {
    if (!hasPermission && canRequestPermission) {
      requestPermission();
    }
  }, [canRequestPermission, hasPermission, requestPermission]);

  const capturePhoto = async () => {
    if (!hasPermission || !device || isCapturing) {
      return;
    }

    try {
      setIsCapturing(true);
      setStatusText('Capturing...');

      const photoFile = await photoOutput.capturePhotoToFile(
        { flashMode: 'off', enableShutterSound: true },
        {},
      );
      const uri = photoFile.filePath.startsWith('file://')
        ? photoFile.filePath
        : `file://${photoFile.filePath}`;

      dispatch(
        addCapturedPhoto({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          uri,
          path: photoFile.filePath,
          width: 0,
          height: 0,
          capturedAt: new Date().toISOString(),
        }),
      );
      setStatusText('Saved');
    } catch (error) {
      setStatusText('Capture failed');
      console.warn('Unable to capture photo', error);
    } finally {
      setIsCapturing(false);
    }
  };

  if (!hasPermission) {
    return (
      <UnavailableState
        title="Camera permission needed"
        message="Allow camera access to capture and save photos."
        actionLabel="Allow Camera"
        onAction={requestPermission}
      />
    );
  }

  if (!device) {
    return (
      <UnavailableState
        title="No camera found"
        message="This device does not expose a back camera."
      />
    );
  }

  return (
    <>
      <View style={styles.previewCard}>
        <CameraView
          style={StyleSheet.absoluteFill}
          device={device}
          outputs={[photoOutput]}
          isActive={isFocused && hasPermission}
          resizeMode="cover"
          enableNativeTapToFocusGesture
          enableNativeZoomGesture
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.04)', 'rgba(0,0,0,0.5)']}
          style={styles.previewOverlay}
        >
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[
            styles.captureButton,
            isCapturing && styles.captureButtonDisabled,
          ]}
          onPress={capturePhoto}
          activeOpacity={0.86}
          disabled={isCapturing}
        >
          {isCapturing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Icon name="camera" size={28} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.galleryHeader}>
        <Text style={styles.sectionTitle}>Saved Photos</Text>
        {photos.length > 0 ? (
          <TouchableOpacity onPress={() => dispatch(clearCapturedPhotos())}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {photos.length === 0 ? (
        <View style={styles.savedEmpty}>
          <Text style={styles.savedEmptyText}>No saved photos yet.</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {photos.map((photo) => (
            <View key={photo.id} style={styles.photoCard}>
              <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
              <View style={styles.photoFooter}>
                <Text style={styles.photoTime}>
                  {formatCaptureTime(photo.capturedAt)}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeCapturedPhoto(photo.id))}
                >
                  <Icon name="trash-outline" size={17} color="#FCA5A5" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export const CameraCaptureScreen: React.FC = () => {
  const vision = React.useMemo(getVisionCamera, []);

  return (
    <LinearGradient
      colors={['#0F1022', '#243B55', '#D35D6E']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Camera</Text>
          <Text style={styles.heroSubtitle}>
            Capture photos and keep them in saved app state.
          </Text>
        </View>

        {vision ? (
          <CameraErrorBoundary>
            <CameraContent vision={vision} />
          </CameraErrorBoundary>
        ) : (
          <UnavailableState
            title="Camera unavailable"
            message="VisionCamera native module is not available in this runtime."
          />
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 96,
  },
  heroCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: 'rgba(12,20,42,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#EFF6FF',
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: '#D0DDEE',
  },
  previewCard: {
    height: 410,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#060A16',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 14,
  },
  statusPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: 'rgba(12,20,42,0.76)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 7,
    backgroundColor: '#22C55E',
  },
  statusText: {
    color: '#EAF3FF',
    fontSize: 12,
    fontWeight: '700',
  },
  actionRow: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#53A0FD',
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.76)',
  },
  captureButtonDisabled: {
    opacity: 0.7,
  },
  galleryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#EEF5FF',
  },
  clearText: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '700',
  },
  photoCard: {
    width: 138,
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: 'rgba(12,20,42,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  photoPreview: {
    width: '100%',
    height: 150,
    backgroundColor: '#111827',
  },
  photoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 9,
  },
  photoTime: {
    flex: 1,
    color: '#D0DDEE',
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    backgroundColor: 'rgba(12,20,42,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(125,211,252,0.14)',
  },
  emptyTitle: {
    color: '#F2F8FF',
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    marginTop: 6,
    color: '#C9DAEE',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  permissionButton: {
    marginTop: 14,
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#53A0FD',
  },
  permissionButtonText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  savedEmpty: {
    borderRadius: 14,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  savedEmptyText: {
    color: '#D0DDEE',
    fontSize: 13,
  },
});
