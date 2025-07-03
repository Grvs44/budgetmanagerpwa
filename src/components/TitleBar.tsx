// Adapted from https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/window-controls-overlay
import { useEffect, useState } from 'react'
import { debounce } from '@mui/material'

export default function TitleBar() {
  const [area, setArea] = useState(
    navigator.windowControlsOverlay?.getTitlebarAreaRect(),
  )

  useEffect(() => {
    navigator.windowControlsOverlay?.addEventListener(
      'geometrychange',
      debounce(() => {
        if (navigator.windowControlsOverlay) {
          setArea(navigator.windowControlsOverlay.getTitlebarAreaRect())
        }
      }),
    )
  }, [navigator])

  return area ? (
    <div
      style={
        {
          height: area.height * 0.4,
          width: area.width,
          WebkitAppRegion: 'drag',
        } as any
      }
    />
  ) : (
    <></>
  )
}
