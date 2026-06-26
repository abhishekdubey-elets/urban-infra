# Generates the favicon + social-share images from the brand and the logo.
#
#   Run from the project root (PowerShell):
#     powershell -ExecutionPolicy Bypass -File scripts/generate-images.ps1
#
# Reads  : public/logo.png   (embedded into the OG card on a white badge)
# Writes : app/icon.png, app/apple-icon.png, app/opengraph-image.png, app/twitter-image.png
#
# Why static PNGs (not next/og)? @vercel/og throws "Invalid URL" on Windows + Node 24,
# so dynamic ImageResponse routes can't render here. Static files are auto-detected by
# Next's metadata system and need no runtime deps.

Add-Type -AssemblyName System.Drawing
$root = (Resolve-Path "$PSScriptRoot\..").Path

function New-RoundedPath($x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc(($x + $w - $d), $y, $d, $d, 270, 90)
  $p.AddArc(($x + $w - $d), ($y + $h - $d), $d, $d, 0, 90)
  $p.AddArc($x, ($y + $h - $d), $d, $d, 90, 90)
  $p.CloseFigure(); return $p
}

# ---------- Skyline glyph (square icons) ----------
function New-Glyph($dim, $outfile) {
  $bmp = New-Object System.Drawing.Bitmap($dim, $dim)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.Clear([System.Drawing.Color]::Transparent)
  $rect = New-Object System.Drawing.Rectangle(0, 0, $dim, $dim)
  $br = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::Black, [System.Drawing.Color]::Black, 45)
  $cb = New-Object System.Drawing.Drawing2D.ColorBlend(4)
  $cb.Colors = @(
    [System.Drawing.Color]::FromArgb(111, 190, 78),
    [System.Drawing.Color]::FromArgb(31, 194, 201),
    [System.Drawing.Color]::FromArgb(62, 122, 196),
    [System.Drawing.Color]::FromArgb(106, 87, 166))
  $cb.Positions = @(0.0, 0.42, 0.72, 1.0); $br.InterpolationColors = $cb
  $g.FillPath($br, (New-RoundedPath 0 0 $dim $dim ([int]($dim * 0.22))))
  $heights = @(0.5, 0.78, 0.62, 1.0, 0.7, 0.86, 0.55)
  $barW = $dim * 0.072; $gap = $dim * 0.035
  $total = ($heights.Count * $barW) + (($heights.Count - 1) * $gap)
  $startX = ($dim - $total) / 2; $baseY = $dim * 0.78
  $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(244, 255, 255, 255))
  for ($i = 0; $i -lt $heights.Count; $i++) {
    $bh = $dim * 0.52 * $heights[$i]; $bx = $startX + $i * ($barW + $gap)
    $g.FillPath($white, (New-RoundedPath $bx ($baseY - $bh) $barW $bh ([int]($dim * 0.018))))
  }
  $g.Dispose(); $bmp.Save($outfile, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
}

New-Glyph 512 "$root\app\icon.png"
New-Glyph 180 "$root\app\apple-icon.png"

# ---------- Social card (1200x630) ----------
$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'
$rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(7, 11, 20), [System.Drawing.Color]::FromArgb(14, 20, 38), 60)
$g.FillRectangle($bg, $rect)
$glow1 = New-Object System.Drawing.Drawing2D.GraphicsPath; $glow1.AddEllipse(-160, -200, 560, 560)
$pg1 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow1)
$pg1.CenterColor = [System.Drawing.Color]::FromArgb(70, 31, 194, 201); $pg1.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 31, 194, 201)); $g.FillPath($pg1, $glow1)
$glow2 = New-Object System.Drawing.Drawing2D.GraphicsPath; $glow2.AddEllipse(($W - 380), ($H - 360), 620, 620)
$pg2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow2)
$pg2.CenterColor = [System.Drawing.Color]::FromArgb(95, 106, 87, 166); $pg2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 106, 87, 166)); $g.FillPath($pg2, $glow2)
$barRect = New-Object System.Drawing.Rectangle(0, 0, $W, 8)
$barBr = New-Object System.Drawing.Drawing2D.LinearGradientBrush($barRect, [System.Drawing.Color]::Black, [System.Drawing.Color]::Black, 0)
$cb2 = New-Object System.Drawing.Drawing2D.ColorBlend(4)
$cb2.Colors = @([System.Drawing.Color]::FromArgb(111, 190, 78), [System.Drawing.Color]::FromArgb(31, 194, 201), [System.Drawing.Color]::FromArgb(62, 122, 196), [System.Drawing.Color]::FromArgb(106, 87, 166))
$cb2.Positions = @(0.0, 0.4, 0.7, 1.0); $barBr.InterpolationColors = $cb2
$g.FillRectangle($barBr, $barRect)

