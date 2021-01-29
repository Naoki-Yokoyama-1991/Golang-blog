import React from 'react'
import { UploadImageUser } from './styles'

type Props = {
  onChange: (e: any) => void
}

export function UploadFile({ onChange }: Props) {
  return (
    <UploadImageUser htmlFor="file_upload">
      UPLOAD
      <input
        type="file"
        id="file_upload"
        onChange={onChange}
        style={{ display: 'none' }}
      />
    </UploadImageUser>
  )
}
