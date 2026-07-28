Add-Type -AssemblyName System.Drawing

$width = 256
$height = 256
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Background dark rounded rect container for app icon
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#202020'))
$blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#0078D4'))
$greenBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#10B981'))

# Draw dark container background
$rectPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$r = 40
$rectPath.AddArc(0, 0, $r*2, $r*2, 180, 90)
$rectPath.AddArc($width - $r*2, 0, $r*2, $r*2, 270, 90)
$rectPath.AddArc($width - $r*2, $height - $r*2, $r*2, $r*2, 0, 90)
$rectPath.AddArc(0, $height - $r*2, $r*2, $r*2, 90, 90)
$rectPath.CloseFigure()
$g.FillPath($bgBrush, $rectPath)

# Draw Purgo P icon inside
# Scaled coordinates for 256x256 based on 64x64 SVG (factor = 4, offset = 0)
# SVG: rect x=12 y=10 w=12 h=44 rx=6 fill=#0078d4
$barPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$barPath.AddArc(48, 40, 48, 48, 180, 90)
$barPath.AddArc(48, 168, 48, 48, 90, 90)
$barPath.AddLine(48, 192, 48, 64)
$barPath.CloseFigure()
$g.FillPath($blueBrush, $barPath)

# SVG: path d="M24 10H42C49.732 10 56 16.268 56 24C56 31.732 49.732 38 42 38H24V10Z" fill="#0078d4"
$loopPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$loopPath.AddArc(112, 40, 112, 112, 270, 180)
$loopPath.AddLine(168, 152, 96, 152)
$loopPath.AddLine(96, 40, 168, 40)
$loopPath.CloseFigure()
$g.FillPath($blueBrush, $loopPath)

# SVG: path d="M30 22H40C41.1046 22 42 22.8954 42 26... H30V22Z" fill="#10b981"
$g.FillRectangle($greenBrush, 120, 88, 48, 16)

# SVG: circle cx=42 cy=46 r=7 fill="#10b981" (cx=168, cy=184, r=28)
$g.FillEllipse($greenBrush, 140, 156, 56, 56)

$pngPath = "c:\Users\asus\OneDrive\Documents\code zone\debloater\public\icon.png"
$bmp.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$g.Dispose()

Write-Host "Icon created successfully at $pngPath"
