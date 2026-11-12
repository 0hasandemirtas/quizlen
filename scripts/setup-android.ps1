$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$base = Join-Path (Split-Path $PSScriptRoot -Parent) ".android-tools"
New-Item -ItemType Directory -Force $base | Out-Null
if ((Test-Path "$base/sdk/platforms/android-36/android.jar") -and (Test-Path "$base/sdk/build-tools/35.0.0/apksigner.bat") -and (Test-Path "$base/gradle-8.13/bin/gradle.bat") -and (Test-Path "$base/java")) { Write-Output "Derleme araclari zaten hazir."; exit 0 }
$jdk = (Invoke-RestMethod 'https://api.adoptium.net/v3/assets/latest/21/hotspot?architecture=x64&image_type=jdk&os=windows')[0].binary.package
$hashResponse = (Invoke-WebRequest -UseBasicParsing 'https://services.gradle.org/distributions/gradle-8.13-bin.zip.sha256').Content
$gradleHash = if ($hashResponse -is [byte[]]) { [System.Text.Encoding]::UTF8.GetString($hashResponse).Trim() } else { ([string]$hashResponse).Trim() }
& curl.exe --fail --location --silent --show-error --parallel --parallel-immediate --url $jdk.link --output "$base/jdk.zip" --next --fail --location --silent --show-error --url 'https://services.gradle.org/distributions/gradle-8.13-bin.zip' --output "$base/gradle.zip" --next --fail --location --silent --show-error --url 'https://dl.google.com/android/repository/commandlinetools-win-13114758_latest.zip' --output "$base/commandline.zip"
if ($LASTEXITCODE -ne 0) { throw 'Araç indirme başarısız.' }
if ((Get-FileHash "$base/jdk.zip" -Algorithm SHA256).Hash -ne $jdk.checksum) { throw 'JDK doğrulaması başarısız' }
if ((Get-FileHash "$base/gradle.zip" -Algorithm SHA256).Hash -ne $gradleHash) { throw 'Gradle doğrulaması başarısız' }
if ((Get-FileHash "$base/commandline.zip" -Algorithm SHA1).Hash -ne '54a582f3bf73e04253602f2d1c80bd5868aac115') { throw 'SDK doğrulaması başarısız' }
Expand-Archive -LiteralPath "$base/jdk.zip" -DestinationPath "$base/java" -Force
Expand-Archive -LiteralPath "$base/gradle.zip" -DestinationPath "$base" -Force
Expand-Archive -LiteralPath "$base/commandline.zip" -DestinationPath "$base/sdk/cmdline-tools/19" -Force
$env:JAVA_HOME = (Get-ChildItem "$base/java" -Directory | Select-Object -First 1).FullName
$env:ANDROID_HOME = "$base/sdk"
$env:GRADLE_USER_HOME = "$base/gradle-cache"
$env:Path = "$env:JAVA_HOME/bin;$env:Path"
$sdkmanager = "$base/sdk/cmdline-tools/19/cmdline-tools/bin/sdkmanager.bat"
$ErrorActionPreference = 'Continue'
1..50 | ForEach-Object { 'y' } | & $sdkmanager "--sdk_root=$base/sdk" --licenses > "$base/licenses.log" 2>&1
& $sdkmanager "--sdk_root=$base/sdk" 'platforms;android-36' 'build-tools;35.0.0' 'platform-tools' > "$base/sdk-install.log" 2>&1
if ($LASTEXITCODE -ne 0) { Get-Content "$base/sdk-install.log" -Tail 30; throw 'SDK kurulamadı' }
if (-not (Test-Path "$base/sdk/platforms/android-36/android.jar")) { throw 'Android platformu bulunamadi.' }
Write-Output 'Android derleme araclari hazir.'
