import { paths } from '@nftearth/reservoir-sdk'
import { optimizeImage } from 'lib/optmizeImage'
import React, { FC } from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'

type Props = {
  sample_images: NonNullable<
    paths['/collections/{collection}/attributes/explore/v3']['get']['responses']['200']['schema']['attributes']
  >[0]['sampleImages']
  verified: string | undefined | null
}

const ImagesGrid: FC<Props> = ({ sample_images, verified }) => {
  return (
    <>
      {!!sample_images && sample_images.length > 0 ? (
        <div className="grid grid-cols-[1fr_1fr_25%] items-center gap-1.5 relative">
          {sample_images.length > 1 ? (
            // SMALLER IMAGE, HAS SIDE IMAGES
            <img
              src={optimizeImage(sample_images[0], 250)}
              className="col-span-2 w-full rounded object-contain max-h-[215px]"
              width="224"
              height="224"
            />
          ) : (
            // BIG IMAGE, NO SIDE IMAGES
            <div className="h-12 w-12 flex-none rounded-full bg-gradient-to-br from-primary-500 to-primary-900"></div>
          )}
          {sample_images.length > 1 && (
            <div className="flex h-full flex-col gap-1">
              {sample_images.slice(1).map((image, i) => (
                <img
                  key={`${image}-${i}`}
                  src={optimizeImage(image, 70)}
                  width="70"
                  height="70"
                  className="w-[70px] rounded max-h-[70px]"
                />
              ))}
            </div>
          )}
          {verified && (
            <BsPatchCheckFill
              className={`h-8 w-8 text-primary-700`}
              style={{
                position: 'absolute',
                top: 15,
                left: 15
              }}
            />
          )}
        </div>
      ) : (
        <div className="aspect-w-1 aspect-h-1 relative">
          <img src="https://via.placeholder.com/250" width="250" height="250" />
        </div>
      )}
    </>
  )
}

export default ImagesGrid
