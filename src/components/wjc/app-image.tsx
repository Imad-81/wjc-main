"use client"

import Image from "next/image"
import { memo, useCallback, useState } from "react"

interface AppImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  quality?: number
  fill?: boolean
  sizes?: string
  loading?: "lazy" | "eager"
  onClick?: () => void
  fallbackSrc?: string
}

/**
 * Image wrapper with a fallback for broken sources.
 *
 * All project images are local, so unlike the prototype there is no
 * `unoptimized` escape hatch for remote hosts — everything goes through the
 * Next image pipeline.
 */
const AppImage = memo(function AppImage({
  src,
  alt,
  width,
  height,
  className = "",
  style,
  priority = false,
  quality = 85,
  fill = false,
  sizes,
  loading = "lazy",
  onClick,
  fallbackSrc = "/assets/images/no_image.webp",
}: AppImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = useCallback(() => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
      setHasError(true)
    }
  }, [hasError, imageSrc, fallbackSrc])

  const shared = {
    src: imageSrc,
    alt,
    className,
    style,
    quality,
    onError: handleError,
    onClick,
    ...(priority ? { priority: true } : { loading }),
  }

  if (fill) {
    return (
      <div className="relative" style={{ width: "100%", height: "100%" }}>
        <Image
          {...shared}
          fill
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          style={{ objectFit: "cover", ...style }}
        />
      </div>
    )
  }

  return (
    <Image
      {...shared}
      width={width || 400}
      height={height || 300}
      sizes={sizes}
    />
  )
})

export default AppImage
