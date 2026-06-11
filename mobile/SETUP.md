# Toolencahnt Mobile App Setup Guide

## Prerequisites

- Node.js 14+ installed
- Android SDK installed
- Android Studio or similar IDE
- JDK 11 or higher
- Gradle 7.x+

## Installation

1. **Navigate to mobile directory:**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Metro bundler:**
   ```bash
   npm start
   ```

## Building for Android

### Debug APK
```bash
npm run android
```

### Release APK
```bash
npm run build-apk
```

The APK will be generated at:
- `Toolencahnt-release.apk` (in root directory after build)
- `mobile/android/app/build/outputs/apk/release/app-release.apk`

## Project Structure

```
mobile/
├── src/
│   └── App.js              # Main application component
├── android/                # Android native code
├── ios/                    # iOS native code (if needed)
├── app.json                # App configuration
├── package.json            # Dependencies
└── index.js                # Entry point
```

## Features

- ✅ Register new tools
- ✅ List all registered tools
- ✅ Execute tools
- ✅ Delete tools
- ✅ Tool management UI
- ✅ Real-time status updates

## Testing on Device

1. **Connect Android device via USB**
2. **Enable USB debugging on device**
3. **Run:**
   ```bash
   npm run android
   ```

## Troubleshooting

### Build issues:
```bash
cd android
./gradlew clean
cd ..
npm start -- --reset-cache
npm run build-apk
```

### Port already in use:
```bash
npm start -- --port 8081
```

## Distribution

To distribute your APK:
1. Generate signed APK
2. Upload to Google Play Store or distribute directly
3. Update version in `package.json` and `app.json` for new releases

## License

MIT License - See LICENSE file
