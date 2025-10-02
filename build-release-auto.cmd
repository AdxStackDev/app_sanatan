@echo off
REM --------------------------------------
REM CONFIGURATION (Edit before first run)
REM --------------------------------------
SET KEYSTORE_PASSWORD=Qwerty@7890j:,tlUy92&1J
SET KEY_PASSWORD=Qwerty@7890j:,tlUy92&1J
SET KEY_ALIAS=adx-dev
SET DNAME="CN=AdityaDixit, OU=Adx, O=AdxDev, L=Noida, S=Uttar pradesh, C=IN"
SET KEYSTORE_PATH=android\app\my-release-key.keystore
REM --------------------------------------

REM Check if Java is installed
java -version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Java not found. Please install Java JDK 17 or above.
    pause
    exit /b
)

REM Check if Gradle wrapper exists
IF NOT EXIST android\gradlew.bat (
    echo ERROR: Gradle wrapper not found. Make sure you have React Native project set up.
    pause
    exit /b
)

REM Check if keystore exists
IF EXIST "%KEYSTORE_PATH%" (
    echo Keystore already exists. Skipping generation.
) ELSE (
    echo Generating keystore...
    "C:\Program Files\Java\jdk-17\bin\keytool.exe" -genkeypair -v -keystore %KEYSTORE_PATH% -alias %KEY_ALIAS% -keyalg RSA -keysize 2048 -validity 10000 -storepass %KEYSTORE_PASSWORD% -keypass %KEY_PASSWORD% -dname %DNAME%
)

REM Create or overwrite key.properties
echo Creating key.properties...
echo storePassword=%KEYSTORE_PASSWORD% > android\key.properties
echo keyPassword=%KEY_PASSWORD% >> android\key.properties
echo keyAlias=%KEY_ALIAS% >> android\key.properties
echo storeFile=my-release-key.keystore >> android\key.properties

REM Build APK
echo Building signed APK...
cd android
.\gradlew assembleRelease

REM Build AAB
echo Building signed AAB (bundle)...
.\gradlew bundleRelease

echo -------------------------------
echo ALL DONE!
echo APK: android\app\build\outputs\apk\release\app-release.apk
echo AAB: android\app\build\outputs\bundle\release\app-release.aab
echo -------------------------------
pause
