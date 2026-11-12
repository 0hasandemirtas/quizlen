param([int]$VersionCode = 0, [string]$VersionName = '')
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$toolsRoot = Join-Path $projectRoot '.android-tools'
$androidRoot = Join-Path $projectRoot 'android'
$portableJava = Get-ChildItem "$toolsRoot/java" -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
if ($portableJava) { $env:JAVA_HOME = $portableJava.FullName }
if (-not $env:JAVA_HOME) { throw 'JDK 17 veya daha yenisini kurun; JAVA_HOME ayarlayin. scripts/setup-android.ps1 kullanilabilir.' }
if (Test-Path "$toolsRoot/sdk/platforms/android-36/android.jar") { $env:ANDROID_HOME = "$toolsRoot/sdk" }
if (-not $env:ANDROID_HOME) { throw 'Android SDK kurun ve ANDROID_HOME ayarlayin.' }
$env:GRADLE_USER_HOME = "$toolsRoot/gradle-cache"
$env:Path = "$env:JAVA_HOME/bin;$env:Path"
$stateFile = Join-Path $androidRoot 'version.json'
$previous = if (Test-Path $stateFile) { Get-Content $stateFile -Raw | ConvertFrom-Json } else { $null }
if ($VersionCode -eq 0) { $VersionCode = if ($previous) { [int]$previous.versionCode + 1 } else { 1 } }
if ($previous -and $VersionCode -le [int]$previous.versionCode) { throw 'Yeni versionCode onceki surumden buyuk olmali.' }
if (-not $VersionName) { $VersionName = "1.0.$($VersionCode - 1)" }
$signing = Join-Path $androidRoot 'signing.properties'
$keyFile = Join-Path $androidRoot 'keystore/quizlen-release.p12'
if (-not (Test-Path $signing)) {
    if ($previous -or (Test-Path $keyFile)) { throw 'Imza ayarlari eksik. Yeni anahtar uretmeyin; signing.properties ve keystore yedegini geri yukleyin.' }
    New-Item -ItemType Directory -Force (Split-Path $keyFile -Parent) | Out-Null
    $random = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($random); $rng.Dispose()
    $password = [Convert]::ToBase64String($random)
    $env:QUIZLEN_SIGNING_PASSWORD = $password
    $ErrorActionPreference = 'Continue'
    & "$env:JAVA_HOME/bin/keytool.exe" -genkeypair -keystore $keyFile -storetype PKCS12 -alias quizlen -keyalg RSA -keysize 3072 -validity 10000 -dname 'CN=Quizlen, OU=Personal, O=Quizlen, C=TR' -storepass:env QUIZLEN_SIGNING_PASSWORD -keypass:env QUIZLEN_SIGNING_PASSWORD
    $keyExit = $LASTEXITCODE
    $ErrorActionPreference = 'Stop'
    Remove-Item Env:QUIZLEN_SIGNING_PASSWORD
    if ($keyExit -ne 0) { throw 'Imza anahtari olusturulamadi.' }
    $signLines = @('storeFile=keystore/quizlen-release.p12', "storePassword=$password", 'keyAlias=quizlen', "keyPassword=$password")
    [IO.File]::WriteAllText($signing, ($signLines -join [Environment]::NewLine), (New-Object Text.UTF8Encoding $false))
}
if (-not (Test-Path $keyFile)) { throw 'Imza anahtari bulunamadi. Yedekten geri yukleyin; degistirmeyin.' }
$gradle = if (Test-Path "$toolsRoot/gradle-8.13/bin/gradle.bat") { "$toolsRoot/gradle-8.13/bin/gradle.bat" } else { "$androidRoot/gradlew.bat" }
Push-Location $androidRoot
try {
    $ErrorActionPreference = 'Continue'
    & $gradle --no-daemon --console=plain "-PappVersionCode=$VersionCode" "-PappVersionName=$VersionName" :app:assembleRelease :app:lintRelease
    $buildExit = $LASTEXITCODE
    $ErrorActionPreference = 'Stop'
    if ($buildExit -ne 0) { throw 'APK derlemesi veya Android lint basarisiz.' }
    New-Item -ItemType Directory -Force "$projectRoot/releases" | Out-Null
    $destination = "$projectRoot/releases/Quizlen-$VersionName.apk"
    Copy-Item -LiteralPath 'app/build/outputs/apk/release/app-release.apk' -Destination $destination -Force
    $metadata = @{ versionCode = $VersionCode; versionName = $VersionName; sha256 = (Get-FileHash $destination -Algorithm SHA256).Hash }
    [IO.File]::WriteAllText($stateFile, ($metadata | ConvertTo-Json), (New-Object Text.UTF8Encoding $false))
    Write-Host "APK hazir: $destination"
} finally { Pop-Location }
