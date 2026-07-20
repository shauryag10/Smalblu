# One-time raster asset generation from /assets brand PNGs (GDI+).
# Outputs: app/icon1.png (192), app/apple-icon.png (180), app/opengraph-image.png (1200x630)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$assets = Join-Path $root "assets"
$appDir = Join-Path $root "app"
New-Item -ItemType Directory -Force $appDir | Out-Null

function New-Canvas([int]$w, [int]$h) {
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  return @($bmp, $g)
}

# ---- 1. icon1.png: 192x192 transparent blue butterfly (favicon PNG fallback)
$src = [System.Drawing.Bitmap]::FromFile((Join-Path $assets "smalBlu-icon-blue.png"))
$c = New-Canvas 192 192; $bmp = $c[0]; $g = $c[1]
$g.DrawImage($src, 0, 0, 192, 192)
$bmp.Save((Join-Path $appDir "icon1.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

# ---- 2. apple-icon.png: 180x180, brand blue background + white butterfly
$srcW = [System.Drawing.Bitmap]::FromFile((Join-Path $assets "smalBlu-icon-white.png"))
$c = New-Canvas 180 180; $bmp = $c[0]; $g = $c[1]
$bg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 94, 255))
$g.FillRectangle($bg, 0, 0, 180, 180)
$g.DrawImage($srcW, 14, 14, 152, 152)
$bmp.Save((Join-Path $appDir "apple-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

# ---- 3. opengraph-image.png: 1200x630 dark gradient + glow + white lockup + tagline
$lockup = [System.Drawing.Bitmap]::FromFile((Join-Path $assets "smalBlu-primary-white.png"))
$c = New-Canvas 1200 630; $bmp = $c[0]; $g = $c[1]

# background: vertical gradient 000F1A -> 001D34
$rect = New-Object System.Drawing.Rectangle(0, 0, 1200, 630)
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect,
  [System.Drawing.Color]::FromArgb(255, 0, 8, 15),
  [System.Drawing.Color]::FromArgb(255, 0, 25, 44),
  90.0)
$g.FillRectangle($grad, $rect)

# radial electric-blue glow, bottom center
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath.AddEllipse(150, 280, 900, 700)
$pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$pgb.CenterColor = [System.Drawing.Color]::FromArgb(110, 0, 94, 255)
$pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 94, 255))
$g.FillPath($pgb, $glowPath)

# subtle dot grid
$dot = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(14, 255, 255, 255))
for ($x = 40; $x -lt 1200; $x += 46) { for ($y = 30; $y -lt 630; $y += 46) { $g.FillEllipse($dot, $x, $y, 2.6, 2.6) } }

# white lockup centered
$lw = 660.0
$lh = $lw * ($lockup.Height / [double]$lockup.Width)
$g.DrawImage($lockup, [single](600 - $lw / 2), [single](250 - $lh / 2), [single]$lw, [single]$lh)

# tagline
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment = [System.Drawing.StringAlignment]::Center
$f1 = New-Object System.Drawing.Font("Segoe UI", 27, [System.Drawing.FontStyle]::Regular)
$b1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 192, 220, 243))
$g.DrawString("Autonomous, cross-layer optimization for enterprise data infrastructure", $f1, $b1, 600, 395, $fmt)

$f2 = New-Object System.Drawing.Font("Segoe UI Semibold", 20, [System.Drawing.FontStyle]::Bold)
$b2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 64, 150, 219))
$g.DrawString("smalblu.ai", $f2, $b2, 600, 545, $fmt)

$bmp.Save((Join-Path $appDir "opengraph-image.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $lockup.Dispose(); $src.Dispose(); $srcW.Dispose()
Write-Output "done: icon1.png, apple-icon.png, opengraph-image.png"