$logoPath = "$root\public\logo.png"
if (Test-Path $logoPath) {
  $logo = [System.Drawing.Image]::FromFile($logoPath)
  $lh = 96.0; $lw = $logo.Width * ($lh / $logo.Height); $padX = 24; $padY = 18
  $g.FillPath((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)), (New-RoundedPath 72 60 ($lw + $padX * 2) ($lh + $padY * 2) 20))
  $g.DrawImage($logo, (72 + $padX), (60 + $padY), $lw, $lh); $logo.Dispose()
}
$fEd = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Bold)
$edText = "9TH EDITION  -  ELETS TECHNOMEDIA"; $edSize = $g.MeasureString($edText, $fEd)
$g.DrawPath((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 255, 255, 255), 1.5)), (New-RoundedPath ($W - 72 - $edSize.Width - 44) 86 ($edSize.Width + 44) 44 22))
$g.DrawString($edText, $fEd, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(170, 255, 255, 255))), ($W - 72 - $edSize.Width - 22), 98)
$g.DrawString("NATIONAL URBAN INFRASTRUCTURE & INVESTMENT SUMMIT", (New-Object System.Drawing.Font('Segoe UI', 20, [System.Drawing.FontStyle]::Bold)), (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(31, 194, 201))), 72, 250)
$fH = New-Object System.Drawing.Font('Segoe UI Semibold', 56, [System.Drawing.FontStyle]::Bold)
$white2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$green = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(120, 209, 106))
$g.DrawString("Financing the Future of", $fH, $white2, 68, 290)
$g.DrawString("Resilient, Smart &", $fH, $green, 68, 360)
$g.DrawString("Investment-Ready Cities", $fH, $green, 68, 430)
$fP = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold)
$loc = "Bengaluru, Karnataka"; $locSize = $g.MeasureString($loc, $fP)
$locRect = New-Object System.Drawing.Rectangle(72, 535, ([int]$locSize.Width + 56), 52)
$locBr = New-Object System.Drawing.Drawing2D.LinearGradientBrush($locRect, [System.Drawing.Color]::FromArgb(111, 190, 78), [System.Drawing.Color]::FromArgb(31, 194, 201), 0)
$g.FillPath($locBr, (New-RoundedPath 72 535 ($locSize.Width + 56) 52 26))
$g.DrawString($loc, $fP, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(11, 20, 38))), 100, 548)
$dx = 72 + $locSize.Width + 56 + 18; $date = "August 2026"; $dateSize = $g.MeasureString($date, $fP)
$g.DrawPath((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, 255, 255, 255), 1.5)), (New-RoundedPath $dx 535 ($dateSize.Width + 56) 52 26))
$g.DrawString($date, $fP, $white2, ($dx + 28), 548)
$g.Dispose()
$bmp.Save("$root\app\opengraph-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
Copy-Item "$root\app\opengraph-image.png" "$root\app\twitter-image.png" -Force
$bmp.Dispose()
Write-Host "Generated app/icon.png, app/apple-icon.png, app/opengraph-image.png, app/twitter-image.png"
